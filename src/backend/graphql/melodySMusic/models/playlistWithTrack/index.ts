import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    playlistId: {
      type: String
    },
    trackId: {
      type: String
    }
  },
  { timestamps: true }
);
export const PlaylistWithTrackModel =
  mongoose.models.playlist_tracks ?? mongoose.model('playlist_tracks', schema);
