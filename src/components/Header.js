import React from "react";
import GoogleAuth from "./GoogleAuth";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-dark shadow bg-dark">
      <Link className="navbar-brand" to="/streams">
        📽 Stream
      </Link>
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link" to="/streams/new">
            📽 New Stream
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/streams">
            All Streams
          </Link>
        </li>
        <li className="nav-item">
          <GoogleAuth />
        </li>
      </ul>
    </nav>
  );
}

export default Header;
