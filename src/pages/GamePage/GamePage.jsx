import "./GamePage.css";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import AddReview from "../../components/AddReview/AddReview";
import ModifyReview from "../../components/ModifyReview/ModifyReview";

function GamePage() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    const idUser = user?._id;

    const { idGame } = useParams();

    const apiURL = `http://localhost:5005/game/${idGame}`

    const [videogame, setVideogame] = useState([])
    const [reviewed, setReviewed] = useState()
    const [showAddReview, setShowAddReview] = useState(false)
    const [showModifyReview, setShowModifyReview] = useState(false)

    function checkIfReviewed(arr)  {
        const arrCreated = arr.map((review) => {
            return (review.created_by._id)
        })
        return arrCreated.includes(idUser)
    }

    const showComponent = () => {
        return setShowAddReview(!showAddReview);
    };

    const showComponent2 = () => {
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

    }, [idUser, showComponent, showComponent2])

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
                    {isLoggedIn && !reviewed && (
                        <>
                        <button onClick={showComponent}>Add a review</button>
                        {showAddReview && (<AddReview idUser={idUser} idGame={idGame} setReviewed={setReviewed}/>)}
                        </>
                    )}
                    {isLoggedIn && reviewed &&(
                        <>
                        <button onClick={showComponent2}>Modify your review</button>
                        {showModifyReview && (<ModifyReview idUser={idUser} idGame={idGame} setShowModifyReview={setShowModifyReview}/>)}
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