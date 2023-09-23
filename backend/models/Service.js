import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Service", serviceSchema);
