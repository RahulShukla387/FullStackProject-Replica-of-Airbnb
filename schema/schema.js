import joi from "joi";
import listing from "../models/listing.js";
const listingSchema = joi.object({
    listing: joi.object({
      title: joi.string().required(),
      description: joi.string().required(),
      location: joi.string().required(),
      country: joi.string().required(),
      price: joi.string().required(),
      imgurl: joi.string().allow("", null), // it means that image can we either null or "" ,   
    }).required(),
})
export default listingSchema;
const reviewSchema = joi.object({
  review: joi.object({
  rating: joi.number().min(1).max(5).required(),
  comment: joi.string().required(),
  }).required()
})
export {reviewSchema, listingSchema};
// export { listingSchema};