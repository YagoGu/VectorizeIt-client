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
                if (data.reviews.length == 0) {
                    setAvg(0)
                }
                else {
                    const arr = data.reviews.map((rev)=>{return rev.rate})
                    const average = arr.reduce((a, b) => a + b) / arr.length
                    setAvg(average.toFixed(2))
                }
                
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
    <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center rounded-lg shadow-2xl sm:m-24 m-4 sm:w-8/12 w-11/12">
            <div className="flex flex-row my-4 m-4 text-ms sm:w-11/12">
                <img className="rounded-lg shadow-xl w-24 h-28 sm:w-80 sm:h-96 sm:m-8" src={videogame_picture} alt={`${title} picture`} />
                {/* <p>{pegi}</p> */}
            </div>
            <div className="flex flex-col text-xs py-1 sm:text-xl sm:justify-around sm:m-8 sm:w-11/12 sm:h-52">
                <p className="font-bold py-0.5 px-1 sm:text-2xl">{title}</p>
                <p className="py-0.5 px-1 sm:py-2 sm:pl-12"><span className="font-bold">Created by </span> {corporation}</p>
                <p className="py-0.5 px-1 sm:py-2 sm:pl-12"><span className="font-bold">About it </span> {description}</p>
                <p className="py-0.5 px-1 sm:py-2 sm:pl-12"><span className="font-bold">Added by </span> {contributed_by ? (contributed_by.username) : ("Uknown")}</p>
                <p className="py-0.5 px-1 sm:py-2 sm:pl-12"><span className="font-bold">Avg rate </span>{avg} / 10</p>
            </div>
        </div>
        <div className="flex flex-col justify-center sm:w-8/12 w-11/12">
            <div className="flex flex-col justify-center">
                {isLoggedIn && !played && (
                    <AddPlayedGame idUser={idUser} idGame={idGame} setPlayed={setPlayed}/>
                )}
                {isLoggedIn && played && (
                    <RemovePlayedGame idUser={idUser} idGame={idGame} setPlayed={setPlayed}/>
                )}
                {isLoggedIn && !reviewed && (
                    <>
                    <button className="sm:px-5 sm:py-2.5 relative rounded group overflow-hidden font-medium bg-violet-50 text-violet-600 inline-block py-0.5 px-0.5 ml-0.5 text-[8px] h-4 w-full sm:h-12 h-auto sm:text-base mb-2 text-center" onClick={showComponentAddReview}>
                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-violet-600 group-hover:h-full opacity-90"></span>
                    <span className="relative group-hover:text-white">Add a review</span>
                    </button>
                    {showAddReview && (<AddReview idUser={idUser} idGame={idGame} setReviewed={setReviewed} setShowAddReview={setShowAddReview}/>)}
                    </>
                )}
                {isLoggedIn && reviewed &&(
                    <>
                    <button className="sm:px-5 sm:py-2.5 relative rounded group overflow-hidden font-medium bg-violet-50 text-violet-600 inline-block py-0.5 px-0.5 ml-0.5 text-[8px] h-4 w-full sm:h-12 h-auto sm:text-base text-center" onClick={showComponentModifyReview}>
                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-violet-600 group-hover:h-full opacity-90"></span>
                    <span className="relative group-hover:text-white">Modify your review</span>
                    </button>
                    <DeleteReview idUser={idUser} idGame={idGame} setReviewed={setReviewed}/>
                    {showModifyReview && (<ModifyReview idUser={idUser} idGame={idGame} setShowModifyReview={setShowModifyReview}/>)}
                    </>
                )}
            </div>
            <div>
                <Link to={`/review/${idGame}/all`} className="sm:px-5 sm:py-2.5 relative rounded group overflow-hidden font-medium bg-violet-50 text-violet-600 inline-block py-0.5 px-0.5 ml-0.5 text-[8px] h-4 w-full sm:h-12 h-auto sm:text-base my-2 text-center">
                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-violet-600 group-hover:h-full opacity-90"></span>
                    <span className="relative group-hover:text-white">See all reviews</span>
                </Link>
                <div className="sm:text-xl">
                {
                    
                    reviews?.slice(-2).map((review) => {

                        return (
                            <div key={review._id} className="rounded-lg shadow-xl border-2 my-4 p-4 text-ms">
                                <p><span className="font-bold">User </span>{review.created_by.username}</p>
                                <p className="sm:flex sm:flex-col"><span className="font-bold">Description </span>{review.description}</p>
                                <p><span className="font-bold">Rate </span>{review.rate}/10</p>
                                <p><span className="font-bold">Played hours </span>{review.played_hours}</p>
                            </div>
                        )
                    })
                    
                }
                </div>
            </div>
        </div>
    </div>
    )
}

export default GamePage;