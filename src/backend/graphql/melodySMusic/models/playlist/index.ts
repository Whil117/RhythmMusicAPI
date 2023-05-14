import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    collaborative: {
      type: Boolean
    },
    description: {
      type: String
    },
    spotify_url: {
      type: String
    },
    id: {
      type: String
    },
    photo: {
      type: String
    },
    name: {
      type: String
    },
    owner: {
      name: {
        type: String
      },
      id: {
        type: String
      },
      type: {
        type: String
      },
      uri: {
        type: String
      },
      spotify_url: {
        type: String
      }
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
export const PlaylistModel =
  mongoose.models.playlist ?? mongoose.model('playlist', schema);
