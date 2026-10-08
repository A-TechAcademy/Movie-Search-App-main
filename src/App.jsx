import { useState, useEffect } from 'react';
import './css/App.css';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import { getPopularMovies, searchMovies } from './services/api';

function App() {
 const [movies, setMovies] = useState([]);
 const [searchQuery, setSearchQuery] = useState('');
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null)
 // Load popular movies on first render
 useEffect(() => {
 loadPopularMovies();
 }, []);
 const loadPopularMovies = async () => {
 try {
  setLoading(true)
  setError(null); // clear any previous error
 const popularMovies = await getPopularMovies();
 setMovies(popularMovies);
 setSearchQuery('')
 } catch (error) {
 console.error('Failed to load movies:', error);
 setError('Failed to load movies. Please try again later');
 setMovies([]); // clear movies on error
 } finally {
 setLoading(false);
 }
 };
 const handleSearch = async (query) => {
 setSearchQuery(query);

 // if query is empty, show popular movies
 if (query.trim()===''){
  await loadPopularMovies();

  return;
 }

 try{
  setLoading(true);
  setError(null);


  //call search API function
  const results = await searchMovies(query)

  setMovies(results)
 } catch (error) {
  console.error('Search failed:', error);
  setError('Search failed please check your connection and try again.');
  setMovies([])
 } finally {
  setLoading(false)
 }


 try {
 if (query.trim()) {
 const results = await searchMovies(query);
 setMovies(results);
 } else {
 await loadPopularMovies();
 }
 } catch (error) {
 console.error('Search failed:', error);
 } finally {
 setLoading(false);
 }
 };

 const handleRetry = () => {
  if (searchQuery.trim()) {
    handleSearch(searchQuery)
  } else {
    loadPopularMovies();
  }
 };
 return (
 <div className="app">
 <NavBar />

 <main className="main-content">
 <h1>Movie Explorer</h1>
 <SearchBar onSearch={handleSearch} />

 {loading && (
 <div className='loading'>
  <p>⌛Loading movies...</p>
  <div className='spinner'></div>
 </div>
 )}

 {error && !loading && (
  <div className="error">
    <p>⚠️{error}</p>
    <button onClick={handleRetry} className='retry-button'>
      Try Again
    </button>
  </div>
 )}

 {!loading && !error && searchQuery && (
  <p className='search-results'>
    Showing results for: '<b>{searchQuery}</b>'
    <button 
    onClick={loadPopularMovies}
    className='show-all-button'>
      Show All Movies
    </button>
  </p>
 )}


 {!loading && !error && movies.length > 0 && (
  <div className='movies-grid'>
    {movies.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
 )}
 {/* Show error when no movies found */}
 {!loading && !error && movies.length === 0 && searchQuery && (
  <div className='no-results'>
    <p>🎬 No movie found for "{searchQuery}"</p>
    <p>Try a different search Term or...</p>
    <button onClick={loadPopularMovies} className='show-all-button'>
      Browse Popular Movies
    </button>
  </div>
 )}

{/* Show empty state on initial load */}
 {!loading && !error && movies.length === 0 && !searchQuery && (
  <div className='empty-state'>
    <p>No movies available at the moment.</p>
    <button onClick={loadPopularMovies} className='retry-button'>
      Refresh Movies
    </button>
  </div>
 )}
 </main>
 </div>
 );
}

export default App;