import mongoose from 'mongoose';

// const openGraphSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   image: String,
// });
// 이거 대신 mongoose.Schema.Types.Mixed 타입 사용

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  personal: String,
  prefer: String,
  pwd: String,
  phone: String,
  og: mongoose.Schema.Types.Mixed,
});

export const User = mongoose.model('User', userSchema);
