import "./SearchBar.css"

import { useState } from "react";

function SearchBar(props) {

    const [found, setFound] = useState("");

    const searchForIt  = (e) => {
        setFound(e.target.value)
        props.searchFound(e.target.value)
    }
    
    return (

        <div className='max-w-md mx-auto'>
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-purple-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

            <form>
                <input
                class="peer h-full w-full outline-none text-sm text-purple-700 pr-2"
                name="search"
                value={found}
                type="text" 
                onChange={searchForIt} 
                placeholder="Search by title..."
                />
            </form>
            </div>
        </div>
        )
    }

export default SearchBar;