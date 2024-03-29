// services
const { StatusCodes } = require("http-status-codes");
const {
  createOrganizer,
  createUser,
} = require("../../../services/mongoose/user");

// buat function create
const create = async (req, res, next) => {
  try {
    // simpan Category yang baru dibuat ke MongoDB
    const result = await createOrganizer(req);
    // berikan response kepada client dengan mengembalikan product yang baru dibuat
    res.status(201).json({
      data: result,
      message: "data berhasil ditambahkan",
    });
  } catch (err) {
    // jika terjadi kesalahan kemudian gunakan method `next` agar Express memproses error tersebut
    next(err);
  }
};
const createCmsUser = async (req, res, next) => {
  try {
    // simpan Category yang baru dibuat ke MongoDB
    const result = await createUser(req);
    // berikan response kepada client dengan mengembalikan product yang baru dibuat
    res.status(StatusCodes.CREATED).json({
      data: result,
      message: "data berhasil ditambahkan",
    });
  } catch (err) {
    // jika terjadi kesalahan kemudian gunakan method `next` agar Express memproses error tersebut
    next(err);
  }
};
// Export fungsi create pada controller categories
module.exports = {
  create,
  createCmsUser,
};
