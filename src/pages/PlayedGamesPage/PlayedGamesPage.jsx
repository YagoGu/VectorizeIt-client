import "./PlayedGamesPage.css"
import { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";
import { Link } from "react-router-dom";

function PlayedGames () {
    const {idUser} = useParams();

    const [playedGames, setPlayedGames] = useState([])

    const apiURL = `${process.env.REACT_APP_SERVER_URL}/game/${idUser}/games-played`

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
        <div className="flex flex-wrap flex-row items-center justify-center mt-4">
        {   
            playedGames?.map((game) => {
                return(
                    <Link to={`/game/${game._id}`} key={game._id} className="flex flex-col w-28 h-48 p-2 m-1 rounded-lg border-2 border-black border-solid">
                        <div>
                            <p className="text-xs py-1 text-center">{game.title}</p>
                            <img className="w-20 h-27 mx-2 my-1" src={game.videogame_picture} alt={`${game.title} front`} />
                        </div>
                    </Link>
                )
            })
        }
        </div>
    )
}

export default PlayedGames;