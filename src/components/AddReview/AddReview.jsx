import "./AddReview.css"
import { useState } from "react";

function AddReview(props) {

    const apiURL = `${process.env.REACT_APP_SERVER_URL}/review/${props.idUser}/${props.idGame}/create`

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
        
        <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleInputChange(e)} className="flex flex-col justify-center rounded-md border-black border-solid border-2 content-center my-2">

            <div className="flex flex-row items-center">
            <label>Description</label>
            <input 
            className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-36"
            type="textarea"
            name="description"
            value={form.description}
            />
            </div>

            <div className="flex flex-row items-center">
            <label>Rate</label>
            <select name="rate" value={form.rate} className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-36">
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
            </div>

            <div className="flex flex-row items-center">
            <label className="pr-2">Played hours</label>
            <input 
            className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-36"
            type="number"
            name="playedHours"
            value={form.playedHours}
            />
            </div>

            <button type="submit" className="flex justify-center rounded-md border-black border-solid border-2 content-center m-2">Create the review</button>

        </form>
        
    )
}

export default AddReview;