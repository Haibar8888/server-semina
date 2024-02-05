// import model category
const Role = require('./model');

// buat function create
const create = async (req, res, next) => {
  try {
		// membuat role baru menggunakan data dari `name`
    const { name } = req.body;

		// simpan Role yang baru dibuat ke MongoDB
    const result = await Role.create({ name });

		// berikan response kepada client dengan mengembalikan product yang baru dibuat
    res.status(201).json({
      data: result,
      message : "data berhasil ditambahkan"
    });
  } catch (err) {
		// jika terjadi kesalahan kemudian gunakan method `next` agar Express memproses error tersebut
    next(err);
  }
};

const index = async (req, res, next) => { 
    try {

        const result = await Role.find()

        if (result.length < 0) {
             res.status(500).json({
                data: result,
                message: 'data kosong'
            })  
        }

        res.status(200).json({
          data: result,
          message: 'data berhasil ditampilkan'
        })
       
    } catch (error) {
        next(error);
    }
}


const find = async (req, res, next) => {
  try {
    const { id } = req.params;

		// mencari categories di MongoDB berdasarkan field _id
    const result = await Role.findOne({ _id: id });
 
    // bila result tidak mendapatkan data categories maka akan mereturn response `message: 'Id categories tidak ditemukan'`
    if (!result) {
      return res.status(404).json({ message: 'Id role tidak ditemukan' });
    }

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // cari dan update categories berdasarkan field _id
    const result = await Role.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true, runValidators: true } // menampilkan data baru dan menjalankan validation
    );
    if (!result) {
      return result.status(404).json({
        message : "tidak bisa diupdate"
      })
    }
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // cari dan hapus categories berdasakan field _id
    const result = await Role.findOneAndDelete({ _id: id });
    res.status(200).json({
      data: result,
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