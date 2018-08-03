import React, { Component } from "react";
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <header>
            <ul>
                <li><Link to="/">Login</Link></li>
                <li><Link to="/movies">Movies</Link></li>
            </ul>
        </header>
    )
}


export default Header;