import "./PlayedGamesPage.css"
import { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";
import { Link } from "react-router-dom";

function PlayedGames () {
    const {idUser} = useParams();

    const [playedGames, setPlayedGames] = useState([])

    const apiURL = `http://localhost:5005/game/${idUser}/games-played`

    useEffect (() => {
        fetch(apiURL)
        .then((res) => {
            return res.json()
        })
        .then((played) => {
          return setPlayedGames(played.games_played)
        })
        .catch((err) => {
          console.log(err)
        })
    }, [])

    return (
        <>
        {   
            playedGames?.map((game) => {
                return(
                    <Link to={`/game/${game._id}`} key={game._id}>
                        <div className="gameItem">
                            <img src={game.videogame_picture} alt={`${game.title} front`} />
                            <p>{game.title}</p>
                        </div>
                    </Link>
                )
            })
        }
        </>
    )
}

export default PlayedGames;