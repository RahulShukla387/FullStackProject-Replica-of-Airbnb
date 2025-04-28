import listing from "../models/listing.js";
//todo storing localValues for using in the session
// const localValues = (req, res, next)=>{
//     res.locals.success = req.flash("success");
//     res.locals.error = req.flash("error");
//     res.locals.currUser = req.user;
//     next();
//   }
  //todo Showall route 
  const showAll=  async (req, res)=>{
    let currUser = req.user;
    let listings = await listing.find({});
    // console.log(listings);
    res.render("showAll.ejs",{listings, currUser});
  }
//todo newlist 

const newlist = async(req, res, next)=>{
  let url = req.file.path;
  let filename = req.file.filename
  console.log(url + "    ......." + filename);
    let newlisting = new listing({
      ...req.body.listing,   
      owner: req.user._id,
      image:{
        url: req.file.path,
        filename: req.file.filename,
      },
});
    console.log(newlisting);
    await newlisting.save();
    req.flash("success", "You had created a list ");
    res.redirect("/listing");
// res.send("successfully uploaded");
}

//todo Editing the list

const getEdit = async(req, res)=>{
  let {id} = req.params;
  let list = await listing.findById(id);
  if(!list){
    req.flash("error", " Your list doesn't exist ");
    res.redirect("/listing")
    }
    let currUser = req.user; //try to access the users information who is logged in.
    console.log(currUser._id);
  res.render("edit.ejs", {list, currUser});
}
const postEdit = async (req, res)=>{
  try{

    let {id} = req.params;
    let newlisting = await listing.findByIdAndUpdate(id, {...req.body.list}, {new:true});
    await newlisting.save();
    let list = await listing.findById(id);
    if(req.file){
      let filename = req.file.filename;
      let url = req.file.path;
     newlisting.image = { filename, url}
     await newlisting.save();
     }
    req.flash("success", "You had updated your list ");
    res.redirect("/listing");
  } catch(err){
    console.log(err);
    req.flash("error", "Some error occured" );
    res.redirect("/listing");
  }
}

const destroy = async (req, res)=>{
  let{id} = req.params;
 let dltItem = await listing.findByIdAndDelete(id);
 console.log(dltItem);
 req.flash("success", "You had deleted your list ");

  res.redirect("/listing");
}

export default { localValues , showAll , getEdit , postEdit, destroy , newlist } ;
