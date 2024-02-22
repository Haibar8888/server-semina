const Organizer = require("../../api/v1/organizers/model");
const User = require("../../api/v1/user/model");

// import custom error not found dan bad request
const { BadRequestError } = require("../../errors");

const createOrganizer = async (req) => {
  const { organizer, name, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword)
    throw new BadRequestError("password dan confirm password tidak cocok");

  const checkRole = await User.findOne({ role });

  // if (!checkRole) throw new BadRequestError("role yang anda masukan tidak ada");

  const organizers = await Organizer.create({ organizer });

  const users = await User.create({
    name,
    email,
    password,
    role,
    organizer: organizers._id,
  });

  delete users._doc.password;

  return users;
};

const createUser = async (req) => {
  const { name, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword)
    throw new BadRequestError("password dan konfirm passwort tidak cocok");

  const result = await User.create({
    name,
    email,
    password,
    role,
    organizer: req.user.organizer,
  });

  return result;
};

module.exports = { createOrganizer, createUser };
