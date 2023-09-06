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

    const apiURL = `${process.env.REACT_APP_SERVER_URL}/game/${idGame}`

    const [videogame, setVideogame] = useState([])
    const [reviewed, setReviewed] = useState()
    const [showAddReview, setShowAddReview] = useState(false)
    const [showModifyReview, setShowModifyReview] = useState(false)
    const [played, setPlayed] = useState(false)
    const [avg, setAvg] = useState()

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
                const arr = data.reviews.map((rev)=>{return rev.rate})
                const average = arr.reduce((a, b) => a + b) / arr.length
                setAvg(average.toFixed(2))
                return setVideogame(data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [idUser, reviewed, showModifyReview])

    const apiURL2 = `${process.env.REACT_APP_SERVER_URL}/game/${idUser}/games-played`

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
    <div className="my-4 p-2">
        <div className="flex flex-row rounded-md border-black border-solid border-2">
            <div className="p-2">
                <img className="w-22 h-32" src={videogame_picture} alt={`${title} picture`} />
                {/* <p>{pegi}</p> */}
            </div>
            <div className="flex flex-col justify-center text-xs py-1">
                <p className="font-bold py-0.5 px-1">{title}</p>
                <p className="py-0.5 px-1"><span className="font-bold">Created by </span> {corporation}</p>
                <p className="py-0.5 px-1"><span className="font-bold">About it </span> {description}</p>
                <p className="py-0.5 px-1"><span className="font-bold">Added by </span> {contributed_by ? (contributed_by.username) : ("Uknown")}</p>
                <p className="py-0.5 px-1"><span className="font-bold">Avg rate </span>{avg} / 10</p>
            </div>
        </div>
        <div>
            <div className="">
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
                    <DeleteReview idUser={idUser} idGame={idGame} setReviewed={setReviewed}/>
                    {showModifyReview && (<ModifyReview idUser={idUser} idGame={idGame} setShowModifyReview={setShowModifyReview}/>)}
                    </>
                )}
            </div>
            <div className="">
                <Link to={`/review/${idGame}/all`} className="flex justify-center rounded-md border-black border-solid border-2 my-4">
                    See all reviews
                </Link>
                {
                    reviews?.slice(-2).map((review) => {

                        return (
                            <div key={review._id} className="rounded-md border-black border-solid border-2 my-4 p-4 text-ms">
                                <p><span className="font-bold">User </span>{review.created_by.username}</p>
                                <p><span className="font-bold">Description </span>{review.description}</p>
                                <p><span className="font-bold">Rate </span>{review.rate}/10</p>
                                <p><span className="font-bold">Played hours </span>{review.played_hours}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
    )
}

export default GamePage;