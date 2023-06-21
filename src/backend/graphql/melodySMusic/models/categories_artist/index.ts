import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    id: {
      type: Number
    },
    label: {
      type: String
    }
  },
  { timestamps: true }
);
export const CategoriesModelArtist =
  mongoose.models.categories_artist ??
  mongoose.model('categories_artist', schema);
