import "./CreatedGamesPage.css";
import { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import CreateGame from "../../components/CreateGame/CreateGame";
import ModifyGame from "../../components/ModifyGame/ModifyGame";
import DeleteGame from "../../components/DeleteGame/DeleteGame";

function CreatedGamesPage() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    const {idUser} = useParams();

    const [created, setCreated] = useState([])
    const [showCreateGame, setShowCreateGame] = useState(false)
    const [showModifyGame, setShowModifyGame] = useState(false)
    const [gameSelected, setGameSelected] = useState()

    const apiURL = `${process.env.REACT_APP_SERVER_URL}/user/${idUser}/created-games`

    const showComponentCreateGame = () => {
        return setShowCreateGame(!showCreateGame);
    }

    const showComponentModifyGame = (idGame) => {
        setGameSelected(idGame)
        return setShowModifyGame(!showModifyGame);
    }

    const fetchCreatedGames = () => {
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
    }
    
    useEffect (() => {
        fetchCreatedGames()
    }, [showCreateGame, showModifyGame])

    return (
        <div className="flex flex-col justify-center">
            {isLoggedIn && (
                <>
                    <button onClick={showComponentCreateGame} className="sm:px-5 sm:py-2.5 relative rounded group overflow-hidden font-medium bg-violet-50 text-violet-600 inline-block py-0.5 px-0.5 ml-0.5 text-[8px] h-4 w-full sm:h-12 h-auto sm:mt-4 sm:text-base mb-2 text-center">
                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-violet-600 group-hover:h-full opacity-90"></span>
                    <span className="relative group-hover:text-white">Add a game on the database</span>
                    </button>
                    {showCreateGame && (<CreateGame idUser={idUser} setShowCreateGame={setShowCreateGame} fetchCreatedGames={fetchCreatedGames}/>)}
                </>
            )}
            <div className="flex flex-wrap flex-row items-center justify-center mt-4">
            {
            created?.map((game) => {
                return (
                    <div key={game._id} className="flex flex-col items-center content-around">
                        <Link to={`/game/${game._id}`} className="relative inline-block px-4 py-2 font-medium group flex flex-col justify-center w-28 h-48 p-2 m-1 sm:w-48 sm:h-80">
                        <span class="rounded-lg absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-purple-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span class="rounded-lg absolute inset-0 w-full h-full bg-white border-2 border-purple-600 group-hover:bg-purple-600"></span>
                        <span class="relative text-black group-hover:text-white">
                            <p className="text-xs py-1 text-center sm:text-base">{game.title}</p>
                            <img className="rounded-lg w-20 h-27 my-1 sm:w-40 sm:h-60" src={game.videogame_picture} alt={`${game.title} picture`} />
                        </span>
                        </Link>
                        {isLoggedIn && (
                            <div className="flex flex-col justify-center items-center">
                            <button onClick={() => showComponentModifyGame(game._id)} className="sm:px-5 sm:py-2.5 relative rounded group overflow-hidden font-medium bg-violet-50 text-violet-600 inline-block py-0.5 px-0.5 ml-0.5 text-[8px] h-4 w-full sm:h-12 h-auto sm:mt-4 sm:text-base mt-2 text-center sm:mb-2">
                            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-violet-600 group-hover:h-full opacity-90"></span>
                            <span className="relative group-hover:text-white">
                                Modify
                            </span>
                            </button>
                            {showModifyGame && gameSelected === game._id &&
                            (<ModifyGame idUser={idUser} idGame={game._id} setShowModifyGame={setShowModifyGame}/>)}
                            <DeleteGame idUser={idUser} idGame={game._id}/>
                            </div >
                        )}
                    </div>
                )
            })
            }
            </div>
        </div>
    )
}

export default CreatedGamesPage;