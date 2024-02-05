const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let roleSchema =  Schema(
  {
    name: {
      type: String,
      minlength: [3, 'Panjang nama role minimal 3 karakter'],
      maxLength: [20, 'Panjang nama role maksimal 20 karakter'],
      required: [true, 'Nama role harus diisi'],
    },
  },
  { timestamps: true }
);

module.exports = model('Role', roleSchema);