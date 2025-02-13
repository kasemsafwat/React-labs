import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { CounterContext } from "../Context/CounterContext";
import { TokenContext } from "../Context/TokenContext";

const Navbar = () => {
  const { token, userName, logout } = useContext(TokenContext);
  const navigate = useNavigate();
  const { counter } = useContext(CounterContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand fw-bold">
          Bazario
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Products
              </NavLink>
            </li>
            {token && (
              <>
                <li className="nav-item">
                  <NavLink to="/categories" className="nav-link">
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/cart" className="nav-link">
                    Cart <span className="badge bg-primary">{counter}</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {token ? (
              <>
                <li className="nav-item">
                  <span className="nav-link fw-bold text-dark">
                    Hi, {userName}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
