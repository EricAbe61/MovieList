import React, { useState } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState('');
  const [filter, setFilter] = useState(null); 

  const handleAddMovie = () => {
    if (newMovie.trim() === '') return;

    const movie = { title: newMovie.trim(), watched: false };
    setMovies((prevMovies) => [...prevMovies, movie]);
    setNewMovie(''); 
  };

  const handleToggleWatched = (index) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie, i) =>
        i === index ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  const handleDeleteMovie = (indexToRemove) => {
    setMovies((prevMovies) =>
      prevMovies.filter((_, index) => index !== indexToRemove)
    );
  };

  const filteredMovies = filter === null
    ? movies 
    : movies.filter((movie) => filter === 'watched' ? movie.watched : !movie.watched);

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

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setFilter('watched')}
          style={{
            padding: '10px',
            fontSize: '16px',
            marginRight: '10px',
            cursor: 'pointer',
          }}
        >
          Watched
        </button>
        <button
          onClick={() => setFilter('to-watch')}
          style={{
            padding: '10px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          To Watch
        </button>
      </div>

      {filteredMovies.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredMovies.map((movie, index) => (
            <li
              key={index}
              style={{
                margin: '10px 0',
                fontSize: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  marginRight: '10px',
                  textDecoration: movie.watched ? 'line-through' : 'none',
                }}
              >
                {movie.title}
              </span>
              <button
                onClick={() => handleToggleWatched(index)}
                style={{
                  padding: '5px 10px',
                  fontSize: '14px',
                  marginRight: '10px',
                  cursor: 'pointer',
                }}
              >
                {movie.watched ? 'Unwatch' : 'Watched'}
              </button>
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
      ) : (
        <p>No movies to display.</p>
      )}
    </div>
  );
}

export default App;






