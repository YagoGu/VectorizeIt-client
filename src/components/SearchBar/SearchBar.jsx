import "./SearchBar.css"

import { useState } from "react";

function SearchBar(props) {

    const [found, setFound] = useState("");

    const searchForIt  = (e) => {
        setFound(e.target.value)
        props.searchFound(e.target.value)
    }
    
    return (
            <form className="flex flex-row justify-center items-center w-50">
                <img className="w-8 h-8 p-1.5" src="https://res.cloudinary.com/dpfyow85s/image/upload/v1693999284/VectorizeIt/lupa.png" alt="lupa" />
                <input
                className="border-solid border-black border-2 h-8 sm:w-6/12"
                name="search"
                value={found}
                type="text" 
                onChange={searchForIt} 
                placeholder="Search by title..."
                />
            </form>
        )
    }

export default SearchBar;