import "./DeleteGame.css"

function DeleteGame(props) {

    const handleSubmit = (e) => {
        e.preventDefault();

        const apiURL = `http://localhost:5005/user/${props.idUser}/${props.idGame}/delete`

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
        <form onSubmit={(e) => handleSubmit(e)}>
            <button type="submit">Delete game</button>
        </form>
    )
}

export default DeleteGame;