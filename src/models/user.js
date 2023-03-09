const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  avatar: {
    type: String,
    required: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  birthday: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt();
  // nếu mật khảu đã bâm thì ko cần bâm
<<<<<<< HEAD
  if (!this.isModified("password")) {
=======
  if (!this.isModified('password')) {
>>>>>>> fbcd6c6b2537f39d903d44c060ed06c64559fa16
    return next();
  }
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};
module.exports = mongoose.model('Users', userSchema);
