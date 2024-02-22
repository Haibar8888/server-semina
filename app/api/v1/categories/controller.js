// services
const {
  getAllCategories,
  getDetailCategories,
  createCategories,
  updateCategories,
  deleteCategories,
} = require("../../../services/mongoose/categories");

// buat function create
const create = async (req, res, next) => {
  try {
    // simpan Category yang baru dibuat ke MongoDB
    const result = await createCategories(req);
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

const index = async (req, res, next) => {
  try {
    const result = await getAllCategories(req);
    if (result.length < 0) {
      res.status(500).json({
        data: result,
        message: "data kosong",
      });
    }

    res.status(200).json({
      data: result,
      message: "data berhasil ditampilkan",
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    // mencari categories di MongoDB berdasarkan field _id
    const result = await getDetailCategories(req);

    // bila result tidak mendapatkan data categories maka akan mereturn response `message: 'Id categories tidak ditemukan'`
    if (!result) {
      return res.status(404).json({ message: "Id categories tidak ditemukan" });
    }

    res.status(200).json({
      data: result,
      message: "data berhasil ditemukan",
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    // cari dan update categories berdasarkan field _id
    const result = await updateCategories(req);

    res.status(200).json({
      data: result,
      message: "data berhasil diupdate",
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    // cari dan hapus categories berdasakan field _id

    const result = await deleteCategories(req);
    res.status(200).json({
      data: result,
      message: "data berhasil dihapus",
    });
  } catch (err) {
    next(err);
  }
};

// Export fungsi create pada controller categories
module.exports = {
  create,
  index,
  find,
  update,
  destroy,
};
