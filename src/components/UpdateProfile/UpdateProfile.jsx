import "./UpdateProfile.css"
import { useState, useEffect } from "react";
import uploadImage from "../../services/file.upload.service";

function UpdateProfile(props){

    const apiURL = `${process.env.REACT_APP_SERVER_URL}/user/${props.idUser}`

    const [userData, setUserData] = useState()
    const [form, setForm] = useState ({})
    const [detectImg, setDetectImg] = useState(false)

    useEffect(() => {
        fetch(apiURL)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setUserData(data)
                return setForm({
                    username: data.username,
                    email: data.email, 
                    birthday: data.birthday.split("T")[0],
                    password: "",
                    profile_picture: data.profile_picture
                })
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    const handleFileUpload = (e) => {

        uploadImage(e.target.files[0])
          .then(response => {
            setForm({...form, profile_picture : response.image_url});
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
        
        const apiURL2 = `${process.env.REACT_APP_SERVER_URL}/user/${props.idUser}/update`

        fetch(apiURL2, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log("User: ", data);
              /*   setForm({
                    username: data.username,
                    email: data.email, 
                    birthday: data.birthday.split("T")[0],
                    password: "",
                    profile_picture: data.profile_picture
                }) */
                props.setShowUpdateUser(false)
            })
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleInputChange(e)} enctype="multipart/form-data" className="flex flex-col justify-center rounded-md border-black border-solid border-2 content-center my-2">

        <div className="flex flex-row items-center">
            <label>Username</label>
            <input 
            type="text"
            name="username"
            value={form.username}
            className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-11/12"
            />
        </div>

        <div className="flex flex-row items-center">
            <label>Email</label>
            <input 
            type="email"
            name="email"
            value={form.email}
            className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-11/12"
            />
        </div>

        <div className="flex flex-row items-center">
            <label>Birthday</label>
            <input 
            type="date" 
            name="birthday"
            value={form.birthday}
            className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-11/12"
            />
        </div>

        <div className="flex flex-row items-center">
            <label>Password</label>
            <input 
            type="password" 
            name="password"
            value={form.password}
            className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-11/12"
            />
        </div>

            <input 
            type="file"
            name="profile_picture"
            onChange={(e) => handleFileUpload(e)}
            />

            {detectImg &&
            (<img src={form.profile_picture} alt="your image" className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-36"/>)}

            <button type="submit" className="sm:text-2xl sm:py-4 flex justify-center rounded-md border-black border-solid border-2 content-center m-2">Save new settings</button>

        </form>
    )
}

export default UpdateProfile;