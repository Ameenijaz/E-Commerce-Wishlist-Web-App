"use server"

import WishlistItem from "../models/addwishlist";

export async function  SaveData(productName,description,price) {
    try {
        const SaveWishData = await WishlistItem.create(
            { 
                productName: productName,
                description: description,
                price: price, 
            },
        
        );
     
        return { status: 200, message: "Wishlist Data Saved successfully", SaveWishData: SaveWishData };
    } catch (e) {
      return { status: 500, message: "Something went wrong", error: e.toString(), SaveWishData: null };
    }
}


export async function  FetchWishListData() {
    try {
        const fetchWishData = await WishlistItem.find().lean();
        return {fetchWishData:fetchWishData};
    } catch (error) {
        console.error("Error fetching Wishlist Data :", error);
        throw error;
    }
}




export async function updatewishlistData(itemId, productname,description,price) {
    try {
      // Assuming "Directors" is your database model for chat summaries
      // Find the chat summary by apiModelId and update it with the newChatSummary
      const updatedWishlistData = await WishlistItem.findByIdAndUpdate(
        itemId,
        {   
            productName: productname,
            description: description,
            price: price
         }, // Modify this according to your data structure
        { new: true } // To get the updated document
      ).lean();
  
      if (!updatedWishlistData) {
        return { status: 404, message: "Wishlist Data not Updated", updatedWishlistData: null };
      }
  
      return { status: 200, message: "Wishlist Data updated successfully", updatedWishlistData: updatedWishlistData };
    } catch (e) {
      return { status: 500, message: "Something went wrong", error: e.toString(), updatedWishlistData: null };
    }
  }
  

  
export async function DeleteWishlistItem(listid) {
    try {
      const result = await WishlistItem.findByIdAndDelete({ _id: listid }).lean();
      return { status: 200, message: "Wishlist deleted successfully", result: result };
    } catch (e) {
      return { status: 500, message: "Wishlist not deleted", error: e.toString() };
    }
  }
  


