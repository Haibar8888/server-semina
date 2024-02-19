const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api-error");

class Unauthencated extends CustomAPIError {
  constructor(message) {
    super(message);
    // memberikan statusCode not found
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = Unauthencated;
