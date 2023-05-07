import { ref } from "vue";
import { BasicButtonModel } from "./basic.button.model";

export class BasicButtonSlideActivatorModel extends BasicButtonModel {
  slideConfig = {};
  activity;

  constructor (options) {
    super(options);
    this.slideConfig = options.slideConfig;
    this.activity = ref(options.activity);
  }
}