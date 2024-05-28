import React from "react";
import { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";

export default function AddSecurityForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [incidentDescription, setIncidentDescription] = useState("");
  const [officerName, setOfficerName] = useState("");
  const [badgeNumber, setBadgeNumber] = useState("");
  const [incidentReportNumber, setIncidentReportNumber] = useState("");
  const [address, setAddress] = useState("");
  const [county, setCounty] = useState("");
  const [showParagraph, setShowParagraph] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://34.212.246.140:3001/addSecurity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          county,
          date,
          time,
          incidentType,
          incidentDescription,
          officerName,
          badgeNumber,
          incidentReportNumber,
          address,
        }),
      });
      if (response.ok) {
        setCounty("");
        setDate("");
        setTime("");
        setIncidentType("");
        setIncidentDescription("");
        setOfficerName("");
        setBadgeNumber("");
        setIncidentReportNumber("");
        setAddress("");
        setShowParagraph(true);
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
                placeholder="Officer Name"
                name="officerName"
                value={officerName}
                onChange={(event) => setOfficerName(event.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="Badge Number"
                name="badgeNumber"
                value={badgeNumber}
                onChange={(event) => setBadgeNumber(event.target.value)}
              />
            </Form.Group>
          </Row>
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
                placeholder="Address"
                name="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="Incident Type"
                name="incidentType"
                value={incidentType}
                onChange={(event) => setIncidentType(event.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="Report Number"
                name="incidentReportNumber"
                value={incidentReportNumber}
                onChange={(event) =>
                  setIncidentReportNumber(event.target.value)
                }
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="Date (YYYY-MM-DD)"
                name="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="Time (HH:MM:SS)"
                name="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />
            </Form.Group>
          </Row>
          <Form.Control
            as="textarea"
            placeholder="Incident Description"
            name="time"
            value={incidentDescription}
            onChange={(event) => setIncidentDescription(event.target.value)}
          />
          <br></br>
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
