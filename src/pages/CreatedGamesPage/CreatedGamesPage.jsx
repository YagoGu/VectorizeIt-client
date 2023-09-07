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
                    <button onClick={showComponentCreateGame} className="flex justify-center rounded-md border-black border-solid border-2 content-center mt-4">Add a game to the database</button>
                    {showCreateGame && (<CreateGame idUser={idUser} setShowCreateGame={setShowCreateGame} fetchCreatedGames={fetchCreatedGames}/>)}
                </>
            )}
            <div className="flex flex-wrap flex-row content-centeritems-center justify-center mt-4 ">
            {
            created?.map((game) => {
                return (
                    <div key={game._id} className="flex flex-col items-center content-around">
                        <Link to={`/game/${game._id}`} className="flex flex-col justify-center content-center w-28 h-48 p-2 m-1 rounded-lg border-2 border-black border-solid sm:w-48 sm:h-80">
                        <p className="text-xs py-1 text-center sm:text-base">{game.title}</p>
                        <img className="w-20 h-27 mx-2 my-1 sm:w-40 sm:h-60" src={game.videogame_picture} alt={`${game.title} picture`} />
                        </Link>
                        {isLoggedIn && (
                            <div className="flex flex-col justify-center items-center">
                            <button onClick={() => showComponentModifyGame(game._id)} className="rounded-md border-black border-solid border-2 content-center my-2 sm:w-48 w-28">Modify</button>
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