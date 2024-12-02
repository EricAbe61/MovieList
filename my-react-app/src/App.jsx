import React, { useState } from 'react';
import './App.css';

const TMDB_API_KEY = 'f7c01f56795d06fb509969be8c81b93c'; 

function App() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null); 

  const fetchMovieDetails = async (title) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        return data.results[0];
      }
  
      return null; 
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null; 
    }
  };
  
  const handleAddMovie = async () => {
    let isMounted = true;
  
    if (newMovie.trim() === '') return;
  
    try {
      const fetchedDetails = await fetchMovieDetails(newMovie.trim());
      if (isMounted) {
        const movie = {
          title: newMovie.trim(),
          watched: false,
          details: fetchedDetails, 
        };
        setMovies((prevMovies) => [...prevMovies, movie]);
        setNewMovie(''); 
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  
    return () => {
      isMounted = false;
    };
  };
  
  const handleToggleWatched = (movieIndex) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie, index) =>
        index === movieIndex ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  const handleDeleteMovie = (movieIndex) => {
    setMovies((prevMovies) => prevMovies.filter((_, index) => index !== movieIndex));
    if (selectedMovie?.index === movieIndex) {
      setSelectedMovie(null); 
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>User-Added Movie List</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Add a new movie..."
          value={newMovie}
          onChange={(e) => setNewMovie(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            marginRight: '10px',
            width: '300px',
            maxWidth: '80%',
          }}
        />
        <button
          onClick={handleAddMovie}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Add Movie
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {movies.map((movie, index) => (
          <li
            key={index}
            style={{
              margin: '10px 0',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              width: '60%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <span onClick={() => setSelectedMovie({ ...movie, index })}>
              {movie.title}
            </span>
            <button
              onClick={() => handleDeleteMovie(index)}
              style={{
                padding: '5px 10px',
                fontSize: '14px',
                color: 'white',
                backgroundColor: 'red',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {selectedMovie && (
        <div
          style={{
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginTop: '20px',
            textAlign: 'left',
            width: '80%',
            maxWidth: '500px',
            margin: '20px auto',
            backgroundColor: 'black',
          }}
        >
          <h2>{selectedMovie.title}</h2>
          {selectedMovie.details ? (
            <>
              <p><strong>Overview:</strong> {selectedMovie.details.overview}</p>
              <p><strong>Release Date:</strong> {selectedMovie.details.release_date}</p>
              <p><strong>Rating:</strong> {selectedMovie.details.vote_average}</p>
            </>
          ) : (
            <p>No additional details available.</p>
          )}
          <button
            onClick={() => handleToggleWatched(selectedMovie.index)}
            style={{
              padding: '10px',
              marginTop: '10px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            {selectedMovie.watched ? 'Unwatch' : 'Watched'}
          </button>
          <button
            onClick={() => setSelectedMovie(null)}
            style={{
              padding: '10px',
              marginTop: '10px',
              marginLeft: '10px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;






