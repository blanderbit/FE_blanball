export class BasicButtonModel {
  title;
  icon;
  disabled;
  uniqueName;
  actionType;
  class;

  constructor(options) {
    Object.assign(this, {
      title: options.title,
      icon: options.icon,
      disabled: options.title,
      actionType: options.actionType,
      class: options.class,
    });
    this.uniqueName = options.uniqueName || this.__proto__.constructor.name;
  }

  onInit() {}
}
