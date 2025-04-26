// const mongoose = require('mongoose');
import listings from "./data.js";
import listing from "./listing.js";
async function updateData(){
  let allList = await listing.find() ;
  let bdata =await allList.map((obj)=>({...obj , Owner: "6803d6a19c9618c84fe233b7"}))
  for(let list= 0; list < bdata.length; list++){
    await listing.insertMany([{
      title: bdata[list].title,                 
      description: bdata[list].description,
      image: bdata[list].image,
       price: bdata[list].price,
       location: bdata[list].location,
       country: bdata[list].country, 
       owner: bdata[list].Owner,
    }])
  }
  // await listing.deleteMany({});
  console.log(bdata.length);
      // await listing.insertMany(bdata);
  console.log(await listing.find());
}
// updateData();
const insertdata= async()=>{   
  for(let list = 0;list<listings.length; list++){

    await listing.insertMany([{               
      title: listings[list].title,                 
      description: listings[list].description,
      image: listings[list].image,
       price: listings[list].price,
       location: listings[list].location,
       country: listings[list].country, 
       
  }])
  }            
    console.log(await listing.find());
  
}
// insertdata();
let list = async()=>{

  console.log( listings[0].title);
}
// list();

const updateListings = async () => {
  const userId = '6803d6a19c9618c84fe233b7';

  await listing.updateMany(
    { owner: { $exists: false } }, // only update those that don't have Owner
    { $set: { owner: userId } }
  );

  console.log('Owner field added to existing listings.');
};
updateListings();