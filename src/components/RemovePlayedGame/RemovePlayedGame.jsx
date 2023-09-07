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
        <form onSubmit={(e) => handleSubmit(e)}>
            <button type="submit" className="sm:px-5 sm:py-2.5 relative rounded group overflow-hidden font-medium bg-red-50 text-red-600 inline-block py-0.5 px-0.5 ml-0.5 text-[8px] h-4 w-full sm:h-12 h-auto sm:text-base mb-4">
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-red-600 group-hover:h-full opacity-90"></span>
            <span className="relative group-hover:text-white">Remove game from played</span>
          </button>
        </form>
    )
}

export default RemovePlayedGame;