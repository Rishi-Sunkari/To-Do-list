import React from 'react';
import { Link } from "react-router-dom";

function HeaderComponent({ rishi }) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-black text-white">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active text-white" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/about">About</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" style={{ width: '400px' }} />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <div className="form-check form-switch d-flex align-items-center mx-5">
              <input className="form-check-input" type="checkbox" id="switchCheckDefault" style={{ height: '30px', width: '60px' }} onChange={rishi} />
              <label className="form-check-label ms-3" htmlFor="switchCheckDefault">
                <b>Enable Darkmond</b>
              </label>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderComponent;
