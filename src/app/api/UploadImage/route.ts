import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import WishlistItem from "../../models/addwishlist";
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library
import { readFile } from "fs/promises";




  export async function POST(request: NextRequest) {

    try{
      const data = await request.formData();
      const productName = data.get("productName");
      const price = data.get("price");
      const description = data.get("description");      
      const image_files: File[] = data.getAll("imagefiles") as unknown as File[];
     console.log(image_files);
      if (!image_files) {
        return NextResponse.json({ status: 400, message: "Invalid data" });
      }   
       //  for images List 
    const uniqueId = uuidv4();
    // Define arrays to store the unique filenames for images and videos
    const uniqueImageFilenames = [];   
    // Loop through image files
    for (const image of image_files) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      // Generate a unique filename for the image
      const imageFilename = `${uniqueId}_${uuidv4()}_${image.name}`;
      // Add the filename to the uniqueImageFilenames array
      uniqueImageFilenames.push({ name: imageFilename });
      // Save the file to the server with the unique filename
      const path = `../data/${imageFilename}`;
      await writeFile(path, buffer);
    }
    console.log("uniqueImageFilenames:",uniqueImageFilenames);
    // Loop through video files
    const property = new WishlistItem({
      productName,
      description,        
      price,
        images: uniqueImageFilenames,
        });
      const dataimage = await property.save()    
       return NextResponse.json({ status: 200, message: "Data saved successfully",dataimage:dataimage });
      } catch (error) {
        console.error("Error saving data:", error);
        return NextResponse.json({ status: 500, message: "Error saving data" });
      }
      }    
    


export async function GET(request) {
 console.log("hit fetch!");
  const url = new URL(request.url);
  const filename = url.searchParams.get('filename');

  if (!filename) {
    return new Response(null, { status: 400, statusText: 'Bad Request' });
  }

  // Assuming the uploaded files are stored in the "/public/tmp" directory
  const path = `../data/${filename}`;

  try {
    // Read the file from the filesystem
    const fileData = await readFile(path);
    
    // Get the file extension
    const extension = filename.split('.').pop().toLowerCase();

    // Set the appropriate content type based on the file extension
    let contentType = 'application/octet-stream'; // Default content type for unknown file types

    if (extension === 'png') {
      contentType = 'image/png';
    } else if (extension === 'jpg' || extension === 'jpeg') {
      contentType = 'image/jpeg';
    } 
    // Add more conditions for other supported file types as needed

    // Set the appropriate headers for the image or video response
    const headers = {
      'Content-Type': contentType,
      'Content-Length': fileData.length.toString(),
    };

    // Return the file as the response
  
    return new Response(fileData, { headers });
  
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    return new Response(null, { status: 404, statusText: 'Not Found' });
  }
}

