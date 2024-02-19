const Role = require("../../api/v1/roles/model");

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllRole = async () => {
  const result = await Role.find();

  if (result.length === 0) throw new BadRequestError("data role kosong");
};

module.exports = {
  getAllRole,
};
