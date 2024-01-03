"use client";
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUser } from "react-icons/fa"; // Import the user icon
import { FiMenu } from "react-icons/fi";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useRouter, useSearchParams } from "next/navigation";
import { ServiceUrl } from "../global";
// import UserDropdown from "../Components/UserMenu/page";
import { Ring } from "@uiball/loaders";

const NavbarUnique = () => {
  const [show, setshow] = useState(true);
  const [userid, setUserid] = useState("");
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();
  const router1 = useSearchParams();
  const userparams = router1.get('data')
  const [isLoading1,setIsLoading1]=useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { label: 'ADMIN', value: 'ADMIN', route: '/Components/Admin' },
    { label: 'Add Society', value: 'Add Society', route: '/Components/Add_Society' },
    { label: 'Add Agency', value: 'Add Agency', route: '/Components/Add_Agencies' },
    { label: 'Add Project', value: 'Add Project', route: '/Components/Add_Project' },
    { label: 'WishListApp', value: 'WishListApp', route: '/WishListApp'},
    { label: 'Plot Finder', value: 'Plot Finder', route: '/' },
  ];
  // Add_Project

  const handleopenMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleOptionClick = (option , move) => {
    setSelectedOption(option);
    setShowMenu(false);

    console.log(move)
      // Navigate to the selected route if it's defined
      router.push(move);
    
  };






  const userdata = JSON.parse(userparams);

  useEffect(() => {
    console.log("fetching data from databse:", userdata)
  }, [])


  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const [text] = useTypewriter({
    words: [
      "Your trusted Buying home Platform.",
      "Providing best home for customers.",
      "Delivery on time in demand.",
    ],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });

  const [selectedTab, setSelectedTab] = useState("HOME"); // Initialize with the default selected tab

  
  const handleTabClick = (tab) => {
  setIsLoading1(true)
    console.log(tab);
    setSelectedTab(tab);
    setTimeout(()=>{
      setIsLoading1(false)
    },6000)
  };

  const login = () => {
    router.push("/Components/Login");
  };

  const SignUp = () => {
    router.push("/Components/Sign_Up");
  };

  // Show the button when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("_id");
    setUserid(id);
    var userobj = localStorage.getItem("current_user");
    // console.log(JSON.parse(userobj), "data in local object");
    setUser(JSON.parse(userobj));
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    // Call the async function to fetch data
  }, []);
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Replace with the actual async operation.
  };

      
  return(
<nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
  <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="/commerce.png" className="h-12 w-12 rounded-full shadow-md" alt="Flowbite Logo" />
      <span class="self-center text-2xl font-semibold  whitespace-nowrap dark:text-white text-blue-600">E-commerce Wishlist</span>
  </a>
  <button data-collapse-toggle="navbar-multi-level" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-multi-level" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
      </svg>
  </button>
  <div class="hidden w-full md:block md:w-auto" id="navbar-multi-level">
    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    <Link href={"/WishListApp"} prefetch={false}>
             
      <li>
        <span href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</span>
      </li>
      </Link>
  
      <li>
        <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
      </li>
    </ul>
  </div>
</div>
</nav>

//     <div>
//       <div className="max-w-screen-2xl h-full mx-auto px-4  bg-white flex items-center justify-between">
//       {/* {isLoading1 && <LoadingIndicator />} */}
//         <div className=" flex ">
//           <img src="/logo2.png" className="w-25 h-20" />
//           <div className="flex flex-col mt-3 ">
//             <text className="text-purple-700 font-sans font-bold text-xl">
//               Blessed Pakistan
//             </text>
//             <text className="text-purple-700 font-sans font-semibold text-xs">
//               Har pta Hame Pata he
//             </text>
//           </div>
//         </div>

//         <div class="max-w-2xl ml-[100px] mt-5 mx-auto">
//           <div class=" mb-4">
//             <ul
//               class="flex flex-wrap -mb-px"
//               id="myTab"
//               data-tabs-toggle="#myTabContent"
//               role="tablist"
//             >
//               <li className="mr-2" role="presentation">
//                 <Link href={"/"} prefetch={false}>
//                   <button
//                     className={`inline-block text-black  hover:bg-slate-300 hover:rounded-lg  rounded-t-lg py-4 px-4 text-xs font-medium text-center border-transparent border-b-4 ${selectedTab === "HOME" ? " bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 text-white text-center w-[100px] font-semibold rounded-lg" : ""
//                       }`}
//                     id="profile-tab"
//                     onClick={() => handleTabClick("HOME")}
//                   >
//                     HOME
//                   </button>
//                 </Link>
//               </li>
//               <li class="mr-2" role="presentation">
//                 <Link href={"/Components/Land_Records"} prefetch={false}>
//                   <button
//                     className={`inline-block text-black hover:bg-slate-300 hover:rounded-lg  rounded-t-lg py-4 px-4 text-xs font-medium text-center border-transparent border-b-4 ${selectedTab === "ADD PROPERTY"
//                         ? " bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 text-white text-center w-[100px] font-semibold rounded-lg"
//                         : ""
//                       }`}
//                     id="profile-tab"
//                     onClick={() => handleTabClick("LAND RECORDS")}
//                   >
//                     LAND RECORDS
//                   </button>
//                 </Link>
//               </li>
//               <li class="mr-2" role="presentation">
//                 <Link href={"/Components/View_Societies"} prefetch={false}>
//                   <button
//                     className={`inline-block text-black   hover:bg-slate-300 hover:rounded-lg rounded-t-lg py-4 px-4 text-xs font-medium text-center border-transparent border-b-4 ${selectedTab === "SOCIETY VIEW"
//                         ? " bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 text-white text-center w-[100px] font-semibold rounded-lg"
//                         : ""
//                       }`}
//                     id="profile-tab"
//                     onClick={() => handleTabClick("SOCIETY VIEW")}
//                   >
//                     SOCIETY VIEW
//                   </button>
//                 </Link>
//               </li>
            
            


// {/* ////////////////////////  Dropdown More Options /////////////////////////// */}







// <div >
//       <button
//         onClick={handleopenMenu}
//         className="relative w-full mt-2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 text-white text-center  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
//       >
//         More
//         <svg
//           className={`w-2.5 h-2.5 ml-2.5 ${showMenu ? 'transform rotate-180' : ''}`}
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 10 6"
//         >
//           <path
//             stroke="currentColor"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             stroke-width="2"
//             d="m1 1 4 4 4-4"
//           />
//         </svg>
//       </button>

//       {showMenu && (
//         <div
//           id="dropdown"
//           className="z-50 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 w-48"
//         >
//           <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
//             {options.map((option) => (
//               <li className="mr-2" role="presentation" key={option.value}>
//                 <button
//                   className={`block w-full py-3 text-xs font-medium hover:bg-slate-300 text-center border-transparent border-b-2 `}
//                   id="profile-tab"
//                   onClick={() => handleOptionClick(option , option.route)}
//                 >
//                   {option.label}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>




//             </ul>
//           </div>
//         </div>

//         <div>
//           <Link href="/Components/Add_Property" prefetch={false}>
//             <button
//               className="w-[116px]  h-10 relative transform transition-transform motion-ease-in-out motion-duration-300 hover:scale-105 active:scale-95 text-xs flex justify-center font-sans font-medium items-center cursor-pointer  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 text-white m-2 rounded  hover:shadow-xl "
//               onClick={handleButtonClick}
//               disabled={isLoading} // Disable the button when it's in the loading state.
//             >
//               {isLoading ? (
//                 <div className="flex gap-1" >
//                   <Ring
//                     size={15}
//                     lineWeight={5}
//                     speed={2}
//                     className="mt-1"
//                     color="white"
//                   />
//                 </div>
//               ) : (
//                 <div className="flex" >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="17"
//                     height="17"
//                     fill="currentColor"
//                     className="bi bi-plus mr-1 text-white relative z-10"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M7.5 1a.5.5 0 0 1 .5.5V7h5.5a.5.5 0 0 1 0 1H8v5.5a.5.5 0 0 1-1 0V8H1.5a.5.5 0 0 1 0-1H7V1.5a.5.5 0 0 1 .5-.5z" />
//                   </svg>
//                   Add Property
//                 </div>
//               )}
//             </button>
//           </Link>
//         </div>
//         <div className="hidden lg:inline-flex font-sans gap-8 items-center">
//           {userid ? (
//             <></>
//           ) : (
//             <>
//               <button
//                 onClick={login}
//                 className="w-[96px] h-10  relative transform transition-transform motion-ease-in-out motion-duration-300 hover:scale-105 active:scale-95 text-xs flex justify-center font-sans font-medium items-center cursor-pointer  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 text-white m-2 rounded  hover:shadow-xl  "
//               >
//                 Login
//               </button>
//               <button
//                 onClick={SignUp}
//                 className="w-[96px] h-10  relative transform transition-transform motion-ease-in-out motion-duration-300 hover:scale-105 active:scale-95 text-xs flex justify-center font-sans font-medium items-center cursor-pointer  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 text-white m-2 rounded shadow-lg hover:shadow-xl  "
//               >
//                 SignUp
//               </button>
//             </>
//           )}

//         </div>
//         <div className="inline-flex lg:hidden">
//           <FiMenu className="text-3xl" />
//         </div>
//       </div>
//     </div>

  );
};

export default NavbarUnique;
