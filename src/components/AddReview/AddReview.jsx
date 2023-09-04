import "./AddReview.css"
import { useState } from "react";

function AddReview(props) {

    const apiURL = `http://localhost:5005/review/${props.idUser}/${props.idGame}/create`

    const [form, setForm] = useState ({
        description: "",
        rate: 5,
        playedHours: 1
    })

    const handleInputChange = (e) => {

        e.preventDefault();

        const { name, value } = e.target;
        setForm((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.description, form.rate, form.playedHours)
        
        fetch(apiURL, {
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
                    description: "",
                    rate: 5,
                    playedHours: 1
                })

            })
        props.setShowAddReview(false);
        props.setReviewed(true);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleInputChange(e)}>
            <h3>Create a review</h3>

            <label>Description</label>
            <input 
            type="textarea"
            name="description"
            value={form.description}
            />

            <label>Rate</label>
            <select name="rate" value={form.rate}>
                <option>10</option>
                <option>9</option>
                <option>8</option>
                <option>7</option>
                <option>6</option>
                <option defaultValue={5}>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>

            <label>Played hours</label>
            <input 
            type="number"
            name="playedHours"
            value={form.playedHours}
            />

            <button type="submit">Create the review</button>

        </form>
    )
}

export default AddReview;