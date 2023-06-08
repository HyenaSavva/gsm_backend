const {
  BAD_REQUEST,
  INTERNAL_SERVER,
  FORBBIDEN,
} = require("./httpStatusError");

class ApiError extends Error {
  constructor(statusCode, message, name, isOperational, description) {
    super(description);
    this.status = statusCode;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(BAD_REQUEST, message);
  }

  static internal(message) {
    return new ApiError(INTERNAL_SERVER, message);
  }

  static forbidden(message) {
    return new ApiError(FORBBIDEN, message);
  }
}

module.exports = ApiError;
