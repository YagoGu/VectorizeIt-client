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
    <>
      <h1>User page</h1>
        <div className="user">
          <img src={profile_picture} alt={`${username} profile picture`} />
          <div className="user-info">
            <p>USERNAME: {username}</p>
            <p>EMAIL: {email}</p>
            <p>BIRTHDAY: {birthday}</p>
          </div>
          {isLoggedIn && 
          <>
          <button onClick={showComponentUpdateUser}>Update your profile</button>
          {showUpdateUser && <UpdateProfile idUser={idUser} setShowUpdateUser={setShowUpdateUser}/>}
          </>
          }
          <Link to={`/game/${idUser}/played-games`}>
            See played games
          </Link>
        </div>
        <div className="games-played">
          {
            games_played?.map((games) => {
              return (
              <div className="game-front" key={games._id}>
                <p>{games.title}</p>
                <img src={games.videogame_picture} alt={`${games.title} front`} />
              </div>  
            )})
          }
        </div>
    </>
  );
}

export default ProfilePage;
