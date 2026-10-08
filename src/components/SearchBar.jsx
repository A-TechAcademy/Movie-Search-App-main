import { useState } from "react";
import "../css/SearchBar.css"

function SearchBar({onSearch}) {
const [query, setQuery] = useState('');

// Handle form submission
const handleSubmit = (e) => {
    e.preventDefault();  // Prevent page refresh

    // Call Parent search function if provided

if (onSearch && query.trim()) {
    onSearch(query);
}

};


const handleClear = () => {
    setQuery(''); 

    //Optional: Call onsearch with empty string to show all movies

    if (onSearch) {
        onSearch('');
    }
};

return (
    <form className="search-bar" onSubmit={handleSubmit}>
        <div className="search-input-container">
            <input 
            type="text" 
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input" 
            />
        </div>


        <button type="submit" className="search-button">
            Search
        </button>
    </form>
);
}

export default SearchBar;


