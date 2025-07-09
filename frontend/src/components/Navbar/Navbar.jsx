import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      // You can add real search logic here
      alert(`Searching for "${searchQuery}"... (functionality to be added)`);
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="OrderIt Logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>

      <div className="navbar-right">
        {/* 🔍 Search box */}
        <div className="navbar-search-box">
          <input
            type="text"
            placeholder="Search food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img
            src={assets.search_icon}
            alt="Search"
            onClick={handleSearch}
          />
        </div>

        {/* 🛒 Cart icon */}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" />
          </Link>
          {getTotalCartAmount() !== 0 && <div className="dot"></div>}
        </div>

        {/* 👤 Auth buttons */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
