export class ModelTypesUrl {
  type = "URL";
  url = '';

  constructor(options = {}) {
    options = typeof options !== 'object' ? {} : options;
    Object.assign(this, options)
  }
}

export class ModelTypesButton {
  type = "BUTTON";
  action = () => {
  };

  constructor(options = {}) {
    options = typeof options !== 'object' ? {} : options;
    Object.assign(this, options)
  }
}