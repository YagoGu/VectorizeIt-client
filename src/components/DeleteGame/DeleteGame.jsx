import "./DeleteGame.css"

function DeleteGame(props) {

    const handleSubmit = (e) => {
        e.preventDefault();

        const apiURL = `${process.env.REACT_APP_SERVER_URL}/user/${props.idUser}/${props.idGame}/delete`

        fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
        console.log("delete", props.idGame)
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="flex justify-center rounded-md border-black border-solid border-2 content-center my-0.5 sm:w-48 w-28">
            <button type="submit">Delete game</button>
        </form>
    )
}

export default DeleteGame;