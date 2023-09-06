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
      <h1>Home page</h1>
      <p>Search for games by their title</p>
      <SearchBar searchFound={searchFound}/>
      <div className="container">
        {
          
          videogames.map((properties) => {
            return (
              <Link to={`/game/${properties._id}`} key={properties._id}>
                <div className="container">
                  <p>{properties.title}</p>
                  <img src={properties.videogame_picture} alt={`${properties.title} front page`} />
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
