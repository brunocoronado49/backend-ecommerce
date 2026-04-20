import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: [String],
    default: ['USER_ROLE'],
    enum: ['SELLER_ROLE', 'USER_ROLE'],
  },
});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, { _id, __v, password, ...rest }) => ({ ...rest }),
});

export const UserModel = mongoose.model('User', userSchema);
