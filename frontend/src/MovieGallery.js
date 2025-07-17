import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function MovieGallery({ token }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('No hay token de autenticación. Por favor inicia sesión.');
      return;
    }

    axios.get('http://127.0.0.1:8000/api/movies/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setMovies(response.data); // guarda las películas en el estado
      setError('');
    })
    .catch(error => {
      console.error('Error al cargar películas:', error);
      setError('No se pudieron cargar las películas. Verifica el token o el backend.');
    });
  }, [token]);

  return (
    <div className="gallery">
      {error && <div className="alert alert-danger">{error}</div>}
      {movies.length === 0 && !error && (
        <p>No hay películas disponibles o no se cargaron.</p>
      )}
      {movies.map(movie => (
        <div className="card" key={movie.id}>
          <h3>{movie.title}</h3>
          <p><strong>Género:</strong> {movie.genre}</p>
          <p><strong>Duración:</strong> {movie.duration} min</p>
          <p><strong>Calificación:</strong> {movie.rating}/10</p>
          <p>{movie.synopsis}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieGallery;