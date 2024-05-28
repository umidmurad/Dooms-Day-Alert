import React from "react";
import { useState } from "react";
import { Col, Button, Row, Form } from "react-bootstrap";

export default function AddCovidForm() {
  const [confirmedCases, setConfirmedCases] = useState("");
  const [deaths, setDeaths] = useState("");
  const [recoveries, setRecoveries] = useState("");
  const [county, setCounty] = useState("");
  const [showParagraph, setShowParagraph] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://34.212.246.140:3001/addCovid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          county,
          confirmedCases,
          deaths,
          recoveries,
        }),
      });
      if (response.ok) {
        setConfirmedCases("");
        setDeaths("");
        setRecoveries("");
        setCounty("");
        setShowParagraph(true);
        console.log(await response.json());
      } else {
        console.error(`Request failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      console.log("NOT WORKING");
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
                placeholder=" Number of Recoveries"
                name="recoveries"
                value={recoveries}
                onChange={(event) => setRecoveries(event.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="Number of Death"
                name="deaths"
                value={deaths}
                onChange={(event) => setDeaths(event.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder=" Number of Cases"
                name="confirmedCases"
                value={confirmedCases}
                onChange={(event) => setConfirmedCases(event.target.value)}
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
