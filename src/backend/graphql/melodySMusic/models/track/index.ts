import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    id: {
      type: String
    },
    name: {
      type: String
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

    album_id: {
      type: String,
      required: true
    },
    disc_number: {
      type: Number
    },
    duration_ms: {
      type: Number
    },
    explicit: {
      type: Boolean
    },
    spotify_url: {
      type: String
    },
    preview_url: {
      type: String
    },
    track_number: {
      type: Number
    },
    uri: {
      type: String
    }
  },
  { timestamps: true }
);
export const TrackModel =
  mongoose.models.track ?? mongoose.model('track', schema);
