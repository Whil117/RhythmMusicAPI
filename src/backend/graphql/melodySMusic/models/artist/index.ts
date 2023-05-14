import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    id: {
      type: String
    },
    name: {
      type: String
    },
    photo: {
      type: String
    },
    followers: {
      type: Number
    },
    popularity: {
      type: Number
    },
    genres: {
      type: Array
    },
    uri: {
      type: String
    },
    spotify_url: {
      type: String
    }
  },
  { timestamps: true }
);
export const ArtistModel =
  mongoose.models.artist ?? mongoose.model('artist', schema);
