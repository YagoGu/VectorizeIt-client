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
            console.log(data)
          return setVideogame(data)
        })
        .catch((err) => {
          console.log(err)
        })
    
      }, [])
    
      const {title, 
        corporation, 
        description, 
        videogame_picture, 
        pegi, 
        contributed_by,
        reviews} = videogame

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
            <div className="reviews">
                {
                reviews?.map((review) => {
                    return (
                    <div key={review._id} className="review">
                        <p>{review.created_by.username}</p>
                        <p>{review.description}</p>
                        <p>{review.rate}</p>
                        <p>{review.played_hours}</p>
                    </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default GamePage;