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
        <>
        <h1 className="text-center text-xl p-4 font-bold">Played games</h1>
        <div className="flex flex-wrap flex-row items-center justify-center mt-4">
        {   
            playedGames?.map((game) => {
                return(
                    <Link to={`/game/${game._id}`} key={game._id} className="relative inline-block px-4 py-2 font-medium group flex flex-col justify-center w-28 h-48 p-2 m-1 sm:w-48 sm:h-80">
                        <div>
                            <span class="rounded-lg absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-purple-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                            <span class="rounded-lg absolute inset-0 w-full h-full bg-white border-2 border-purple-600 group-hover:bg-purple-600"></span>
                            <span class="relative text-black group-hover:text-white">
                                <p className="text-xs py-1 text-center sm:text-base">{game.title}</p>
                                <img className="rounded-lg w-20 h-32 my-1 sm:w-40 sm:h-60" src={game.videogame_picture} alt={`${game.title} front`} />
                            </span>
                        </div>
                    </Link>
                )
            })
        }
        </div>
        </>
    )
}

export default PlayedGames;