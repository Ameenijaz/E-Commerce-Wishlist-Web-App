const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  productName: {
    type: String,
},
  description: {
    type: String
},
  price:{
   type:  Number
},
images: [
  {
    name: String,
  },
],
});


const WishlistItem   = mongoose.models.wishlistitem || mongoose.model('wishlistitem', wishlistSchema);

export default WishlistItem;

// const WishlistItem = mongoose.model('WishlistItem', wishlistSchema);

// module.exports = WishlistItem;



// import mongoose from "mongoose";

// var UserSchema = new mongoose.Schema({

    
//         username: {
//                 type: String,
//                 required: true
//         },

//         email: {
//                 type: String,
//                 required: true
//         },
      


//         password: { 
//                 type: String
//         },
//         role: { 
//                 type: String
//         },
//         type: { 
//                 type: String
//         },    


    
// });

