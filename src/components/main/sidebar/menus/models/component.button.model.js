export class ComponentButtonModel {
  componentName;
  uniqueName;
  customClass;
  componentProps;
  componentEmitsHandlers;

  constructor(options) {
    Object.assign(this, {
      componentName: options.componentName,
      customClass: options.customClass,
      componentProps: options.componentProps,
      componentEmitsHandlers: options.componentEmitsHandlers,
    });
    this.uniqueName = options.uniqueName || this.__proto__.constructor.name;
  }

  onInit() {}
}
