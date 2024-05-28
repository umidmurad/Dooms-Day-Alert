import React from "react";
import { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";

export default function AddWeatherForm() {
  // Create state variables for the form input values
  const [temperature, setTemperature] = useState("");
  const [aqi, setAqi] = useState("");
  const [warnings, setWarnings] = useState("");
  const [county, setCounty] = useState("");
  const [showParagraph, setShowParagraph] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://34.212.246.140:3001/addWeather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          county,
          aqi,
          temperature,
          warnings,
        }),
      });
      if (response.ok) {
        setTemperature("");
        setAqi("");
        setWarnings("");
        setCounty("");
        setShowParagraph(true);
        console.log(await response.json());
      } else {
        console.error(`Request failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      console.log("Couldn't Post to database");
    }
  };

  return (
    <>
      <div className="p-3 mb-2 bg-light">
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="County"
                name="county"
                value={county}
                onChange={(event) => setCounty(event.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="AQI"
                value={aqi}
                onChange={(event) => setAqi(event.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="Temperature"
                value={temperature}
                onChange={(event) => setTemperature(event.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="Warnings"
                value={warnings}
                onChange={(event) => setWarnings(event.target.value)}
              />
            </Form.Group>
          </Row>
          <div className="d-grid gap-2 col-3 mx-auto ">
            <Button variant="dark" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
            {showParagraph && <p>The data addition has been recorded.</p>}
          </div>
        </Form>
      </div>
    </>
  );
}
