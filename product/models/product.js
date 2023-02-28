import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: {
      type: String,
      required: true,
      minlength: 3,
      match: /^\D+\w{2,}$/,
    },
    description: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      match: /^[A-Za-z0-9]*$/,
    },
    price: {
      type: mongoose.Types.Decimal128,
      min: 0.01,
    },
    quantityInStock: {
      type: Number,
      min: 1,
      max: 10000,
      required: true,
    },
    category: { type: String, ref: 'categories', required: true },
  },
  {
    versionKey: false,
  },
);

const products = mongoose.model('products', productSchema);

export default products;
