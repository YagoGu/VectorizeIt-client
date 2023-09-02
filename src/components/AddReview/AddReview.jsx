import "./AddReview.css"
import { useState } from "react";

function AddReview(props) {

    const [description, setDescription] = useState("")
    const [rate, setRate] = useState(5)
    const [playedHours, setPlayedHours] = useState(1)

    const data= {
        description,
        rate,
        played_hours : playedHours,
        created_by: props.idUser,
        related_to: props.idGame,
    }

    function resetInputs(){
        setDescription("")
        setRate(5)
        setPlayedHours(1)
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();
        console.log(data);
        resetInputs();
    }

    return (
        <form action="" method="">
            <h3>Create a review</h3>

            <label>Description</label>
            <input 
            type="textarea"
            name="description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            />

            <label>Rate</label>
            <select name="rate" value={rate} onChange={(event) => setRate(event.target.value)}>
                <option>10</option>
                <option>9</option>
                <option>8</option>
                <option>7</option>
                <option>6</option>
                <option selected>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>

            <label>Played hours</label>
            <input 
            type="number"
            name="playedHours"
            onChange={(event) => setPlayedHours(event.target.value)}
            value={playedHours}
            />

            <button onClick={(e) => handleSubmit(e)} type="submit">Create the review</button>

        </form>
    )
}

export default AddReview;