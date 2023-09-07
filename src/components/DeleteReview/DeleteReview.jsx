import "./DeleteReview.css"
import { useState, useEffect } from "react";

function DeleteReview(props) {

    const apiURL = `${process.env.REACT_APP_SERVER_URL}/review/${props.idUser}/${props.idGame}`

    const [yourReview, setYourReview] = useState()

    useEffect(() => {
        fetch(apiURL)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                return setYourReview(data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const apiURL2 = `${process.env.REACT_APP_SERVER_URL}/review/${yourReview._id}/delete`

        fetch(apiURL2, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
            props.setReviewed(false);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} >
            <button type="submit" className="sm:px-5 sm:py-2.5 relative rounded group overflow-hidden font-medium bg-red-50 text-red-600 inline-block py-0.5 px-0.5 ml-0.5 text-[8px] h-4 w-full sm:h-12 h-auto sm:text-base">
                <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-red-600 group-hover:h-full opacity-90"></span>
                <span className="relative group-hover:text-white">Delete your review</span>
            </button>
        </form>
    )

}

export default DeleteReview;