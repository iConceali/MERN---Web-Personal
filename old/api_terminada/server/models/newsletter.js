import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const NewsletterSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
});

NewsletterSchema.plugin(mongoosePaginate);

export default mongoose.model("Newsletter", NewsletterSchema);
