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
          .catch((error) => {
            // If the request resolves with an error, set the error message in the state
            console.log(error.response.data.message);
        });
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
            .catch((error) => {
                // If the request resolves with an error, set the error message in the state
                console.log(error)
            });
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleInputChange(e)} enctype="multipart/form-data" className="flex flex-col justify-center rounded-md rounded-lg shadow-xl border-2 items-center my-2 sm:text-base text-[8px]">

        <div className="flex flex-col w-10/12">
        <div className="flex flex-row items-center">
            <label className="pr-4 w-3/12">Username</label>
            <input 
            type="text"
            name="username"
            value={form.username}
            className="flex justify-start rounded-md rounded-lg shadow-xl border-2 border-2 m-2 w-full"
            />
        </div>

        <div className="flex flex-row items-center">
            <label className="pr-4 w-3/12">Email</label>
            <input 
            type="email"
            name="email"
            value={form.email}
            className="flex justify-start rounded-md rounded-lg shadow-xl border-2 border-2 m-2 w-full"
            />
        </div>

        <div className="flex flex-row items-center">
            <label className="pr-4 w-3/12">Birthday</label>
            <input 
            type="date" 
            name="birthday"
            value={form.birthday}
            className="flex justify-start rounded-md rounded-lg shadow-xl border-2 border-2 m-2 w-full"
            />
        </div>

        <div className="flex flex-row items-center">
            <label className="pr-4 w-3/12">Password</label>
            <input 
            type="password" 
            name="password"
            value={form.password}
            className="flex justify-start rounded-md rounded-lg shadow-xl border-2 border-2 m-2 w-full"
            />
        </div>

            <input 
            type="file"
            name="profile_picture"
            onChange={(e) => handleFileUpload(e)}
            />

            {detectImg &&
            (<img src={form.profile_picture} alt="your image" className="flex justify-start rounded-md border-black border-solid border-2 m-2 w-36"/>)}
        </div>

        <button type="submit" className="sm:px-5 sm:py-2.5 relative rounded group overflow-hidden font-medium bg-cyan-50 text-cyan-600 inline-block py-0.5 px-0.5 ml-0.5 text-[8px] h-4 w-11/12 sm:h-12 h-auto sm:text-base my-2 text-center">
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-cyan-600 group-hover:h-full opacity-90"></span>
            <span className="relative group-hover:text-white">
                Save new settings
            </span>
        </button>

        </form>
    )
}

export default UpdateProfile;