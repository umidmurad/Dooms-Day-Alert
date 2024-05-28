/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import homeCSS from "../Css/home.module.css";
function NewHeader() {
  return (
    <>
      <header className="p-3 text-bg-light">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              ></svg>
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 no-bullets">
              <li>
                <a href="/" className="nav-link px-2 text-secondary">
                  Home
                </a>
              </li>
              <li>
                <ul id={homeCSS.noBullets}>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle text-secondary"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      More
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="/weather">
                          Weather
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="covid">
                          Covid-19
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="wildfire">
                          Wildfire
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="security">
                          Security
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/about" className="nav-link px-2 text-secondary">
                  About
                </a>
              </li>
            </ul>

            <div className="text-end">
              <NavLink className="btn btn-outline-dark me-2" to="/login">
                Login
              </NavLink>
              <NavLink className="btn btn-outline-dark me-2" to="/registration">
                Sign-up
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default NewHeader;
