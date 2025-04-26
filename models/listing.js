// unplash is a website for free images without copyright.
import mongoose from "mongoose";
import reviews from "./review.js";
import 'dotenv/config'
const dbUrl= process.env.ATLASDB_URL;


mongoose.connect(dbUrl)
  .then(() => console.log('Connected!'));
   let Schema = mongoose.Schema;
  let listingSchema = new Schema({
    title:{
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        filename: String,
        url: String,
},
    price: {
        type: Number,
    },
    location: {
     type: String,
    },
    country: {
        type: String,
    },
    reviews: [{
       type: Schema.Types.ObjectId,
       ref: "review", 
    }
  ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  })
  listingSchema.post("findOneAndDelete" , async(listing)=>{
    if(listing){
        await reviews.deleteMany({_id: {$in: listing.reviews}}) // it means that whent triggered on listing then access the id of listing and goes to its reviews and and from review collection delete all those id which match from that.
  }
});
  let listing = mongoose.model("listing" , listingSchema);
  export default listing;
let value = await listing.find();
let count = await listing.countDocuments();