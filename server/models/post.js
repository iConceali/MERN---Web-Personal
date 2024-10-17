import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const PostSchema = mongoose.Schema({
  title: String,
  miniature: String,
  content: String,
  path: {
    type: String,
    unique: true,
  },
  created_at: Date,
});

PostSchema.plugin(mongoosePaginate);

export default mongoose.model("Post", PostSchema);
