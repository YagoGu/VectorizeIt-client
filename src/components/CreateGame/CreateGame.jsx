import "./CreateGames.css"
import { useState} from "react";

function CreateGame(props) {

    const apiURL = `http://localhost:5005/user/${props.idUser}/create`

    const [form, setForm] = useState ({
        title: "",
        corporation: "Uknown",
        description: "Unset",
        pegi: "pegi18",
        // videogame_picture: "https://res.cloudinary.com/dpfyow85s/image/upload/v1693390929/VectorizeIt/videogame-default.png",
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
            console.log(" Videogame: ", data);
            return setForm({
                title: "",
                corporation: "Uknown",
                description: "Unset",
                pegi: "pegi18",
                // videogame_picture: "https://res.cloudinary.com/dpfyow85s/image/upload/v1693390929/VectorizeIt/videogame-default.png",
            })
        })
        props.setShowCreateGame(false)
        props.fetchCreatedGames()
    }

    return (
        // enctype="multipart/form-data"
        <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleInputChange(e)} >
            <h3>Create a game for the database</h3>

            <label>Title</label>
            <input 
            type="text"
            name="title"
            value={form.title}
            placeholder="Title is mandatory"
            />

            <label>Corporation</label>
            <input 
            type="text"
            name="corporation"
            value={form.corporation}
            placeholder="By default is unknown"
            />

            <label>Description</label>
            <input 
            type="textarea"
            name="description"
            value={form.description}
            placeholder="By default is unset"
            />

            <label>PEGI</label>
            <select name="pegi" value={form.pegi}>
                <option value="pegi3">PEGI 3</option>
                <option value="pegi7">PEGI 7</option>
                <option value="pegi12">PEGI 12</option>
                <option value="pegi16">PEGI 16</option>
                <option value="pegi18" select>PEGI 18</option>
            </select>

            {/* <label>
                <input
                type="file"
                name="videogame_picture"
                />
            </label> */}

            <button type="submit">Add videogame</button>

        </form>
    )
}

export default CreateGame;