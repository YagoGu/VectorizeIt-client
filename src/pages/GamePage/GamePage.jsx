import "./GamePage.css";
import { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";

function GamePage () {

    const {idGame} = useParams();

    const apiURL = `http://localhost:5005/game/${idGame}`

    const [videogame, setVideogame] = useState([])

    useEffect (() => {
        fetch(apiURL)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
          return setVideogame(data)
        })
        .catch((err) => {
          console.log(err)
        })
    
      }, [])
    
      const {title, corporation, description, videogame_picture, pegi, contributed_by} = videogame

    return (
        <div className="videogame">
            <div className="game">
                <img src={videogame_picture} alt={`${title} picture`} />
                <p>{pegi}</p>
            </div>
            <div className="info">
                <p>{title}</p>
                <p>{corporation}</p>
                <p>{description}</p>
                <p>{contributed_by ? (contributed_by.username) : ("Uknown")}</p>
            </div>
        </div>
    )
}

export default GamePage;