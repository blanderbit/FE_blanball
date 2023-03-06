import * as yup from 'yup';

yup.addMethod(yup.string, 'emojiRequired', function (errorMessage) {
  return this.test(`test-emoji-required`, errorMessage, function (value) {
    const { path, createError } = this;
    const emoji = props.selectedEmojies.filter(
      (value) => value.step === props.step.id
    );
    return (
      ([0, 4].includes(props.step.id) ? true : !!emoji?.length) ||
      createError({ path, errorMessage })
    );
  });
});

export default {
  schema: yup.object({
    emoji: yup.string().emojiRequired('errors.required'),
    comment: yup.string().max(200, 'errors.max200'),
  }),
};
