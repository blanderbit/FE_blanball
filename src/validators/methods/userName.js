import * as yup from 'yup';

const userNameValidator = (errorMessage) => {
  yup.addMethod(yup.string, 'userName', function () {
    return this.test('userName', errorMessage, function (value) {
      const { path, createError } = this;
      const reg = /^[А-Яа-яієїґЇІЄҐ\'-]*[А-Яа-яієїґЇІЄҐ\'-]+$/i;
      return reg.exec(value) || createError({ path, message: errorMessage });
    });
  });
};

export default userNameValidator;