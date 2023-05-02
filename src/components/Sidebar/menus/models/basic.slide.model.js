import { BasicButtonModel } from "./basic.button.model";

export class BasicSlideModel extends BasicButtonModel {
  _slideConfig = {};

  constructor (options) {
    super(options);
    this._slideConfig = options.slideConfig;
  }
}