const ApiError = require("../utils/apiError");

function validate(schema, part = "body") {
  return async (req, res, next) => {
    try {
      const validated = await schema.validate(req[part], { abortEarly: false, stripUnknown: true });
      req[part] = validated;
      next();
    } catch (err) {
      next(ApiError.badRequest("Dữ liệu không hợp lệ", err.errors));
    }
  };
}

module.exports = validate;
