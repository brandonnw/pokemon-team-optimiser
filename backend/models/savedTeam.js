import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    sprite: String,
    types: [String]
  },
  { _id: false }
);

const savedTeamSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    teamName: {
      type: String,
      required: true,
      trim: true
    },
    pokemon: {
      type: [pokemonSchema],
      required: true
    },
    analysis: {
      type: Object,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("SavedTeam", savedTeamSchema);