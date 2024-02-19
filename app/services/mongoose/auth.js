const User = require("../../api/v1/user/model");
const { BadRequestError, Unauthorized } = require("../../errors");
const { createTokenUser, createJwt } = require("../../utils");

const sigin = async (req) => {
  const { password, email } = req.body;
  if (!password || !email) {
    throw new BadRequestError("masukan email dan password yang benar");
  }

  const result = await User.findOne({ email: email });

  if (!result) throw new Unauthorized("email yang anda masukan salah");

  const isPasswordCorrect = await result.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Unauthorized("password yang anda masukan salah");
  }
  const token = await createJwt({ payload: createTokenUser(result) });

  return token;
};
module.exports = { sigin };
