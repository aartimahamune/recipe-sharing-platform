import { useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { useSelector } from "react-redux";

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?searchTerm=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="header">
      <div>
        <Link to="/" className="self-center whitespace-nowrap logo-2">
          <span className="logo-1">FLAVOR</span>
          <b style={{ color: "black" }}>ATLAS</b>
        </Link>
      </div>

      <form className="search-box" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn" type="submit"><FaSearch /></button>
      </form>

      <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Recipes</Link></li>
          <li><Link to="/about">About</Link></li>
          <Link to="/profile">
            {currentUser ? (
              <img className="profile-img" src={currentUser.avatar} alt="profile" />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </div>
  );
}
