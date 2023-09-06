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
        <form onSubmit={(e) => handleSubmit(e)} className="flex justify-center rounded-md border-black border-solid border-2 content-center my-2">
            <button type="submit" >Delete your review</button>
        </form>
    )

}

export default DeleteReview;