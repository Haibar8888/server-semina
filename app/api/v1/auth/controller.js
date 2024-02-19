const { sigin } = require("../../../services/mongoose/auth");
const { StatusCodes } = require("http-status-codes");

const signinCms = async (req, res, next) => {
  try {
    const result = await sigin(req);

    res.status(StatusCodes.CREATED).json({
      data: { token: result },
      message: "token anda berhasil digenerate",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signinCms,
};
