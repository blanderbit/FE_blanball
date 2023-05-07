export class ActionModelTypeUrl {
  _type = "URL";
  url = '';

  constructor(options = {}) {
    this.url = options.url
  }
}

export class ActionModelTypeButton {
  _type = "BUTTON";
  action = () => {
  };

  constructor(options = {}) {
    this.action = options.action
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