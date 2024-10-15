import mongoose from "mongoose";

const MenuSchema = mongoose.Schema({
  title: String,
  path: String,
  order: Number,
  active: Boolean,
});

export default mongoose.model("Menu", MenuSchema);
