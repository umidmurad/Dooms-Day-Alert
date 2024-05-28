/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import covidCSS from "../Css/covid.module.css";
import Card from "react-bootstrap/Card";
import Axios from "axios";
import CovidStatsChart from "./GoogleApi/covidStatsChart";
import FileCSS from "../Css/minor-stylings.module.css";

function Covid() {
  const [data, setData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("San Francisco");
  const [chartData, setChartData] = useState([]);

  const fetchData = () => {
    Axios.get("http://34.212.246.140:3001/check/", {
      params: {
        selectedCounty: selectedCity,
      },
    })
      .then((response) => {
        // console.log("API response:", response.data);
        if (response.data.length === 0) {
          setData([]);
          setChartData([]);
          alert("No data found for the selected city.");
        } else {
          setData(response.data);
          setChartData(
            response.data.map((item) => [
              item.county,
              item.confirmedCases,
              item.deaths,
              item.recoveries,
            ])
          );
        }
      })
      .catch((error) => {
        console.error(error);
        setData([]);
        setChartData([]);
      });
  };

  useEffect(() => {
    if (selectedCity) {
      fetchData();
    }
  }, []);

  return (
    <>
      <section className="text-center">
        <div>
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Covid - 19</h1>
          </div>
        </div>
      </section>
      <div className={covidCSS.covidPage}>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <div className=" navbar-collapse" id="navbarSupportedContent">
              <div className="dropdown" id={covidCSS.filterDropdown}></div>

              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                ></input>

                <button
                  className="btn btn-outline-success"
                  type="button"
                  onClick={fetchData}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>

        <br></br>
        <div>
          <div id={covidCSS.cardGroup}>
            <div>
              {chartData.length > 0 ? (
                <CovidStatsChart chartData={chartData} />
              ) : (
                <span>No data to display.</span>
              )}
            </div>
            <div>
              <div className="card-text">
                <div className={`card-body ${covidCSS.cardBodyCentered}`}>
                  <div className="card-text">
                    {data.length > 0 ? (
                      data.map((item, index) => (
                        <Card
                          bg={"light"}
                          key={index}
                          text={"dark"}
                          id={FileCSS.card}
                          className="mb-2"
                        >
                          <Card.Header>Covid-19</Card.Header>
                          <Card.Body>
                            <Card.Text>
                              Searched Location: {item.county}
                              <br />
                              Confirmed Cases: {item.confirmedCases}
                              <br />
                              Deaths: {item.deaths}
                              <br />
                              Recoveries: {item.recoveries}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      ))
                    ) : (
                      <span>No data to display.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Covid;
