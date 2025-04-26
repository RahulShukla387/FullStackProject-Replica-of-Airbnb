import express from "express";
import controllerListing from "../controller/controllerListing.js"
const router = express.Router({mergeParams: true});
//todo importing all the methods 
import wrapAsync from "../utils/wrapAsync.js";
import myError from "../utils/myError.js";
import {listingSchema , reviewSchema} from "../schema/schema.js";
import isLoggedin from "../middleware.js";
//todo Making errorValidate function to handle error using joi
export function errorValidate(req, res, next){
    let result = listingSchema.validate(req.body); // it is a schema of joi.
    console.log(result.error);
    if(result.error){
      throw(new myError(401 , result.error));
    }
    else{
      next()
    }
    }
//todo review validate 
function reviewValidate(req, res, next){ // to validate from joi 
    let result = reviewSchema.validate(req.body);
    console.log(result.error);
    if(result.error){
      throw(new myError(401 , result.error));
    }
    else{
      next()
    }
    }

//todo starting server 
//todo index
router.get("/", controllerListing.index )
//todo showone.ejs get request
  router.get("/:id",wrapAsync(controllerListing.showone));
  //todo Adding reviews 
  router.post("/:id/reviews", isLoggedin, reviewValidate, wrapAsync(controllerListing.addReview));
 
  //todo Deleting the reviews of the system 
  router.delete("/:id/review/:reviewid", isLoggedin, controllerListing.destroy )
export default router;