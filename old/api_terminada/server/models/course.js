import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const CourseSchema = mongoose.Schema({
  title: String,
  miniature: String,
  description: String,
  url: String,
  price: Number,
  score: Number,
});

CourseSchema.plugin(mongoosePaginate);
export default mongoose.model("Curso", CourseSchema);
