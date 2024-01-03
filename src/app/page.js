
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WishlistForm from './WishListApp/page';
// import { WishlistForm } from './WishListApp/page';


export default function Home() {

  return (
    <main >
   
<WishlistForm/>
{/* <Dashboard /> */}
 {/* Render the bottom sheet card */}


 
    <ToastContainer position="top-center" /> 
    </main>
  )
}
