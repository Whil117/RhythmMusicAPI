import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    id: {
      type: String
    },
    album_type: {
      type: String
    },
    album_group: {
      type: String
    },
    label: {
      type: String
    },
    popularity: {
      type: Number
    },
    artists: [
      {
        id: {
          type: String
        },
        name: {
          type: String
        },
        spotify_url: {
          type: String
        },
        uri: {
          type: String
        }
      }
    ],
    available_markets: [
      {
        type: String
      }
    ],
    spotify_url: {
      type: String
    },
    photo: {
      type: String
    },
    name: {
      type: String
    },
    release_date: {
      type: String
    },
    release_date_precision: {
      type: String
    },
    total_tracks: {
      type: Number
    },
    uri: {
      type: String
    }
  },
  { timestamps: true }
);
export const AlbumModel =
  mongoose.models.album ?? mongoose.model('album', schema);
