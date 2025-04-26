//todo method1
// import mongoose , {Schema} from "mongoose";
//todo method2
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment:{
      type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }, 
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
});
const review = mongoose.model("review", reviewSchema);
export default review;