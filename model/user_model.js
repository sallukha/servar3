const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const User = mongoose.model('User', userSchema);

module.exports = User;
