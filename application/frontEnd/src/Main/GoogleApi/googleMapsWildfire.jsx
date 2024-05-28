/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";

import Card from "react-bootstrap/Card";
import Axios from "axios";

import wildfireCSS from "../../Css/wildfire.module.css";

const CountyMap = () => {
  const [selectedCounty, setSelectedCounty] = useState("");
  const [markers, setMarkers] = useState([]);
  const [countyData, setCountyData] = useState([]);

  const handleSubmit = (event) => {
    initMap();
    event.preventDefault();
    Axios.get("http://34.212.246.140:3001/searchWildfire/", {
      params: {
        selectedCounty: selectedCounty,
      },
    })
      .then((response) => {
        setCountyData(response.data);
      })
      .catch((error) => {
        console.error(error);
        setCountyData([]);
        alert("Failed to fetch data.");
      });

    updateCountyStyle();
    zoomToCounty(selectedCounty);
    getCityCoordinates(selectedCounty);
  };

  const mapRef = useRef(null);

  useEffect(() => {
    initMap();
  }, []);

  async function initMap() {
    /* global google */
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: { lat: 37.5, lng: -119.5 },
    });

    const storedMarker = JSON.parse(localStorage.getItem("marker"));
    if (storedMarker) {
      addMarker(storedMarker.lat, storedMarker.lng);
    }

    const geoJsonUrl =
      "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/california-counties.geojson";

    map.data.loadGeoJson(geoJsonUrl);

    map.data.setStyle((feature) => {
      const countyName = feature.getProperty("name");
      if (countyName === selectedCounty) {
        return {
          fillColor: "#FF0000",
          strokeWeight: 1,
          strokeColor: "black",
          fillOpacity: 0.5,
        };
      } else {
        return {
          fillColor: "#808080",
          strokeWeight: 1,
          strokeColor: "black",
          fillOpacity: 0.5,
        };
      }
    });

    mapRef.current = map;
  }

  const updateCountyStyle = () => {
    mapRef.current.data.setStyle((feature) => {
      const countyName = feature.getProperty("name").toLowerCase();
      if (countyName === selectedCounty.toLowerCase()) {
        return {
          fillColor: "#FF0000",
          strokeWeight: 1,
          strokeColor: "black",
          fillOpacity: 0.5,
        };
      } else {
        return {
          fillColor: "#808080",
          strokeWeight: 1,
          strokeColor: "black",
          fillOpacity: 0.5,
        };
      }
    });
  };

  const zoomToCounty = (countyName) => {
    let bounds = new google.maps.LatLngBounds();
    let foundCounty = false;

    mapRef.current.data.forEach((feature) => {
      if (
        feature.getProperty("name").toLowerCase() === countyName.toLowerCase()
      ) {
        foundCounty = true;
        const geometry = feature.getGeometry();
        geometry.forEachLatLng((latLng) => {
          bounds.extend(latLng);
        });
      }
    });

    if (foundCounty) {
      mapRef.current.fitBounds(bounds);
    }
  };

  const zoomToCity = (lat, lng) => {
    mapRef.current.setCenter({ lat, lng });
    mapRef.current.setZoom(10);
  };

  const addMarker = (lat, lng, locationName = "", isCity = false) => {
    // Remove the previous markers and circles from the map
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkers([]);

    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: mapRef.current,
    });

    // Add circle overlay when the location is a city
    if (isCity) {
      const cityCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: "#FF0000",
        fillOpacity: 0.3,
        map: mapRef.current,
        center: { lat, lng },
        radius: 2000, // Set the radius of the circle in meters (10 times smaller)
      });

      // Update markers state with the new marker and circle
      setMarkers([marker, cityCircle]);
      zoomToCity(lat, lng);
    } else if (locationName.toLowerCase() !== selectedCounty.toLowerCase()) {
      // Update markers state with the new marker only
      setMarkers([marker]);
      zoomToCity(lat, lng);
    } else {
      // Update markers state with the new marker only
      setMarkers([marker]);
      zoomToCounty(selectedCounty);
    }
  };

  const getCityCoordinates = (locationName) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: locationName }, (results, status) => {
      if (status === "OK") {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        let isCity = false;
        results[0].address_components.forEach((component) => {
          if (component.types.includes("locality")) {
            isCity = true;
          }
        });

        addMarker(lat, lng, locationName, isCity);
      } else {
        console.error(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  };

  return (
    <div className={wildfireCSS.wildfirePage}>
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <form className={`d-flex ${wildfireCSS.searchForm}`} role="search">
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
              onClick={handleSubmit}
            >
              Search
            </button>
          </form>
        </div>
      </nav>

      <br></br>

      <div id={wildfireCSS.cardGroup}>
        <div className={wildfireCSS.wildfireCard}>
          <div id="map" className={wildfireCSS.map}></div>
          <div className={wildfireCSS.wildfireCardDiv}>
            <p>
              <b>Interactive Wildfire Map:</b> If the map does not appear,
              please refresh the page.
            </p>
          </div>
        </div>
        <div>
          <div className={`card-body ${wildfireCSS.cardBodyCentered}`}>
            <div className="card-text">
              <Card
                bg={"light"}
                key={"light"}
                text={"dark"}
                id={wildfireCSS.cardWidth}
                className="mb-2"
              >
                <Card.Header>Wildfire</Card.Header>
                <Card.Body>
                  {Array.isArray(countyData) && countyData.length > 0 ? (
                    <Card.Text>
                      {"Searched Location: " + countyData[0].county}
                      <br />
                      {"Wildfires: " + countyData[0].name}
                      <br />
                      {"Date Start: " +
                        new Date(countyData[0].dateStart).toLocaleDateString()}
                      <br />
                      {"Date End: " +
                        new Date(countyData[0].dateEnd).toLocaleDateString()}
                      <br />
                      {"Warnings: " + countyData[0].wildfire_warnings}
                      <br />
                      {"Casualties: " + countyData[0].casualties}
                    </Card.Text>
                  ) : countyData.length === 0 ? (
                    <p> Search for a County... </p>
                  ) : (
                    <p>No results found.</p>
                  )}
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountyMap;
