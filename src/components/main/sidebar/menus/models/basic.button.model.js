export class BasicButtonModel {
  title;
  icon;
  disabled;
  uniqueName;
  actionType;
  class;
  hideOnMobile;

  constructor(options) {
    Object.assign(this, {
      title: options.title,
      icon: options.icon,
      disabled: options.disabled,
      actionType: options.actionType,
      class: options.class,
      hideOnMobile: options.hideOnMobile,
    });
    this.uniqueName = options.uniqueName || this.__proto__.constructor.name;
  }

  onInit() {}
}
