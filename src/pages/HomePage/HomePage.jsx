import "./HomePage.css";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import SearchBar from "../../components/SearchBar/SearchBar";

function HomePage() {

  const apiURL= `${process.env.REACT_APP_SERVER_URL}/`

  const [videogames, setVideogames] = useState([])
  const [updateVideogames, setupdatedVideogames] = useState([]);

  useEffect (() => {
    fetch(apiURL)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
      setupdatedVideogames(data)
      return setVideogames(data)
    })
    .catch((err) => {
      console.log(err)
    })

  }, [apiURL])

  const searchFound = (gameName) => {
    const searchGame = updateVideogames.filter((game) => {
      return game.title.match(gameName)
    })
    setVideogames(searchGame)
  }

  return (
    <>
      <h1 className="text-center text-xl p-4 font-bold">Home page</h1>
      <SearchBar searchFound={searchFound}/>
      <div className="flex flex-wrap flex-row items-center content-center justify-center mt-4">
        {
          
          videogames.map((properties) => {
            return (
              // <Link to={`/game/${properties._id}`} key={properties._id} className="relative inline-block px-4 py-2 font-medium groupflex flex-col justify-center w-28 h-48 p-2 m-1 rounded-lg border-2 border-black border-solid sm:w-48 sm:h-80">
              //   <div>
              //     <p className="text-xs py-1 text-center sm:text-base">{properties.title}</p>
              //     <img className="w-20 h-27 mx-2 my-1 sm:w-40 sm:h-60" src={properties.videogame_picture} alt={`${properties.title} front page`} />
              //   </div>
              // </Link>
              <Link to={`/game/${properties._id}`} key={properties._id} className="relative inline-block px-4 py-2 font-medium group flex flex-col justify-center w-28 h-48 p-2 m-1 sm:w-48 sm:h-80">
              <div>
                <span class="rounded-lg absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-purple-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span class="rounded-lg absolute inset-0 w-full h-full bg-white border-2 border-purple-600 group-hover:bg-purple-600"></span>
                <span class="relative text-black group-hover:text-white">
                  <p className="text-xs py-1 text-center sm:text-base">{properties.title}</p>
                  <img className="rounded-lg w-20 h-32 my-1 sm:w-40 sm:h-60" src={properties.videogame_picture} alt={`${properties.title} front page`} />
                </span>
              </div>
            </Link>
            )
          })
        }
      </div>
    </>
  );
}

export default HomePage;
