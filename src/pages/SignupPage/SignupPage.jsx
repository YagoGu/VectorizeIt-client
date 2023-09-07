import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleBirthday = (e) => setBirthday(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { username, email, password, birthday };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div>
      {/* <h1 className="text-center text-xl p-4 font-bold">Sign Up</h1> */}

      <form onSubmit={handleSignupSubmit} className="flex flex-col justify-center rounded-md rounded-lg shadow-xl border-2 items-center my-2 sm:m-20 sm:py-4 sm:text-base text-[8px]">
        
      <div className="flex flex-col w-10/12">

      
      <div className="flex flex-row items-center">
        <label className="pr-4 w-3/12">Username:</label>
        <input 
        className="flex justify-start rounded-md rounded-lg shadow-xl border-2 m-2 w-full"
        type="text" 
        name="username" 
        value={username} 
        onChange={handleUsername} />
      </div>

      <div className="flex flex-row items-center">  
        <label className="pr-4 w-3/12">Email:</label>
        <input 
        className="flex justify-start rounded-md rounded-lg shadow-xl border-2 m-2 w-full"
        type="email" 
        name="email" 
        value={email} 
        onChange={handleEmail} />
      </div>

      <div className="flex flex-row items-center">
        <label className="pr-4 w-3/12">Password:</label>
        <input
          className="flex justify-start rounded-md rounded-lg shadow-xl border-2 m-2 w-full"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
      </div>

      <div className="flex flex-row items-center">
        <label className="pr-4 w-3/12">Birhtday</label>
        <input
          className="flex justify-start rounded-md rounded-lg shadow-xl border-2 m-2 w-full"
          type="date"
          name="birthday"
          value={birthday}
          onChange={handleBirthday} 
        />
      </div>

        <button type="submit" className="sm:px-5 sm:py-2.5 relative rounded group overflow-hidden font-medium bg-cyan-50 text-cyan-600 inline-block py-0.5 px-0.5 ml-0.5 text-[8px] h-4 w-11/12 sm:h-12 h-auto sm:text-base my-2 text-center  w-full">
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-cyan-600 group-hover:h-full opacity-90"></span>
            <span className="relative group-hover:text-white">
                Sign up
            </span>
        </button>
      </div>
      </form>

      {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}

      {/* <p className="text-center text-xl p-4 font-bold">Already have account?</p>
      <Link to={"/login"} className="text-center text-xl p-4 font-bold"> Login</Link> */}
    </div>
  );
}

export default SignupPage;
