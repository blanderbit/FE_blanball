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

// export class ModelButtonAction {
//   type = "URL";
//   url = '';
//
//   constructor(options = {}) {
//     options = typeof options !== 'object' ? {} : options;
//     Object.assign(this, options)
//   }
// }
//
// export class ModelTypesButton {
//   type = "BUTTON";
//   action = () => {
//   };
//
//   constructor(options = {}) {
//     options = typeof options !== 'object' ? {} : options;
//     Object.assign(this, options)
//   }
// }
