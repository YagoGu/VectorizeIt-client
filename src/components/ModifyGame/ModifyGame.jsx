import "./ModifyGame.css"
import { useState, useEffect } from "react";
import uploadImage from "../../services/file.upload.service";

function ModifyGame(props) {
    
    const apiURL = `${process.env.REACT_APP_SERVER_URL}/game/${props.idGame}/`

    const [yourGame, setYourGame] = useState()
    const [form, setForm] = useState ({})
    const [detectImg, setDetectImg] = useState(false)

    useEffect(() => {
        fetch(apiURL)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setYourGame(data)
                return setForm({
                    title: data.title,
                    corporation: data.corporation,
                    description: data.description,
                    pegi: data.pegi,
                    videogame_picture : data.videogame_picture
                })
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

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

     //update it
     const handleSubmit = (e) => {
        e.preventDefault();
        
        const apiURL2 = `${process.env.REACT_APP_SERVER_URL}/user/${props.idUser}/${props.idGame}/update`

        fetch(apiURL2, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                return data
            })
            props.setShowModifyGame(false)
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleInputChange(e)} enctype="multipart/form-data" className="flex flex-col justify-center rounded-md border-black border-solid border-2 content-center my-2 w-8/12 sm:w-11/12 p-4">

            <div className="flex flex-row items-center">
            <label>Title</label>
            <input 
            type="text"
            name="title"
            value={form.title}
            className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-10/12"
            />
            </div>

            <div className="flex flex-row items-center">
            <label>Corporation</label>
            <input 
            type="text"
            name="corporation"
            value={form.corporation}
            className="flex justify-start rounded-md border-black border-solid border-2 m-2  w-10/12"
            />
            </div>

            <div className="flex flex-row items-center">
            <label>Description</label>
            <input 
            type="textarea"
            name="description"
            value={form.description}
            className="flex justify-start rounded-md border-black border-solid border-2 m-2  w-10/12"
            />
            </div>

            <div className="flex flex-row items-center">
            <label>PEGI</label>
            <select name="pegi" value={form.pegi} className="flex justify-start rounded-md border-black border-solid border-2 m-2  w-10/12">
                <option value="pegi3">PEGI 3</option>
                <option value="pegi7">PEGI 7</option>
                <option value="pegi12">PEGI 12</option>
                <option value="pegi16">PEGI 16</option>
                <option value="pegi18">PEGI 18</option>
            </select>
            </div>

            <input 
            type="file"
            name="videogame_picture"
            onChange={(e) => handleFileUpload(e)}
            />

            {detectImg &&
            (<img src={form.videogame_picture} alt="your image" className="flex justify-start rounded-md border-black border-solid border-2 m-2"/>)}

            <button type="submit" className="flex justify-center rounded-md border-black border-solid border-2 content-center m-2">Update your game</button>

        </form>
    )
}

export default ModifyGame;