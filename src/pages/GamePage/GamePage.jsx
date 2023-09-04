import "./GamePage.css";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import AddReview from "../../components/AddReview/AddReview";
import ModifyReview from "../../components/ModifyReview/ModifyReview";
import DeleteReview from "../../components/DeleteReview/DeleteReview";
import AddPlayedGame from "../../components/AddPlayedGame/AddPlayedGame";
import RemovePlayedGame from "../../components/RemovePlayedGame/RemovePlayedGame";

function GamePage() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    const idUser = user?._id;

    const { idGame } = useParams();

    const apiURL = `http://localhost:5005/game/${idGame}`

    const [videogame, setVideogame] = useState([])
    const [reviewed, setReviewed] = useState()
    const [showAddReview, setShowAddReview] = useState(false)
    const [showModifyReview, setShowModifyReview] = useState(false)
    const [played, setPlayed] = useState(false)

    function checkIfReviewed(arr)  {
        const arrCreated = arr.map((review) => {
            return (review.created_by._id)
        })
        return arrCreated.includes(idUser)
    }

    const showComponentAddReview = () => {
        return setShowAddReview(!showAddReview);
    };

    const showComponentModifyReview = () => {
        return setShowModifyReview(!showModifyReview)
    }

    const { title,
        corporation,
        description,
        videogame_picture,
        pegi,
        contributed_by,
        reviews } = videogame

    useEffect(() => {
        fetch(apiURL)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setReviewed(checkIfReviewed(data.reviews))
                return setVideogame(data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [idUser, showComponentAddReview, showComponentModifyReview])

    const apiURL2 = `http://localhost:5005/game/${idUser}/games-played`

    useEffect(() => {
        if (idUser != undefined) {
        fetch(apiURL2)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                const playedGames = data.games_played.map((games) => {return(games._id)})
                setPlayed(playedGames.includes(idGame))
            })
            .catch((err) => {
                console.log(err)
            })
        }
        else{
            console.log("loading")
        }
    }, [apiURL2])

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
                <>
                    {isLoggedIn && !played && (
                        <AddPlayedGame idUser={idUser} idGame={idGame} setPlayed={setPlayed}/>
                    )}
                    {isLoggedIn && played && (
                        <RemovePlayedGame idUser={idUser} idGame={idGame} setPlayed={setPlayed}/>
                    )}
                    {isLoggedIn && !reviewed && (
                        <>
                        <button onClick={showComponentAddReview}>Add a review</button>
                        {showAddReview && (<AddReview idUser={idUser} idGame={idGame} setReviewed={setReviewed} setShowAddReview={setShowAddReview}/>)}
                        </>
                    )}
                    {isLoggedIn && reviewed &&(
                        <>
                        <button onClick={showComponentModifyReview}>Modify your review</button>
                        {showModifyReview && (<ModifyReview idUser={idUser} idGame={idGame} setShowModifyReview={setShowModifyReview}/>)}
                        <DeleteReview idUser={idUser} idGame={idGame}/>
                        </>
                    )}
                </>
            </div>
            <div className="reviews">
                <Link to={`/review/${idGame}/all`}>
                    See all reviews
                </Link>
                {
                    reviews?.slice(-2).map((review) => {

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