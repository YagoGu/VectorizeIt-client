import "./HomePage.css";
import { useState, useEffect } from 'react';

function HomePage() {

  const apiURL= "http://localhost:5005/"

  const [videogames, setVideogames] = useState([])

  useEffect (() => {
    fetch(apiURL)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
      console.log(data)
      return setVideogames(data)
    })
    .catch((err) => {
      console.log(err)
    })

  }, [apiURL])

  console.log(videogames)

  return (
    <>
      <h1>Home page</h1>
      <div className="container">
        {
          
          videogames.map((properties) => {
            return (
              <div className="container">
                <p key={properties._id}>{properties.title}</p>
                <img src={properties.videogame_picture} alt={`${properties.title} front page`} />
              </div>
            )
          })
        }
      </div>
    </>
  );
}

export default HomePage;
