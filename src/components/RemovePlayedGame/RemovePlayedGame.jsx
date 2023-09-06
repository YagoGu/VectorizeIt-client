import "./RemovePlayedGame"

function RemovePlayedGame(props) {

    const apiURL = `${process.env.REACT_APP_SERVER_URL}/game/${props.idUser}/${props.idGame}/remove`

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
        
        props.setPlayed(false);

    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="flex justify-center rounded-md border-black border-solid border-2 content-center my-2">
            <button type="submit">Remove game from played</button>
        </form>
    )
}

export default RemovePlayedGame;