import "../css/Navbar.css";

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">🎬Movie Search App</div>
            <div className="navbar-links">
                <a href="/">Home</a>
                <a href="/favorites">Favorites</a>
            </div>
        </nav>
    );
}


export default NavBar;