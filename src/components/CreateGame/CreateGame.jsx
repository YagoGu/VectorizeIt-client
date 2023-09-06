import "./CreateGames.css"
import { useState} from "react";
import uploadImage from "../../services/file.upload.service";

function CreateGame(props) {

    const apiURL = `${process.env.REACT_APP_SERVER_URL}/user/${props.idUser}/create`

    const [form, setForm] = useState ({
        title: "",
        corporation: "Uknown",
        description: "Unset",
        pegi: "pegi18",
        videogame_picture: "https://res.cloudinary.com/dpfyow85s/image/upload/v1693390929/VectorizeIt/videogame-default.png",
    })
    const [detectImg, setDetectImg] = useState(false)

    const handleFileUpload = (e) => {

        uploadImage(e.target.files[0])
          .then(response => {
            setForm({...form, videogame_picture : response.image_url});
            setDetectImg(true);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
    };

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
        })
        
        props.setShowCreateGame(false)
        props.fetchCreatedGames()
    }

    return (
        // enctype="multipart/form-data"
        <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleInputChange(e)} enctype="multipart/form-data " className="flex flex-col justify-center rounded-md border-black border-solid border-2 content-center my-2">

            <div className="flex flex-row items-center">
            <label>Title</label>
            <input 
            type="text"
            name="title"
            value={form.title}
            placeholder="Title is mandatory"
            className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-36"
            />
            </div>

            <div className="flex flex-row items-center">
            <label>Corporation</label>
            <input 
            className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-36"
            type="text"
            name="corporation"
            value={form.corporation}
            placeholder="By default is unknown"
            />
            </div>

            <div className="flex flex-row items-center">
            <label>Description</label>
            <input 
            className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-36"
            type="textarea"
            name="description"
            value={form.description}
            placeholder="By default is unset"
            />
            </div>

            <div className="flex flex-row items-center">
            <label>PEGI</label>
            <select name="pegi" value={form.pegi} className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-36">
                <option value="pegi3">PEGI 3</option>
                <option value="pegi7">PEGI 7</option>
                <option value="pegi12">PEGI 12</option>
                <option value="pegi16">PEGI 16</option>
                <option value="pegi18" select>PEGI 18</option>
            </select>
            </div>

            <input 
            type="file"
            name="videogame_picture"
            onChange={(e) => handleFileUpload(e)}
            />

            {detectImg &&
            (<img src={form.videogame_picture} alt="your image" className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-36" />)}

            <button type="submit" className="flex justify-center rounded-md border-black border-solid border-2 content-center m-2">Add videogame</button>

        </form>
    )
}

export default CreateGame;