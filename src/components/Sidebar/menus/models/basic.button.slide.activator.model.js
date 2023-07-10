import { ref, watch } from 'vue';
import { BasicButtonModel } from './basic.button.model';

const DEFAULT_SLIDE_MENU_WIDTH_PX = 464;

export class BasicButtonSlideActivatorModel extends BasicButtonModel {
  slideConfig = {
    uniqueName: '',
    title: '',
    tabs: [],
    width: 0,
    logo: {
      img: null,
      text: null,
    },
  };
  activity = ref(false);
  activeTab = ref();
  _context;

  constructor(options) {
    super(options);
    this.slideConfig = {
      uniqueName: options.uniqueName,
      width: options.slideConfig?.width || DEFAULT_SLIDE_MENU_WIDTH_PX,
      logo: options.slideConfig.logo,
      title: options.slideConfig.title,
      tabs: Array.isArray(options.slideConfig.tabs)
        ? options.slideConfig.tabs
        : [],
    };
    this.activity.value = options.activity;
    this.onInit = options.onInit;
    this.onDestroy = options.onDestroy;

    watch(this.activity, (value) => {
      if (value) {
        this.onInit();
        this.activeTab.value = this.findTab(options.slideConfig.defaultTab);
      } else {
        this.onDestroy();
        this.activeTab.value.paginationClearData();
        this.activeTab.value = null;
      }
    });
    watch(this.activeTab, (value) => {
      if (value) this.activeTab.value.loadNewData(1, null, false, false);
    });
    this._context = this;
  }

  onInit() {}
  onDestroy() {}

  findTab(uniqueName) {
    return this.slideConfig.tabs.find((tab) => tab.uniqueName === uniqueName);
  }

  openTab(uniqueName) {
    const foundTab = this.findTab(uniqueName);
    if (this.activeTab.value && foundTab) {
      this.activeTab.value.paginationClearData();
    }
    this.activeTab.value = foundTab;
  }
}
