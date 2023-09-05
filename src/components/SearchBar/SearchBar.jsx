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
                <label>Search</label>
                <input name="search" value={found} type="text" onChange={searchForIt} />
            </form>
        )
    }

export default SearchBar;