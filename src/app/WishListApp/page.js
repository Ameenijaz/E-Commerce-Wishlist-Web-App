"use client"
import React, { useEffect, useRef, useState } from 'react';
import { DeleteWishlistItem, FetchWishListData, SaveData, updatewishlistData } from '../action/addwishlist';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosClose } from 'react-icons/io';
import Image from 'next/image';
import Link from 'next/link';
import { ServiceUrl } from '../global';
import { BiSearchAlt2, BiSolidImage } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import NavbarUnique from '../Navbar/page';
import { GoEye } from "react-icons/go";

 const WishlistForm = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState([]);
  const fileInputRef = useRef();
  const [previewImages, setPreviewImages] = useState([]);
  const [isloading,setIsLoading]=useState(false);
  const [showcard,setShowCard] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState({
    productName: "",
    description: "",
    price: " "
});
  // ... existing code ...

  const handleProductClick = (product) => {
    router.push(`/product-details/?data=${JSON.stringify(product)}`); // Navigate to the details page
  };




  useEffect(() => {
    // Fetch the user's Wishlist from the server
    fetchWishlist();
  }, []); // Run this effect only once on component mount

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    // Clear the previously selected files
    setFile([]);
    setPreviewImages([]);
    setPreviewImages(newImages);
    toast.success("upload Image successfully");
    setFile([...files]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowCard(false);
    if (productName && description && price ) {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("description", description);
      formData.append("price", price);
      file.forEach((image) => {
        formData.append("imagefiles", image);
      });

      try {
        const response = await fetch(`${ServiceUrl}/UploadImage`, {
          method: "POST",
          body: formData,
        });
        
        // const responsedata = JSON.stringify(response); 
       console.log("response:",response.dataimage);
        if (response.status === 200) {
          toast.success("Item added successfully!");
        //  console.log("responsedata.property",responsedata.property);
        //  setWishlist((prevdata) => [ ...prevdata ,response.property ] );
          setProductName("");
          setDescription("");
          setPrice("");
          setFile([]);
          setPreviewImages([]);
        } else {
          console.log("Error uploading file.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
    setIsLoading(false);
  };


  
  const fetchWishlist = async () => {
    const response = await FetchWishListData();
    console.log("response.fetchWishData",response.fetchWishData);
    setWishlist(response.fetchWishData);
  };

  
  const handleDelete = async(itemId) => {

      const delete_wishlist = await DeleteWishlistItem(itemId);
     if(delete_wishlist){
      toast.success(delete_wishlist.message)
  }else{
      toast.error(delete_wishlist.message)
    }
      // Implement your delete logic here
      console.log(`Deleted item with ID ${itemId}`);
    };
  
    const handleInputChange = (e, field) => {
      setSelectedItem({
        ...selectedItem,
        [field]: e.target.value,
      });
    };
  

const handleUpdate = (item) => {
 setShow(true);
  setSelectedItem(item);
};

 async function updateData(){
  const updatedData = await updatewishlistData(selectedItem._id,selectedItem.productName,selectedItem.description,selectedItem.price); 
  if(updatedData){
      toast.success(updatedData.message);
      setShow(false);
  }else{
   toast.error(updatedData.message);
   setShow(false);
  }
 }

  return (
  <mian className="min-h-screen w-full ">
<NavbarUnique/>
<ToastContainer/>
    <div>    
      <div className="container mx-auto p-4 w-full h-full">
     <div className='flex justify-between' >
      <div className='bg-white rounded-tr-full flex justify-center items-center rounded-br-full shadow-md px-4 py-4' >  
        <h1 className="text-xl font-bold ">E-Commerce Dashboard</h1>
</div>

<button
onClick={ ()=> setShowCard(!showcard)}
className='bg-white px-3 rounded-lg flex gap-2 justify-center items-center  shadow-md mt-6 h-[50px]' >
<FaPlus className='text-blue-600 w-4 h-4 '/>
ADD PRODUCT
</button>
</div>
      
      <div className="flex flex-row gap-6 flex-wrap w-full">
         {wishlist.length === 0 ? (
        <div className='flex justify-center items-center w-full h-full' >
        <p>Your Cart is Empty</p>
         </div>
         ):
          
         wishlist.map((product, index) => (
            <div
            key={index} className="bg-white p-4 rounded-lg shadow-md mt-5 w-[400px]">
                   <div className="mb-4">
              <img
  className=" h-[400px] w-full"
    src={`${ServiceUrl}/UploadImage/?filename=${product.images[0]["name"]}`}
    alt={product.images[0]["name"]}
    loading="lazy"
  />
        </div>
              <div className='flex justify-between' >
              <h2 className="text-lg font-bold">{product.productName}</h2>
             <div className='flex gap-2' >
             <button
                  className="text-blue-500 focus:outline-none hover:scale-125 duration-500"
                  onClick={() => handleProductClick(product)}
                >
                  <GoEye 
             className="h-4 w-4" />
                </button>
               
              <button
                  className="text-blue-500 focus:outline-none hover:scale-125 duration-500"
                  onClick={() => handleUpdate(product)}
                >
                  <BsPencilSquare className="h-4 w-4" />
                </button>
                <button
                  className="text-red-500 focus:outline-none hover:scale-125 duration-500"
                  onClick={() => handleDelete(product._id)}
                >
                  <BsTrash className="h-4 w-4" />
                </button>
             </div>
             </div>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-green-600 font-semibold">${product.price}</p>
            </div>
          ))}
        </div>
      
      
      </div>
    </div>
{ showcard && (
 <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-80">

  <form onSubmit={handleSubmit} 
  className=" relative w-[450px] h-[600px] mx-auto p-8 bg-white rounded shadow-md  overflow-hidden overflow-y-auto">
  <div
  onClick={ ()=> setShowCard(false)}
  className='absolute top-3 right-3 ' >
<IoIosClose className=' text-blue-600 w-8 h-8' />
</div>
    <div className='flex justify-center items-center w-full  ' >
  <img src="/commerce.png" className="h-[100px] w-[100px]  rounded-full shadow-md" alt="Flowbite Logo" />
  </div>
    <label className="block text-gray-700 text-sm font-bold mb-2">Product Name:</label>
    <input
      type="text"
      name="productName"
      value={productName}
      onChange={(e) => setProductName(e.target.value)}
      className="w-full border-b-2 border-gray-300 p-2 mb-4"
    />

    <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
    <input
      type="text"
      name="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
        className="w-full border-b-2 border-gray-300 p-2 mb-4"
    />

    <label className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
    <input
      type="number"
      name="price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className="w-full border-b-2 border-gray-300 p-2 mb-4"
    />

<label className="block text-gray-700 text-sm font-bold mb-2">UploadImage</label>
  
  
<div className="flex gap-5 w-[50%] mt-3">
            <button
              onClick={() => {
                fileInputRef.current.click();
              }}
              type="button"
              className="flex gap-2 text-white  bg-blue-600  font-medium rounded-md text-xs px-5 py-2.5 text-center mr-2 mb-2"
            >
              <BiSolidImage className="w-4 h-4" />
              Upload Image
            </button>
          </div>

          <input
            type="file"
            accept="image/*"
            multiple
            name="imagefiles"
            onChange={handleImageUpload}
            className="hidden"
            ref={fileInputRef}
          />
          <div className="flex flex-wrap gap-4 mt-4 mb-4">
            {previewImages.map((imageUrl, index) => (
              <div key={index} className="w-32 h-32 relative">
                <img
                  src={imageUrl}
                  alt={`Uploaded Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  className="absolute top-0 right-0 text-white mt-2  bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 border-none  font-medium rounded-lg text-sm px-4 py-2 opacity-30 hover:opacity-100 text-center mr-2 mb-2"
                  onClick={() => {
                    const updatedImages = [...previewImages];
                    updatedImages.splice(index, 1);
                    setPreviewImages(updatedImages);
                  }}
                >
                  <RiDeleteBin6Line className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
    <button
      type="submit"
      className="bg-blue-600 font-sans font-medium text-sm text-white flex justify-center items-center py-3  w-full  rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
    >
      Add to Wishlist
    </button>
  </form> 
</div>
  )}
  {show && (
<div className="fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto z-50">
  <div className="bg-white rounded shadow-md w-[500px] p-8 relative">
    <button className="close-btn absolute top-4 right-4 text-black" onClick={()=>setShow(false)}>
      <IoIosClose className='w-7 h-7 ' />
    </button>
    <h2 className="text-2xl font-semibold mb-4">Edit Wishlist Item</h2>
    <form>
      {/* Product Name Input */}
      <div className="mb-4">
        <label htmlFor="productName" className="block text-gray-700 font-semibold mb-2">
          Product Name
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={selectedItem.productName}
          onChange={(e) => handleInputChange(e, 'productName')}
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      {/* Description Input */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={selectedItem.description}
          onChange={(e) => handleInputChange(e, 'description')}
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
        ></textarea>
      </div>

      {/* Price Input */}
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={selectedItem.price}
          onChange={(e) => handleInputChange(e, 'price')}
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-blue-600 w-full font-sans font-medium text-sm text-white py-3 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={()=> updateData()}
        >
          Update
        </button>
      </div>
    </form>
  </div>
</div>
)}
  </mian>
  );
};

export default WishlistForm;
// bgimage.png

// Modify your React component

// const Wishlist = () => {
//     const [wishlist, setWishlist] = useState([]);
    // const [selectedItem, setSelectedItem] = useState({
    //     productName: "",
    //     description: "",
    //     price: " "
    // });
    // const [show, setShow] = useState(false);
   
//     useEffect(() => {
//       // Fetch the user's Wishlist from the server
//       const fetchWishlist = async () => {
//         const response = await FetchWishListData();
//         console.log(response.fetchWishData)
//         setWishlist(response.fetchWishData);
//       };
  
//       fetchWishlist();
//     }, []); // Run this effect only once on component mount
  
//     const handleDelete = async(itemId) => {

//         const delete_wishlist = await DeleteWishlistItem(itemId);
//        if(delete_wishlist){
//         toast.success(delete_wishlist.message)
//     }else{
//         toast.error(delete_wishlist.message)
//       }
//         // Implement your delete logic here
//         console.log(`Deleted item with ID ${itemId}`);
//       };
    
//       const handleInputChange = (e, field) => {
//         setSelectedItem({
//           ...selectedItem,
//           [field]: e.target.value,
//         });
//       };
    

//  const handleUpdate = (item) => {
//    setShow(true);
//     setSelectedItem(item);
// };

//    async function updateData(){
//     const updatedData = await updatewishlistData(selectedItem._id,selectedItem.productName,selectedItem.description,selectedItem.price); 
//     if(updatedData){
//         toast.success(updatedData.message);
//         setShow(false);
//     }else{
//      toast.error(updatedData.message);
//      setShow(false);
//     }
//    }



//     return (
//  <main>
//         <h2 className="text-3xl font-semibold mb-4 text-center text-blue-600 mt-10">MY WISHLIST</h2>
 
//  <div className="max-w-xl mx-auto p-8 bg-white rounded shadow-md mt-8 mb-8 opacity-90">
 
//        <div className='flex justify-center items-center w-full  ' >
//   <img src="/commerce.png" className="h-[100px] w-[100px]  rounded-full shadow-md" alt="Flowbite Logo" />
//   </div>
//       {wishlist.length === 0 ? (
//         <p className="text-gray-500">Your wishlist is empty.</p>
//       ) : (
//         <ul>
//           {wishlist.map((item,index) => (
//             <li
//               key={index}
//               className="border-b cursor-pointer py-4 flex justify-between items-center transition duration-300 ease-in-out hover:bg-gray-100 hover:rounded-lg px-3"
//             >
//               <div>
//                 <div className='flex gap-3' >
//                 <h3 className="text-lg font-semibold">{item.productName}</h3>
//                 <h3 className="text-lg font-semibold text-blue-500">${item.price}</h3>
//                 </div>
//                 <p className="text-gray-500">{item.description}</p>
//               </div>
//               <div className="flex items-center space-x-4">
                // <button
                //   className="text-blue-500 focus:outline-none hover:scale-125 duration-500"
                //   onClick={() => handleUpdate(item)}
                // >
                //   <BsPencilSquare className="h-5 w-5" />
                // </button>
                // <button
                //   className="text-red-500 focus:outline-none hover:scale-125 duration-500"
                //   onClick={() => handleDelete(item._id)}
                // >
                //   <BsTrash className="h-5 w-5" />
                // </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
// {show && (

//   <div className="fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto z-50">
//     <div className="bg-white rounded shadow-md max-w-md p-8 relative">
//       <button className="close-btn absolute top-4 right-4 text-black" onClick={()=>setShow(false)}>
//         <IoIosClose className='w-7 h-7 ' />
//       </button>
//       <h2 className="text-2xl font-semibold mb-4">Edit Wishlist Item</h2>
//       <form>
//         {/* Product Name Input */}
//         <div className="mb-4">
//           <label htmlFor="productName" className="block text-gray-700 font-semibold mb-2">
//             Product Name
//           </label>
//           <input
//             type="text"
//             id="productName"
//             name="productName"
//             value={selectedItem.productName}
//             onChange={(e) => handleInputChange(e, 'productName')}
//             className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
//           />
//         </div>

//         {/* Description Input */}
//         <div className="mb-4">
//           <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={selectedItem.description}
//             onChange={(e) => handleInputChange(e, 'description')}
//             className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
//           ></textarea>
//         </div>

//         {/* Price Input */}
//         <div className="mb-4">
//           <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
//             Price
//           </label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={selectedItem.price}
//             onChange={(e) => handleInputChange(e, 'price')}
//             className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="button"
//             className="bg-blue-600 w-full font-sans font-medium text-sm text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
//             onClick={()=> updateData()}
//           >
//             Update
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )}
//     </div>
//     </main>
//         );
//   };
  
