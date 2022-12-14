import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import MoviesCard from './MoviesCard';
import searchIcon from './search.svg';

/* Fetch api for integration */
const API_URL = 'http://www.omdbapi.com?apikey=73011dd0';

const App = () => {
  /* State data */
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  /* Connect with Api (fetch) */
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log('Data', data.Search);
    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('Superman');
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className='search'>
        <input placeholder='Search for Movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <img src = {searchIcon} alt="search" onClick={() => searchMovies(searchTerm)}/>
      </div>

      {
        movies?.length > 0 ? (
          <div className='container'>
            {movies.map((movie) => (
              <MoviesCard movie={movie} />
            ))}
          </div>
        ) : 
        (
          <div className='empty'>
            <h2>No Movies Found</h2>
          </div>
        )
      }  
    </div>
  );
}

export default App;
