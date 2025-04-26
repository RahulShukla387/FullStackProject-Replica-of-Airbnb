import listing from "../models/listing.js";
import reviews from "../models/review.js";
//todo Showing index
  const index = async(req, res)=>{
    let currUser = req.user; //try to access the users information who is logged in.
      let listings = await listing.find({});
      res.render("listing.ejs",{listings , currUser});
    }
    //todo Showing one list
    const showone =  async (req, res)=>{
        let {id} = req.params;
        // let list = await listing.findById(id).populate("reviews");
        let list = await listing.findById(id).populate([ //todo when you have to populate more than one.
          {path: "reviews", //todo here nested populate method has been used means i have to populate review as well as author i.e under the reviews so to populate both i have to use nested method.
            populate:{
             path: "author",
            },
          },
          {path: "owner"},
        ]);
        let currUser = req.user;
        // console.log(list);
        if(!list){
        req.flash("error", " list had been deleted ");
         res.redirect("/listing")
        }
        req.flash("success", "List in detail ");
    
         res.render("showone.ejs",{list, currUser});
      }
       //todo adding review
      const addReview = async(req, res)=>{
        let {id} = req.params;
        let {review} = req.body;
        const newlisting = await listing.findById(id);
        // console.log(review);
        let newreview = await reviews.insertOne({
          ...review,
          author: req.user._id,
      });
       await newlisting.reviews.push(newreview);
       await newlisting.save();
       if(!newlisting){
        req.flash("success", " list had been deleted ");
         res.redirect("/listing")
        }
        // console.log(await reviews.find({}));
        console.log("listing is "+await newlisting);
        req.flash("success", "New review being added in your listing ");
        res.redirect(`/listing/${id}`);
        console.log(req.body);
      }
      //todo destroy routes

      const destroy = async (req, res)=>{
        let {id , reviewid} = req.params;
        await reviews.findByIdAndDelete(reviewid);
        await listing.findByIdAndUpdate(id, { $pull: {reviews: reviewid}});  // it will go into the reviews of the listings and the id which will match from reviewid , it will dlt that.
        console.log("Your review has been deleted successfully")
        req.flash("success", " Your review has been deleted successfully ");
    
        res.redirect(`/listing/${id}`);
      }
     

export default {index , showone , addReview , destroy } ;