import "./ProfilePage.css";
import { useState, useEffect } from 'react';
// import { useParams} from "react-router-dom";

function ProfilePage() {
  // const {userId} = useParams();

  const [user, setUser] = useState([])

  // const apiURL= `http://localhost:5005/${userId}`
  const apiURL = "http://localhost:5005/user/64f0acf144b5efd88f3a2a22"

  useEffect (() => {
    fetch(apiURL)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
      console.log(data)
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
