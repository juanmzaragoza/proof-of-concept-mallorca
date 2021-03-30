import * as yup from "yup";
// ref https://codesandbox.io/s/clever-snyder-1u410?fontsize=14&file=/src/form.js
const createYupSchema = (schema, config, extraErrors) => {
  const { id, validationType, validations = [] } = config;
  if (!yup[validationType]) {
    return schema;
  }
  let validator = yup[validationType]();
  validations.forEach(validation => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    validator = validator[type](...params);
  });
  schema[id] = validator;
  return schema;
}

export default createYupSchema;