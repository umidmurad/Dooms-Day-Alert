import React, { useState, useContext } from "react";
import homeCSS from "../Css/home.module.css";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Axios from "axios";
import AlertsCarousel from "./Manage/Alerts/alertsCarousel";
import { AuthContext } from "./Authentication/Auth";

function Home() {
  const { isLoggedIn } = useContext(AuthContext);
  // Using state hooks to manage component state
  const [selectedCounty, setSelectedCounty] = useState("");
  const [countyData, setCountyData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    "Covid-19": true,
    Security: true,
    Weather: true,
    Wildfire: true,
  });

  const submitData = (event) => {
    event.preventDefault();
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
        } // Updating the state with the received data
      })
      .catch((error) => {
        console.error(error);
        setCountyData([]);
        alert("Failed to fetch data.");
      });
  };

  // Function to handle changes in the filter checkboxes
  const handleFilterChange = (event) => {
    const filterName = event.target.value;
    setSelectedFilters({
      ...selectedFilters, // Copying the current state
      [filterName]: event.target.checked, // Updating the value of the selected filter
    });
  };

  const cardComponents = [];
  if (selectedFilters["Covid-19"]) {
    cardComponents.push(
      <Card
        bg={"light"}
        key={"light2"}
        text={"dark"}
        id={homeCSS.cardWidth}
        className="mb-2"
      >
        <Card.Header>Covid - 19</Card.Header>
        <Card.Body>
          {
            // If Covid-19 filter is selected and countyData is not empty, display data
            Array.isArray(countyData) && countyData.length > 0 ? (
              countyData.map((data, index) => (
                <Card.Text key={index}>
                  {"Searched Location: " + data.county}
                  <br />
                  {"Confirmed Cases: " + data.confirmedCases}
                  <br />
                  {"Deaths: " + data.deaths}
                  <br />
                  {"Recoveries: " + data.recoveries}
                </Card.Text>
              ))
            ) : countyData.length === 0 ? (
              <Card.Text> Search for a County... </Card.Text>
            ) : (
              <p>{"No results found."}</p>
            )
          }
        </Card.Body>
      </Card>
    );
  }

  /* Security */

  if (selectedFilters["Security"]) {
    cardComponents.push(
      <Card
        bg={"light"}
        key={"light"}
        text={"dark"}
        id={homeCSS.cardWidth}
        className="mb-2"
      >
        <Card.Header>Security</Card.Header>
        <Card.Body>
          {
            // If Security filter is selected and countyData is not empty, display data
            selectedFilters["Security"] &&
            Array.isArray(countyData) &&
            countyData.length > 0 ? (
              countyData.map((data, index) => (
                <Card.Text key={index}>
                  {"Searched Location: " + data.county}
                  <br />
                  {"Type: " + data.incidentType}
                  <br />
                  {"Description: " + data.incidentDescription}
                  <br />
                  {"Date: " + new Date(data.date).toLocaleDateString()}
                  <br />
                  {"Time: " + data.time}
                  <br />
                  {"Address: " + data.address}
                </Card.Text>
              ))
            ) : countyData.length === 0 ? (
              <Card.Text> Search for a County... </Card.Text>
            ) : (
              <p>{selectedFilters["Security"] ? "No results found." : ""}</p>
            )
          }
        </Card.Body>
      </Card>
    );
  }

  if (selectedFilters["Weather"]) {
    cardComponents.push(
      <Card
        bg={"light"}
        key={"light3"}
        text={"dark"}
        id={homeCSS.cardWidth}
        className="mb-2"
      >
        <Card.Header>Weather</Card.Header>
        <Card.Body>
          {
            // If Weather filter is selected and countyData is not empty, display data
            selectedFilters["Weather"] &&
            Array.isArray(countyData) &&
            countyData.length > 0 ? (
              countyData.map((data, index) => (
                <Card.Text key={index}>
                  {"Searched Location: " + data.county}
                  <br />
                  {"Farenheight: " + data.temperature}
                  <br />
                  {"AQI: " + data.AQI}
                  <br />
                  {"Warnings: " + data.weather_warnings}
                </Card.Text>
              ))
            ) : countyData.length === 0 ? (
              <Card.Text> Search for a County... </Card.Text>
            ) : (
              <p> {selectedFilters["Weather"] ? "No results found." : ""}</p>
            )
          }
        </Card.Body>
      </Card>
    );
  }

  if (selectedFilters["Wildfire"]) {
    cardComponents.push(
      <Card
        bg={"light"}
        key={"light4"}
        text={"dark"}
        id={homeCSS.cardWidth}
        className="mb-2"
      >
        <Card.Header>Wildfire</Card.Header>
        <Card.Body>
          {
            // If Wildfire filter is selected and countyData is not empty, display data
            selectedFilters["Wildfire"] &&
            Array.isArray(countyData) &&
            countyData.length > 0 ? (
              countyData.map((data, index) => (
                <Card.Text key={index}>
                  {"Searched Location: " + data.county}
                  <br />
                  {"Wildfires: " + data.name}
                  <br />
                  {"Date Start: " +
                    new Date(data.dateStart).toLocaleDateString()}

                  <br />
                  {"Date End: " + new Date(data.dateEnd).toLocaleDateString()}
                  <br />
                  {"Warnings: " + data.wildfire_warnings}
                  <br />
                  {"Casualties: " + data.casualties}
                </Card.Text>
              ))
            ) : countyData.length === 0 ? (
              <Card.Text> Search for a County... </Card.Text>
            ) : (
              <p>{selectedFilters["Wildfire"] ? "No results found." : ""}</p>
            )
          }
        </Card.Body>
      </Card>
    );
  }
  return (
    <div>
      <section className="text-center">
        <div>
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Dooms Day Alert</h1>
          </div>
        </div>
      </section>

      <div className={homeCSS.homePage}>
        <div className={homeCSS.searchBar}>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="dropdown" id={homeCSS.filterDropdown}>
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filter
              </button>
              <ul className="dropdown-menu" id={homeCSS.dropDownMenu}>
                <div className={homeCSS.checkBoxClick}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Covid-19"
                    id="Covid-19-Checkbox"
                    checked={selectedFilters["Covid-19"]}
                    onChange={handleFilterChange}
                  ></input>
                  <label
                    className={homeCSS.formCheckLabel}
                    htmlFor="Covid-19-Checkbox"
                  >
                    Covid-19
                  </label>
                </div>
                <div className={homeCSS.checkBoxClick}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Security"
                    id="Security-Checkbox"
                    checked={selectedFilters["Security"]}
                    onChange={handleFilterChange}
                  ></input>
                  <label
                    className={homeCSS.formCheckLabel}
                    htmlFor="Security-Checkbox"
                  >
                    Security
                  </label>
                </div>
                <div>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Weather"
                    id="Weather-Checkbox"
                    checked={selectedFilters["Weather"]}
                    onChange={handleFilterChange}
                  ></input>
                  <label
                    className={homeCSS.formCheckLabel}
                    htmlFor="Weather-Checkbox"
                  >
                    Weather
                  </label>
                </div>
                <div>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Wildfire"
                    id="Wildfire-Checkbox"
                    checked={selectedFilters["Wildfire"]}
                    onChange={handleFilterChange}
                  ></input>
                  <label
                    className={homeCSS.formCheckLabel}
                    htmlFor="Wildfire-Checkbox"
                  >
                    Wildfire
                  </label>
                </div>
              </ul>
            </div>

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
          </nav>
        </div>

        <CardGroup>{cardComponents}</CardGroup>

        {isLoggedIn ? <AlertsCarousel /> : null}
      </div>
    </div>
  );
}

export default Home;
