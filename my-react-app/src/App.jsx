import React, { useState } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState('');

  const handleAddMovie = () => {
    if (newMovie.trim() === '') return;

    const movie = { title: newMovie.trim() };
    setMovies((prevMovies) => [...prevMovies, movie]);
    setNewMovie(''); 
  };

  const handleDeleteMovie = (indexToRemove) => {
    setMovies((prevMovies) =>
      prevMovies.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>User-Added Movie List</h1>

      {}
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

      {}
      {movies.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {movies.map((movie, index) => (
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
              <span style={{ marginRight: '10px' }}>{movie.title}</span>
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
        <p>No movies added yet.</p>
      )}
    </div>
  );
}

export default App;
git add



