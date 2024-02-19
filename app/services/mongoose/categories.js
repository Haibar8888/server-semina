const Categories = require("../../api/v1/categories/model");

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require("../../errors");

// get all categories
const getAllCategories = async (req, res, next) => {
  const result = await Categories.find();

  if (result.length == 0) throw new BadRequestError("data kosong");

  return result;
};

const getDetailCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`data id tidak ditemukan,${id}`);

  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;

  // cari categories dengan field name
  const check = await Categories.findOne({ name });

  // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
  if (check) throw new BadRequestError("kategori nama duplikat");

  const result = await Categories.create({ name });

  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  // cari categories dengan field name dan id selain dari yang dikirim dari params
  const check = await Categories.findOne({
    name,
    _id: { $ne: id },
  });

  // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
  if (check) throw new BadRequestError("kategori nama sudah ada");

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan error `Tidak ada Kategori dengan id` yang dikirim client
  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOneAndDelete({ _id: id });

  if (!result) throw new NotFoundError(`kategori id tidak ditemukan,${id}`);

  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findOne({ id: id });
  if (result) throw new NotFoundError(`data category id tidak ditemukan,${id}`);
  return result;
};

module.exports = {
  getAllCategories,
  getDetailCategories,
  createCategories,
  updateCategories,
  deleteCategories,
  checkingCategories,
};
