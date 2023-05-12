import { ref, watch } from "vue";
import { BasicButtonModel } from "./basic.button.model";

export class BasicButtonSlideActivatorModel extends BasicButtonModel {
  slideConfig = {
    uniqueName:  '',
    title: "",
    tabs: []
  };
  activity = ref(false);
  activeTab = ref();
  _context;

  constructor (options) {
    super(options);
    this.slideConfig = {
      uniqueName: options.uniqueName,
      title: options.title,
      tabs: Array.isArray(options.slideConfig.tabs) ? options.slideConfig.tabs : []
    };
    this.activity.value = options.activity;
    this.onInit = options.onInit;
    this.onDestroy = options.onDestroy;

    watch(this.activity, (value) => {
      if(value) {
        this.onInit();
        this.activeTab.value = this.findTab(options.slideConfig.defaultTab);
      }
      else {
        this.onDestroy();
        this.activeTab.value.paginationClearData();
        this.activeTab.value = null
      }
    });
    watch(this.activeTab, (value) => {
      if(value) this.activeTab.value.loadDataNotifications(1, null, false, false);
    });
    this._context = this
  }

  onInit(){}
  onDestroy(){}

  findTab(uniqueName) {
    return this.slideConfig.tabs.find(tab => tab.uniqueName === uniqueName)
  }

  openTab(uniqueName) {
    if(this.activeTab.value) {
      this.activeTab.value.paginationClearData()
    }
    this.activeTab.value = this.findTab(uniqueName);
  }
}