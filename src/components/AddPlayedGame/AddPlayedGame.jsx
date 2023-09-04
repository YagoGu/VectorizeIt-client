import "./AddPlayedGame.css"

function AddPlayedGame(props) {

    const apiURL = `http://localhost:5005/game/${props.idUser}/${props.idGame}/add`;

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                return data
            })
            .catch((err) => {
                console.log(err)
            })

        props.setPlayed(true);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <button type="submit">Add game as played</button>
        </form>
    )
}

export default AddPlayedGame;