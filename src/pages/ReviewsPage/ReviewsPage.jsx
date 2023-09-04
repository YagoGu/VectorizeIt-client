import "./ReviewsPage.css"
import { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";

function ReviewsPage () {

    const {idGame} = useParams();

    const apiURL = `http://localhost:5005/review/${idGame}/all`

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
        <div className="reviews">
        {
                reviews?.map((review) => {
                    return (
                    <div className="review" key={review._id}>
                        <img src={review.created_by.profile_picture} alt={`${review.created_by.username} picture`} />
                        <p>{review.created_by.username}</p>
                        <p>{review.description}</p>
                        <p>{review.rate}</p>
                        <p>{review.played_hours}</p>
                        {}
                    </div>
                    )
                })
            
        }
        </div>
    )
}

export default ReviewsPage;