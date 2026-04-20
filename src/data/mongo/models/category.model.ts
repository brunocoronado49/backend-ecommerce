import mongoose, { Schema } from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
  },
  available: {
    type: Boolean,
    default: false,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

categorySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, { _id, __v, ...rest }) => ({ ...rest }),
});

export const CategoryModel = mongoose.model('Category', categorySchema);
