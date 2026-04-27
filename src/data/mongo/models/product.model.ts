import mongoose, { Schema } from 'mongoose';
import { availableParallelism } from 'node:os';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    unique: true,
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
  },
  available: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, { _id, __v, ...rest }) => ({ ...rest }),
});

export const ProductModel = mongoose.model('Product', productSchema);
