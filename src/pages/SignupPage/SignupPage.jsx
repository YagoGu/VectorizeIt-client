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
    <div className="flex flex-col justify-center rounded-md border-black border-solid border-2 content-center my-2">
      <h1 className="text-center text-xl p-4 font-bold">Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        
      <div className="flex flex-row items-center text-sm m-4 sm:text-base">
        <label>Username:</label>
        <input 
        className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-10/12"
        type="text" 
        name="username" 
        value={username} 
        onChange={handleUsername} />
      </div>

      <div className="flex flex-row items-center text-sm m-4 sm:text-base">  
        <label>Email:</label>
        <input 
        className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-10/12"
        type="email" 
        name="email" 
        value={email} 
        onChange={handleEmail} />
      </div>

      <div className="flex flex-row items-center text-sm m-4 sm:text-base">
        <label>Password:</label>
        <input
          className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-10/12"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
      </div>

      <div className="flex flex-row items-center text-sm m-4 sm:text-base">
        <label>Birhtday</label>
        <input
          className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-10/12"
          type="date"
          name="birthday"
          value={birthday}
          onChange={handleBirthday} 
        />
      </div>

        <button type="submit" className="flex justify-center rounded-md border-black border-solid border-2 content-center mx-8 ms:mx-12 w-10/12">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="text-center text-xl p-4 font-bold">Already have account?</p>
      <Link to={"/login"} className="text-center text-xl p-4 font-bold"> Login</Link>
    </div>
  );
}

export default SignupPage;
