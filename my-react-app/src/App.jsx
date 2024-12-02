import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';

const movies = [
  { title: 'The Outlaw Joesy Whales' },
  { title: 'The Terminator' },
  { title: 'No Country For Old Men' },
  { title: 'Unforgiven' },
  { title: '300' },
];

function App() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Movie List</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {movies.map((movie, index) => (
          <li key={index} style={{ margin: '10px 0', fontSize: '20px' }}>
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

