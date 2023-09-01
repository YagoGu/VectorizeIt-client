import "./HomePage.css";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function HomePage() {

  const apiURL= "http://localhost:5005/"

  const [videogames, setVideogames] = useState([])

  useEffect (() => {
    fetch(apiURL)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
      return setVideogames(data)
    })
    .catch((err) => {
      console.log(err)
    })

  }, [apiURL])

  return (
    <>
      <h1>Home page</h1>
      <div className="container">
        {
          
          videogames.map((properties) => {
            return (
              <Link to={`/game/${properties._id}`}>
                <div className="container" key={properties._id}>
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
