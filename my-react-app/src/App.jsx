import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5001/movies');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Movie List</h1>
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {movies.map((movie, index) => (
            <li key={index} style={{ margin: '10px 0', fontSize: '20px' }}>
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;


