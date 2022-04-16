import Joi from 'joi';
import httpResponse from './httpResponse.js'

const schemaValidator = (property, schemaRules, options) => {
  return (req, res, next ) => {
    const schema = Joi.object(schemaRules);
    const defaultOptions = {
      abortEarly: false, // include all errors
      allowUnknown: false, // ignore unknown props
    };
    const {value, error} = schema.validate(
        req[property],
        {...defaultOptions, ...options},
    );
    const valid = error == null;
    if (valid) {
      req[property] = value;
      next();
    } else {
      const {details} = error;
      const message = details.map((i) => i.message).join(',');
      httpResponse.badRequestHttpResponse(res, {error: message, details});
    }
  };
};

const reqBodySchemaValidator = (schemaRules, options) => {
  return schemaValidator('body', schemaRules, options);
};

const reqQuerySchemaValidator = (schemaRules, options) => {
  return schemaValidator('query', schemaRules, options);
};

const reqPathSchemaValidator = (schemaRules, options) => {
  return schemaValidator('params', schemaRules, options);
};

export default {
  schemaValidator,
  reqBodySchemaValidator,
  reqQuerySchemaValidator,
  reqPathSchemaValidator,
};