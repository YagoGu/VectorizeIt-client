import "./CreatedGamesPage.css";
import { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";
import { Link } from "react-router-dom";

function CreatedGamesPage() {
    const {idUser} = useParams();

    const [created, setCreated] = useState([])

    const apiURL = `http://localhost:5005/user/${idUser}/created-games`

    useEffect (() => {
        fetch(apiURL)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
          return setCreated(data)
        })
        .catch((err) => {
          console.log(err)
        })
    
      }, [])

    return (
        <>
        {
        created?.map((game) => {
            return (
                <Link to={`/game/${game._id}`} key={game._id}>
                <div className="created-name">
                    <p>{game.title}</p>
                    <img src={game.videogame_picture} alt={`${game.title} picture`} />
                </div>
                </Link>
            )
        })
        }
        </>
    )
}

export default CreatedGamesPage;