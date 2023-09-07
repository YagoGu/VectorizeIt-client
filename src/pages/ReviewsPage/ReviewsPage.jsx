import "./ReviewsPage.css"
import { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";

import SearchBar from "../../components/SearchBar/SearchBar";

function ReviewsPage () {

    const {idGame} = useParams();

    const apiURL = `${process.env.REACT_APP_SERVER_URL}/review/${idGame}/all`

    const [reviews, setReviews] = useState([])

    useEffect (() => {
        fetch(apiURL)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
          return setReviews(data)
        })
        .catch((err) => {
          console.log(err)
        })
    
      }, [])

    return (
      <>
        <h1 className="text-center text-xl p-4 font-bold">Reviews page</h1>
        <div className="flex flex-col items-center justify-center">
        {
                reviews?.map((review) => {
                    return (
                    <div className="rounded-md border-black border-solid border-2 my-4 p-4 text-ms w-60 sm:w-11/12 sm:text-2xl" key={review._id}>
                      <div className="flex flex-row items-center">
                        <img className="rounded-full border-black border-solid border-2 w-10 h-10 sm:w-36 sm:h-36" src={review.created_by.profile_picture} alt={`${review.created_by.username} picture`} />
                        <p className="ml-4 font-bold sm:ml-12">{review.created_by.username}</p>
                      </div>
                      <div className="mt-2">
                        <p className="font-bold">Description</p>
                        <p>{review.description}</p>
                        <p><span className="font-bold">Rate </span>{review.rate} / 10</p>
                        <p><span className="font-bold">Played hours </span>{review.played_hours}</p>
                        </div>
                    </div>
                    )
                })
            
        }
        </div>
      </>
    )
}

export default ReviewsPage;