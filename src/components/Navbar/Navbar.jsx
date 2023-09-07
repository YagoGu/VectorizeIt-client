import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  
  const idUser = user?._id;
  

  return (
    <nav className="flex flex-row flex-nowrap justify-around items-center sm:p-8 bg-violet-200 ">
      <Link to="/" className="flex flex-col justify-center text-[8px] h-2 sm:h-12 sm:text-base">
      <button className="rounded relative inline-flex group items-center justify-center px-0.5 py-0.5 m-0.5 sm:px-3.5 sm:py-2 sm:m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white">
          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white group-fover:w-20 sm:group-hover:w-20 sm:group-hover:h-10 opacity-10"></span>
          <span className="relative">Home</span>
        </button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to={`/user/${idUser}`} className="flex flex-col justify-center text-[8px] h-12 sm:text-base">
          <button className="rounded relative inline-flex group items-center justify-center px-0.5 py-0.5 m-0.5 sm:px-3.5 sm:py-2 sm:m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white">
            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white group-fover:w-20 sm:group-hover:w-32 sm:group-hover:h-10 opacity-10"></span>
            <span className="relative">Your page</span>
          </button>
          </Link>

          <Link to={`/game/${idUser}/played-games`} className="flex flex-col justify-center text-[8px] h-12 sm:text-base">
          <button className="rounded relative inline-flex group items-center justify-center px-0.5 py-0.5 m-0.5 sm:px-3.5 sm:py-2 sm:m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white">
            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white group-fover:w-20 sm:group-hover:w-32 sm:group-hover:h-10 opacity-10"></span>
            <span className="relative">Games played</span>
          </button>
          </Link>

          <Link to={`/user/${idUser}/created-games`} className="flex flex-col justify-center text-[8px] h-12 sm:text-base">
          <button className="rounded relative inline-flex group items-center justify-center px-0.5 py-0.5 m-0.5 sm:px-3.5 sm:py-2 sm:m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white">
            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white group-fover:w-20 sm:group-hover:w-32 sm:group-hover:h-10 opacity-10"></span>
            <span className="relative">Games created</span>
          </button>
          </Link>

          {/* <button onClick={logOutUser} className="flex flex-col justify-center border-2 rounded-lg border-solid border-black py-1 px-1 ml-0.5 text-xs h-12 sm:text-base">Logout</button> */}
          <button onClick={logOutUser} className="sm:px-5 sm:py-2.5 relative rounded group overflow-hidden font-medium bg-red-50 text-red-600 inline-block py-0.5 px-0.5 ml-0.5 text-[8px] h-4 sm:w-auto sm:h-12 sm:text-base">
          <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-red-600 group-hover:h-full opacity-90"></span>
          <span className="relative group-hover:text-white">Logout</span>
          </button>
        </>
      )}

      {!isLoggedIn && (
        <div className="flex flex-row justify-end">
          <Link to="/signup" className="flex flex-col justify-center text-[8px] h-12 sm:text-base">
            {" "}
          <button className="rounded relative inline-flex group items-center justify-center px-0.5 py-0.5 m-0.5 sm:px-3.5 sm:py-2 sm:m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white">
            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white group-fover:w-20 sm:group-hover:w-20 sm:group-hover:h-10 opacity-10"></span>
            <span className="relative">Sign up</span>
          </button>
            {" "}
          </Link>
          <Link to="/login" className="flex flex-col justify-center text-[8px] h-12 sm:text-base">
            {" "}
            <button className="rounded relative inline-flex group items-center justify-center px-0.5 py-0.5 m-0.5 sm:px-3.5 sm:py-2 sm:m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white">
            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white group-fover:w-20 sm:group-hover:w-20 sm:group-hover:h-10 opacity-10"></span>
            <span className="relative">Login</span>
          </button>
            {" "}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
