/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import carouselCSS from "../../../Css/alert-notification.module.css";
import { AuthContext } from "../../Authentication/Auth";

function AlertNotification() {
  const { favCounty } = useContext(AuthContext);
  const [countyData, setCountyData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (favCounty !== "undefined" && favCounty !== "") {
        try {
          const response = await fetch(
            `http://34.212.246.140:3001/check?selectedCounty=${favCounty}`
          );
          if (response.ok) {
            const data = await response.json();
            setDataLoaded(true);
            if (data.length === 0) {
              setCountyData({});
              console.log("No data was added");
            } else {
              console.log("Loaded value");
              setCountyData(data[0]);
            }
          } else {
            console.log(
              `Request failed. Status: ${response.status}, ${response.data}`
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchData();
  }, [favCounty]);

  if (!dataLoaded) {
    return;
  }
  return (
    <Carousel prevIcon={null} nextIcon={null} indicators={false}>
      <Carousel.Item>
        <a>
          <div
            className={`alert alert-warning alert-dismissible fade show ${carouselCSS.bottomRightAlert}`}
            role="alert"
          >
            <strong>{favCounty} - Weather</strong> AQI is {countyData.AQI} !
            <button
              type="button"
              className={`btn-close ${carouselCSS.middleRightCloseButton}`}
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </a>
      </Carousel.Item>
      <Carousel.Item>
        <a>
          <div
            className={`alert alert-dark alert-dismissible fade show ${carouselCSS.bottomRightAlert}`}
            role="alert"
          >
            <strong>{favCounty} - Covid-19 </strong> Number of confirmed cases
            are now {countyData.confirmedCases} !
            <button
              type="button"
              className={`btn-close ${carouselCSS.middleRightCloseButton}`}
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </a>
      </Carousel.Item>
      <Carousel.Item>
        <a>
          <div
            className={`alert alert-info alert-dismissible fade show ${carouselCSS.bottomRightAlert}`}
            role="alert"
          >
            <strong>{favCounty} - Security </strong>{" "}
            {countyData.incidentDescription} !
            <button
              type="button"
              className={`btn-close ${carouselCSS.middleRightCloseButton}`}
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </a>
      </Carousel.Item>
      <Carousel.Item>
        <a>
          <div
            className={`alert alert-danger alert-dismissible fade show ${carouselCSS.bottomRightAlert}`}
            role="alert"
          >
            <strong>{favCounty} - Wildfire </strong> Latest Warning reported:{" "}
            {countyData.wildfire_warnings} !
            <button
              type="button"
              className={`btn-close ${carouselCSS.middleRightCloseButton}`}
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </a>
      </Carousel.Item>
    </Carousel>
  );
}

export default AlertNotification;
