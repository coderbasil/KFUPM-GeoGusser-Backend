import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  type: {
    type: String,
    enum: ['admin', 'player', 'photographer'],
    default: 'player'
  },
  password: {
    type: String,
    required: true
  },

});

const User = mongoose.model("User", UserSchema);

export default User;