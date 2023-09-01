import "./ProfilePage.css";
import { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";
import { Link } from "react-router-dom";

function ProfilePage() {

  const {idUser} = useParams();

  const [user, setUser] = useState([])

  const apiURL= `http://localhost:5005/user/${idUser}`

  useEffect (() => {
    fetch(apiURL)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
      return setUser(data)
    })
    .catch((err) => {
      console.log(err)
    })

  }, [])

  const {username, email, birthday, profile_picture, games_played} = user;
  
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
          <Link to={`/game/${idUser}/played-games`}>
            See played games
          </Link>
        </div>
        <div className="games-played">
          {
            games_played?.map((games) => {
              return (
              <div className="game-front">
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
