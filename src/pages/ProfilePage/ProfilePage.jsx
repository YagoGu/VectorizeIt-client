import "./ProfilePage.css";
import { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import UpdateProfile from "../../components/UpdateProfile/UpdateProfile";

function ProfilePage() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const {idUser} = useParams();

  const [userprofile, setUserprofile] = useState([])
  const [showUpdateUser, setShowUpdateUser] = useState(false)

  const showComponentUpdateUser = () => {
    return setShowUpdateUser(!showUpdateUser)
}

  const apiURL= `${process.env.REACT_APP_SERVER_URL}/user/${idUser}`

  useEffect (() => {
    fetch(apiURL)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      return setUserprofile(data)
    })
    .catch((err) => {
      console.log(err)
    })

  }, [showUpdateUser])

  const {username, email, birthday, profile_picture, games_played} = userprofile;
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center content-around rounded-full shadow-2xl sm:m-24 m-4 sm:w-7/12">
        <div className="flex flex-row m-4 p-4 text-ms sm:w-11/12">
          <img className="rounded-full shadow-xl w-16 h-16 mr-8 sm:w-52 sm:h-52" src={profile_picture} alt={`${username} profile picture`} />
        </div>
        <div className="text-xs sm:text-2xl sm:flex sm:flex-col sm:justify-around w-full">
          <p className="my-0.5"><span className="font-bold">Username</span> {username}</p>
          <p className="my-0.5"><span className="font-bold">Email</span> {email}</p>
          <p className="my-0.5"><span className="font-bold">Birhtday</span> {birthday?.split("T")[0]}</p>
        </div>
      </div>
        <div className="flex flex-col justify-center w-11/12">
          {isLoggedIn && 
          <>
          <button onClick={showComponentUpdateUser} className="sm:px-5 sm:py-2.5 relative rounded group overflow-hidden font-medium bg-violet-50 text-violet-600 inline-block py-0.5 px-0.5 ml-0.5 text-[8px] h-4 w-full sm:h-12 h-auto sm:text-base mb-2 text-center">
                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-violet-600 group-hover:h-full opacity-90"></span>
                    <span className="relative group-hover:text-white">Update your profile</span>
          </button>
          {showUpdateUser && <UpdateProfile idUser={idUser} setShowUpdateUser={setShowUpdateUser}/>}
          </>
          }
          <Link to={`/game/${idUser}/played-games`} className="sm:px-5 sm:py-2.5 relative rounded group overflow-hidden font-medium bg-violet-50 text-violet-600 inline-block py-0.5 px-0.5 ml-0.5 text-[8px] h-4 w-full sm:h-12 h-auto sm:text-base mb-4 text-center">
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-violet-600 group-hover:h-full opacity-90"></span>
            <span className="relative group-hover:text-white">See played games</span>
          </Link>
        </div>
        <div className="flex flex-wrap flex-row items-center justify-center mt-4">
          {
            games_played?.slice(-5).map((games) => {
              return (
              <div className="relative inline-block px-4 py-2 font-medium group flex flex-col justify-center w-28 h-48 p-2 m-1 sm:w-48 sm:h-80" key={games._id}>
                <span class="rounded-lg absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-purple-600"></span>
                <span class="rounded-lg absolute inset-0 w-full h-full bg-white border-2 border-purple-600"></span>
                <span class="relative text-black">
                  <p className="text-xs py-1 text-center sm:text-base">{games.title}</p>
                  <img className="rounded-lg w-20 h-27 my-1 sm:w-40 sm:h-60" src={games.videogame_picture} alt={`${games.title} front`} />
                </span>
              </div> 
            )})
          }
        </div>
    </div>
  );
}

export default ProfilePage;
