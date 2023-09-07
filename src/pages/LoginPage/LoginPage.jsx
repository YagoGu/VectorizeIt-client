import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    // <div className="flex flex-col justify-center rounded-md border-black border-solid border-2 content-center my-2">
    //   <h1 className="text-center text-xl p-4 font-bold">Login</h1>

    //   <form onSubmit={handleLoginSubmit}>
    //     <div className="flex flex-row items-center">
    //       <label>Email:</label>
    //       <input 
    //        className="flex justify-start rounded-md rounded-lg shadow-xl border-2 border-2 m-2 w-full"
    //       type="email" 
    //       name="email" 
    //       value={email} 
    //       onChange={handleEmail} />
    //     </div>

    //     <div className="flex flex-row items-center">
    //       <label>Password:</label>
    //       <input
    //          className="flex justify-start rounded-md rounded-lg shadow-xl border-2 border-2 m-2 w-full"
    //         type="password"
    //         name="password"
    //         value={password}
    //         onChange={handlePassword}
    //       />
    //     </div>
    //     <button type="submit" className="flex justify-center rounded-md border-black border-solid border-2 content-center mx-8 ms:mx-12 w-10/12">Login</button>
    //   </form>
    //   {errorMessage && <p className="error-message">{errorMessage}</p>}

    //   <p className="text-center text-xl p-4 font-bold" >Don't have an account yet?</p>
    //   <Link to={"/signup"} className="text-center text-xl p-4 font-bold"> Sign Up</Link>
    // </div>
    <div>
      {/* <h1 className="text-center text-xl p-4 font-bold">Login</h1> */}

      <form onSubmit={handleLoginSubmit} className="flex flex-col justify-center rounded-md rounded-lg shadow-xl border-2 items-center my-2 sm:m-20 sm:py-4 sm:text-base text-[8px]">
        
        <div className="flex flex-col w-10/12">
        
        <div className="flex flex-row items-center">
          <label className="pr-4 w-3/12">Email:</label>
          <input 
          className="flex justify-start rounded-md rounded-lg shadow-xl border-2 border-2 m-2 w-full"
          type="email" 
          name="email" 
          value={email} 
          onChange={handleEmail} />
        </div>

        <div className="flex flex-row items-center">
          <label className="pr-4 w-3/12">Password:</label>
          <input
            className="flex justify-start rounded-md rounded-lg shadow-xl border-2 border-2 m-2 w-full"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <button type="submit" className="sm:px-5 sm:py-2.5 relative rounded group overflow-hidden font-medium bg-cyan-50 text-cyan-600 inline-block py-0.5 px-0.5 ml-0.5 text-[8px] h-4 w-11/12 sm:h-12 h-auto sm:text-base my-2 text-center w-full">
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-cyan-600 group-hover:h-full opacity-90"></span>
            <span className="relative group-hover:text-white">Login</span></button>
        
        </div>
      </form>
      {/* {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="text-center text-xl p-4 font-bold" >Don't have an account yet?</p>
      <Link to={"/signup"} className="text-center text-xl p-4 font-bold"> Sign Up</Link> */}
    </div>
  );
}

export default LoginPage;
