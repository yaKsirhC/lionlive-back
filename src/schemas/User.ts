import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  qoinBalance: {
    type: Number,
    default: 0,
  },
  birthDate: Date,
  gender: String,
  location: String,
  isVIP: {
    type: Boolean,
    default: false,
  },
  matches: {
    type: Array<String>,
    default: [],
  },
  conversations: {
    type: Array<String>,
    default: [],
  },

  password: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
