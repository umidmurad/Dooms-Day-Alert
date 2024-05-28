/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import weatherCSS from "../Css/weather.module.css";

import Axios from "axios";

function Weather() {
  const [selectedCounty, setSelectedCounty] = useState("San Francisco");
  const [countyData, setCountyData] = useState([]);
  const [currentTime, setCurrentTime] = useState(time);

  const formatTime = (date) => {
    return (
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0") +
      ":" +
      date.getSeconds().toString().padStart(2, "0")
    );
  };

  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  useEffect(() => {
    submitData();
    const timer = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const submitData = (event) => {
    if (event) {
      event.preventDefault();
    }

    Axios.get("http://34.212.246.140:3001/check/", {
      params: {
        selectedCounty: selectedCounty,
      },
    })
      .then((response) => {
        if (response.data.length === 0) {
          setCountyData([]);
          alert("No data found for the selected county.");
        } else {
          setCountyData(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
        setCountyData([]);
        alert("Failed to fetch data.");
      });
  };

  return (
    <>
      <section className="text-center">
        <div>
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Weather</h1>
          </div>
        </div>
      </section>
      <div className={weatherCSS.weatherPage}>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <div className=" navbar-collapse" id="navbarSupportedContent">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => {
                    setSelectedCounty(e.target.value);
                  }}
                ></input>
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  onClick={submitData}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>

        <div className="row justify-content-center">
          <div className="col-12 col-md-4 col-sm-12 col-xs-12">
            {Array.isArray(countyData) && countyData.length > 0 ? (
              countyData.map((data, index) => (
                <div key={index} className={`${weatherCSS.card} p-4`}>
                  <div className="d-flex">
                    <h6 className="flex-grow-1 " id={weatherCSS.h6}>
                      {data.county}
                    </h6>
                    <h6>{currentTime}</h6>
                  </div>
                  <div
                    className={`d-flex flex-column ${weatherCSS.temp} mt-5 mb-3`}
                  >
                    <h1
                      className="mb-0 font-weight-bold"
                      id={weatherCSS.heading}
                    >
                      {data.temperature}&deg; F
                    </h1>
                  </div>

                  <div className="d-flex">
                    <div className={`${weatherCSS.tempDetails} flex-grow-1`}>
                      <p className="my-1">
                        <img
                          src="https://i.imgur.com/B9kqOzp.png"
                          height="17px"
                        />
                        <span>AQI {data.AQI}</span>
                      </p>

                      <p className="my-1">
                        <img
                          src="https://img.icons8.com/?size=512&id=5tH5sHqq0t2q&format=png"
                          // src="../images/icons8-warning-48.png"
                          height="17px"
                        />
                        <span> {data.weather_warnings}</span>
                      </p>
                    </div>
                    <div>
                      {data.temperature > 80 ? (
                        <div>
                          <img
                            src="https://img.icons8.com/?size=512&id=CTt0KHBuppnA&format=png"
                            width="100px"
                          />
                        </div>
                      ) : (
                        <img
                          src="https://img.icons8.com/?size=512&id=elq8R5kggLjc&format=png"
                          width="100px"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  We're sorry, but no results were found for your search. Please
                  try again.
                </button>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
