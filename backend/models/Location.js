import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
    },
    districtName: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Location", locationSchema);
