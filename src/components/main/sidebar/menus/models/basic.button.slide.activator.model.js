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
    tabsGapPx: 20,
    topSide: {},
    bottomSideVisible: true,
    closable: false,
    selectable: false,
    notAnimate: false,
  };
  activity = ref(false);
  selectable = ref(false);
  activeTab = ref();

  constructor(options) {
    super(options);
    this.slideConfig = {
      uniqueName: options.uniqueName,
      width: options.slideConfig?.width || DEFAULT_SLIDE_MENU_WIDTH_PX,
      closable: options.slideConfig.closable,
      logo: options.slideConfig.logo,
      title: options.slideConfig.title,
      tabsGapPx: options.slideConfig.tabsGapPx,
      topSide: options.slideConfig.topSide,
      notAnimate: options.slideConfig.notAnimate,
      bottomSideVisible: options.slideConfig.bottomSideVisible,
      tabs: Array.isArray(options.slideConfig.tabs)
        ? options.slideConfig.tabs
        : [],
    };
    this.activity.value = options.activity;
    this.onInit = options.onInit;
    this.onDestroy = options.onDestroy;
    this.selectable.value = options.slideConfig.selectable;

    watch(this.activity, (value) => {
      if (value) {
        this.onInit();
        this.activeTab.value = this.findTab(options.slideConfig.defaultTab);
      } else {
        this.onDestroy();
        this.activeTab.value = null;
      }
    });
    watch(this.activeTab, async (value) => {
      if (value) {
        this.activeTab.value.paginationClearData();
        await this.activeTab.value.loadNewData(1, null, false, false);
      }
    });
  }

  onInit() {}
  onDestroy() {
    this.activeTab.value.paginationClearData();
  }

  findTab(uniqueName) {
    return this.slideConfig.tabs.find((tab) => tab.uniqueName === uniqueName);
  }

  getFilters() {
    return this.activeTab.value.filters;
  }

  openTab(uniqueName) {
    const foundTab = this.findTab(uniqueName);
    if (foundTab) {
      this.activeTab.value = foundTab;
    }
  }
}
