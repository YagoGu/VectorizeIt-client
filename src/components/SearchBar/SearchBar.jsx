import "./SearchBar.css"

import { useState } from "react";

function SearchBar(props) {

    const [found, setFound] = useState("");

    const searchForIt  = (e) => {
        setFound(e.target.value)
        props.searchFound(e.target.value)
    }
    
    return (
            <form>
                <img src="https://res.cloudinary.com/dpfyow85s/image/upload/v1693999284/VectorizeIt/lupa.png" alt="lupa" />
                <input
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