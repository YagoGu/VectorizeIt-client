import "./CreatedGamesPage.css";
import { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import CreateGame from "../../components/CreateGame/CreateGame";

function CreatedGamesPage() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    const {idUser} = useParams();

    const [created, setCreated] = useState([])
    const [showCreateGame, setShowCreateGame] = useState(false)

    const apiURL = `http://localhost:5005/user/${idUser}/created-games`

    const showComponentCreateGame = () => {
        return setShowCreateGame(!showCreateGame);
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
    
      }, [showCreateGame])

    return (
        <>
            {isLoggedIn && (
                <>
                    <button onClick={showComponentCreateGame}>Add a game to the database</button>
                    {showCreateGame && (<CreateGame idUser={idUser} setShowCreateGame={setShowCreateGame}/>)}
                </>
            )}
            <div className="created-games">
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
            </div>
        </>
    )
}

export default CreatedGamesPage;