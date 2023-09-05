import "./UpdateProfile.css"
import { useState, useEffect } from "react";

function UpdateProfile(props){

    const apiURL = `http://localhost:5005/user/${props.idUser}`

    const [userData, setUserData] = useState()
    const [form, setForm] = useState ({})

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
                    password: ""
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
                setForm({
                    username: data.username,
                    email: data.email, 
                    birthday: data.birthday.split("T")[0],
                    password: ""
                })
                props.setShowUpdateUser(false)
            })
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleInputChange(e)}>
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

            <button type="submit">Update your profile</button>

        </form>
    )
}

export default UpdateProfile;