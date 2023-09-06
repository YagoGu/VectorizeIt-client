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
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to={`/user/${idUser}`}>
            <button>Your page</button>
          </Link>

          <Link to={`/game/${idUser}/played-games`}>
            <button>Games played</button>
          </Link>

          <Link to={`/user/${idUser}/created-games`}>
            <button>Games created</button>
          </Link>

          <button onClick={logOutUser}>Logout</button>

          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
