import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    id: { type: String },
    name: {
      type: String,
      required: true,
      minlength: 3,
      match: /^\D+\w{2,}$/,
    },
    status: { type: Boolean, requires: true },
  },
  {
    versionKey: false,
  },
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
