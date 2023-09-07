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
        <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleInputChange(e)} className="flex flex-col justify-center rounded-md rounded-lg shadow-xl border-2 items-center my-2 sm:text-base text-[8px]">

            <div className="flex flex-col w-10/12">

            <div className="flex flex-row items-center">
            <label className="pr-4 w-3/12">Description</label>
            <input
            className="flex justify-start rounded-md rounded-lg shadow-xl border-2 border-2 m-2 w-full"
            type="textarea"
            name="description"
            value={form.description}
            />
            </div>

            <div className="flex flex-row items-center">
            <label  className="pr-4 w-3/12">Rate</label>
            <select name="rate" value={form.rate} className="flex justify-start rounded-md rounded-lg shadow-xl border-2 border-2 m-2 w-full">
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
            <label className="pr-4 w-3/12">Played hours</label>
            <input 
            className="flex justify-start rounded-md rounded-lg shadow-xl border-2 border-2 m-2 w-full"
            type="number"
            name="played_hours"
            value={form.played_hours}
            />
            </div>
            </div>
            <button type="submit" className="sm:px-5 sm:py-2.5 relative rounded group overflow-hidden font-medium bg-cyan-50 text-cyan-600 inline-block py-0.5 px-0.5 ml-0.5 text-[8px] h-4 w-11/12 sm:h-12 h-auto sm:text-base my-2 text-center">
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-cyan-600 group-hover:h-full opacity-90"></span>
            <span className="relative group-hover:text-white">
                Update your review
            </span>
            </button>

        </form>
    )
}

export default ModifyReview;