import "./UpdateProfile.css"
import { useState, useEffect } from "react";
import uploadImage from "../../services/file.upload.service";

function UpdateProfile(props){

    const apiURL = `http://localhost:5005/user/${props.idUser}`

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
        
        const apiURL2 = `http://localhost:5005/user/${props.idUser}/update`

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
        <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleInputChange(e)} enctype="multipart/form-data">
            <h3>Modify your review</h3>

            <label>Username</label>
            <input 
            type="text"
            name="username"
            value={form.username}
            />

            <label>Email</label>
            <input 
            type="email"
            name="email"
            value={form.email}
            />

            <label>Birthday</label>
            <input 
            type="date" 
            name="birthday"
            value={form.birthday}
            />

            <label>Password</label>
            <input 
            type="password" 
            name="password"
            value={form.password}
            />

            <input 
            type="file"
            name="profile_picture"
            onChange={(e) => handleFileUpload(e)}
            />

            {detectImg &&
            (<img src={form.profile_picture} alt="your image" />)}

            <button type="submit">Update your profile</button>

        </form>
    )
}

export default UpdateProfile;