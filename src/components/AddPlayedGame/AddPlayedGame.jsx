import "./AddPlayedGame.css"

function AddPlayedGame(props) {

    const apiURL = `${process.env.REACT_APP_SERVER_URL}/game/${props.idUser}/${props.idGame}/add`;

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
        <form onSubmit={(e) => handleSubmit(e)} className="flex justify-center rounded-md border-black border-solid border-2 content-center my-2">
            <button type="submit">Add game as played</button>
        </form>
    )
}

export default AddPlayedGame;