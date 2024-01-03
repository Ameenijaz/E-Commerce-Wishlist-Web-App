'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation'
import { ServiceUrl } from '../global';
import NavbarUnique from '../Navbar/page';

const ProductDetails = () => {
  
const router = useSearchParams();
const selectedProduct = router.get('data');
console.log(selectedProduct);

    if (!selectedProduct) {
    return null;
  }

  const { productName, description, price, images } =  JSON.parse(selectedProduct);

  return (
    <main>
    <NavbarUnique/>

    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md mt-8">
        <h1 className="text-3xl font-bold mb-4">{productName}</h1>
        <img
          src={`${ServiceUrl}/UploadImage/?filename=${images[0]["name"]}`}
          alt={images[0]["name"]}
          className="w-full h-96 object-cover rounded-md mb-4"
        />
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-green-600 font-semibold">${price}</p>
      </div>
    </div>
    </main>
  );
};

export default ProductDetails;
