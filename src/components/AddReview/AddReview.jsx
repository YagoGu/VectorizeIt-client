import "./AddReview.css"
import { useState } from "react";

function AddReview() {
    const [description, setDescription] = useState("")
    const [rate, setRate] = useState(0)
    const [playedHours, setPlayedHours] = useState(0)

    return (
        <form action="" method="">
            <h3>Create a review</h3>

            <label>Description</label>
            <input 
            type="text"
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
            onChange={(event) => setPlayedHours(event.target.value)}
            value={playedHours}
            />

        </form>
    )
}

export default AddReview;