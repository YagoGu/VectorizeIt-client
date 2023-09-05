import "./CreatedGamesPage.css";
import { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import CreateGame from "../../components/CreateGame/CreateGame";
import ModifyGame from "../../components/ModifyGame/ModifyGame";

function CreatedGamesPage() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    const {idUser} = useParams();

    const [created, setCreated] = useState([])
    const [showCreateGame, setShowCreateGame] = useState(false)
    const [showModifyGame, setShowModifyGame] = useState(false)
    const [gameSelected, setGameSelected] = useState()

    const apiURL = `http://localhost:5005/user/${idUser}/created-games`

    const showComponentCreateGame = () => {
        return setShowCreateGame(!showCreateGame);
    }

    const showComponentModifyGame = (idGame) => {
        setGameSelected(idGame)
        return setShowModifyGame(!showModifyGame);
    }

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
    
      }, [showCreateGame, showModifyGame])

    return (
        <>
            {isLoggedIn && (
                <>
                    <button onClick={showComponentCreateGame}>Add a game to the database</button>
                    {showCreateGame && (<CreateGame idUser={idUser}  setShowCreateGame={setShowCreateGame}/>)}
                </>
            )}
            <div className="created-games">
            {
            created?.map((game) => {
                return (
                    <div className="created-name" key={game._id}>
                        <Link to={`/game/${game._id}`}>
                        <p>{game.title}</p>
                        <img src={game.videogame_picture} alt={`${game.title} picture`} />
                        </Link>
                        {isLoggedIn && (
                            <>
                            <button onClick={() => showComponentModifyGame(game._id)}>Modify</button>
                            {showModifyGame && gameSelected === game._id &&
                            (<ModifyGame idUser={idUser} idGame={game._id} setShowModifyGame={setShowModifyGame}/>)}
                            </>
                        )}
                    </div>
                )
            })
            }
            </div>
        </>
    )
}

export default CreatedGamesPage;