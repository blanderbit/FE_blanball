export class ContextMenuModel {
  constructor(options) {
    if (typeof options === 'function') {
      return Object.assign(this, options());
    }
    return Object.assign(this, options);
  }
}
