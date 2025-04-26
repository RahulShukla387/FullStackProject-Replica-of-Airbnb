
 function isLoggedin(req, res, next){

       if(!req.isAuthenticated()){ // Method of passport which check whether the user has logged in or not
        req.session.redirectUrl = req.originalUrl;  // if you will save the originalUrl in the session then when user logged in then passport will autometically reset to the session so i need to save it any where else, so we create another variable for it
        req.flash("error", "You have to logged in to make changes");
        return res.redirect("/login");
    }
    else{
        
        next();
    }
    console.log(req.user)
 }
 export default isLoggedin;
   export let saveRedirectUrl = (req, res, next )=>{
       if(req.session.redirectUrl){
          res.locals.redirectUrl = req.session.redirectUrl;
        }
        // console.log(req.locals.redirectUrl);
            next();
    }
//     export let rightUser = async(req, res, next)=>{
//         let {id} = req.params;
//         let currUser = req.user; //access the current user 
//         let list = await listing.findById(id);
//         if(! currUser._id.toString().equals(list.owner._id)){
//   req.flash("err", "You are not the owner");
//   return res.redirect(`/listing`)
//         }
         
//     }