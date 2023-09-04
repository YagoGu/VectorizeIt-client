import "./ModifyReview.css"
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

function ModifyReview(props) {

    //take your review data
    const apiURL = `http://localhost:5005/review/${props.idUser}/${props.idGame}`

    const [yourreview, setYourReview] = useState()
    const [form, setForm] = useState ({})

    useEffect(() => {
        fetch(apiURL)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setYourReview(data)
                return setForm({
                    description: data.description,
                    rate: data.rate, 
                    played_hours: data.played_hours
                })
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    const handleInputChange = (e) => {

        e.preventDefault();

        const { name, value } = e.target;
        setForm((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    }

    //update it
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const apiURL2 = `http://localhost:5005/review/${yourreview._id}/update`

        fetch(apiURL2, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log("Review: ", data);
                setForm({
                    description: data.description,
                    rate: data.rate, 
                    played_hours: data.played_hours
                })
                props.setShowModifyReview(false)
            })
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleInputChange(e)}>
            <h3>Modify your review</h3>

            <label>Description</label>
            <input 
            type="textarea"
            name="description"
            value={form.description}
            />
            {/* defaultValue={yourReview?.rate} selected={yourReview?.rate} */}
            <label>Rate</label>
            <select name="rate" value={form.rate}>
                <option>10</option>
                <option>9</option>
                <option>8</option>
                <option>7</option>
                <option>6</option>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>

            <label>Played hours</label>
            <input 
            type="number"
            name="playedHours"
            value={form.played_hours}
            />

            <button type="submit">Update your review</button>

        </form>
    )
}

export default ModifyReview;