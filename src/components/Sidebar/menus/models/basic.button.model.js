import { ref } from 'vue';

export class BasicButtonModel {
  _title;
  _icon;
  _disabled;
  _activity;
  _uniqueName;
  _type;

  constructor (options) {
    Object.assign(this, {
      _title: options.title,
      _icon: options.icon,
      _disabled: options.title,
      _type: options.type,
    });
    this._uniqueName = options.uniqueName || this.__proto__.constructor.name;
    this._activity = ref(options.activity);
  }

  onInit() {}
}