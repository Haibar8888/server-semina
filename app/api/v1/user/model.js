const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcryptjs");

let userSchema = Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlenght: 50,
      required: [true, "nama harus diisi"],
    },
    email: {
      type: String,
      minlength: 3,
      maxlenght: 50,
      required: [true, "email harus diisi"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "password harus diisi"],
    },
    role: {
      type: String,
      enum: ["admin", "organizer", "owner"],
      message: "role yang anda masukan tidak ada",
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

// hook mongose pre() sebebelum menyimpan user
userSchema.pre("save", async function (next) {
  //   fungsi untuk menencrypsi password
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

// method untuk mencompare password yang dari client ke collection
userSchema.methods.comparePassword = async function (candidatePassowrd) {
  const isMatch = await bcrypt.compare(candidatePassowrd, this.password);
  return isMatch;
};

module.exports = model("User", userSchema);
