import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
  title: String,
  miniature: String,
  description: String,
  url: String,
  price: Number,
  score: Number,
});

export default mongoose.model("Curso", CourseSchema);
