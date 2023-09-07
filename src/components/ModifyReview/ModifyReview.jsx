import "./ModifyReview.css"
import { useState, useEffect } from "react";

function ModifyReview(props) {

    //take your review data
    const apiURL = `${process.env.REACT_APP_SERVER_URL}/review/${props.idUser}/${props.idGame}`

    const [yourReview, setYourReview] = useState()
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
        
        const apiURL2 = `${process.env.REACT_APP_SERVER_URL}/review/${yourReview._id}/update`

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
        <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleInputChange(e)} className="flex flex-col justify-center rounded-md border-black border-solid border-2 content-center my-2">

            <div className="flex flex-row items-center">
            <label  className="pr-4">Description</label>
            <input
            className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-10/12"
            type="textarea"
            name="description"
            value={form.description}
            />
            </div>

            <div className="flex flex-row items-center">
            <label  className="pr-4">Rate</label>
            <select name="rate" value={form.rate} className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-10/12">
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
            </div>

            <div className="flex flex-row items-center">
            <label className="pr-4">Played hours</label>
            <input 
            className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-10/12"
            type="number"
            name="played_hours"
            value={form.played_hours}
            />
            </div>

            <button type="submit" className="flex justify-center rounded-md border-black border-solid border-2 content-center m-2">Update your review</button>

        </form>
    )
}

export default ModifyReview;