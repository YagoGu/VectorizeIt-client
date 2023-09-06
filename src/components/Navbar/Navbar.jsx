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
    <nav className="flex flex-row flex-nowrap justify-between">
      <Link to="/" className="border-2 rounded-lg border-solid border-black py-1 px-2">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to={`/user/${idUser}`} className="border-2 rounded-lg border-solid border-black py-1 px-2 mr-0.5 ml-2 text-xs">
            <button className="">Your page</button>
          </Link>

          <Link to={`/game/${idUser}/played-games`} className="border-2 rounded-lg border-solid border-black py-1 px-2 mx-0.5 text-xs">
            <button>Games played</button>
          </Link>

          <Link to={`/user/${idUser}/created-games`} className="border-2 rounded-lg border-solid border-black py-1 px-2 mx-0.5 text-xs">
            <button>Games created</button>
          </Link>

          <button onClick={logOutUser} className="border-2 rounded-lg border-solid border-black py-1 px-1 mx-0.5 text-xs">Logout</button>

          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <div className="flex flex-row justify-end">
          <Link to="/signup" className="border-2 rounded-lg border-solid border-black py-1 px-2 mr-4">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login" className="border-2 rounded-lg border-solid border-black py-1 px-2">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
