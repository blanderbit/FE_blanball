export class ActionModelTypeUrl {
  type = 'URL';
  url = '';
  action = () => {};

  constructor(options = {}) {
    this.url = options.url;
    this.action = options.action;
  }
}

export class ActionModelTypeButton {
  type = 'BUTTON';
  action = () => {};

  constructor(options = {}) {
    this.action = options.action;
  }
}