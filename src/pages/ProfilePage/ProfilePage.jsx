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
        <div className="flex flex-row rounded-md border-black border-solid border-2 my-4 p-4 text-ms">
          <img className="rounded-full border-black border-solid border-2 w-16 h-16 mr-8" src={profile_picture} alt={`${username} profile picture`} />
          <div className="text-xs">
            <p className="my-0.5"><span className="font-bold">Username</span> {username}</p>
            <p className="my-0.5"><span className="font-bold">Email</span> {email}</p>
            <p className="my-0.5"><span className="font-bold">Birhtday</span> {birthday?.split("T")[0]}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center w-60">
          {isLoggedIn && 
          <>
          <button onClick={showComponentUpdateUser} className="rounded-md border-black border-solid border-2 content-center my-2">Update your profile</button>
          {showUpdateUser && <UpdateProfile idUser={idUser} setShowUpdateUser={setShowUpdateUser}/>}
          </>
          }
          <Link to={`/game/${idUser}/played-games`} className="flex justify-center rounded-md border-black border-solid border-2 content-center my-0.5">
            See played games
          </Link>
        </div>
        <div className="flex flex-wrap flex-row items-center justify-center mt-4">
          {
            games_played?.slice(-5).map((games) => {
              return (
              <div className="flex flex-col w-28 h-48 p-2 m-1 rounded-lg border-2 border-black border-solid" key={games._id}>
                <p className="text-xs py-1 text-center">{games.title}</p>
                <img className="w-20 h-27 mx-2 my-1" src={games.videogame_picture} alt={`${games.title} front`} />
              </div>  
            )})
          }
        </div>
    </div>
  );
}

export default ProfilePage;
