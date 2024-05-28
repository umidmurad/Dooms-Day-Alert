import React from "react";
import { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";

export default function AddWildfireForm() {
  const [name, setName] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [warnings, setWarnings] = useState("");
  const [casualties, setCasualties] = useState("");
  const [county, setCounty] = useState("");
  const [showParagraph, setShowParagraph] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://34.212.246.140:3001/addWildfire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          dateStart,
          dateEnd,
          warnings,
          casualties,
          county,
        }),
      });
      if (response.ok) {
        setName("");
        setDateStart("");
        setDateEnd("");
        setWarnings("");
        setCasualties("");
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
                placeholder="Number of Causalities"
                name="casualties"
                value={casualties}
                onChange={(event) => setCasualties(event.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="Warnings"
                name="warnings"
                value={warnings}
                onChange={(event) => setWarnings(event.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="Date Start (YYYY-MM-DD)"
                name="dateStart"
                value={dateStart}
                onChange={(event) => setDateStart(event.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="Date End (YYYY-MM-DD)"
                name="dateEnd"
                value={dateEnd}
                onChange={(event) => setDateEnd(event.target.value)}
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
