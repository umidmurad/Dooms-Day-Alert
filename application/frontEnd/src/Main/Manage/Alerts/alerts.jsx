import React, { useState, useContext } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { AuthContext } from "../../Authentication/Auth";
import AlertCSS from "../../../Css/alert-notification.module.css";

export default function Alert() {
  const [county, setCounty] = useState("");
  const [showAdded, setShowAdded] = useState(false);
  const [showRemoved, setShowRemoved] = useState(false);
  const [showError, setShowError] = useState(false);
  const { emailAuth, setFavCounty } = useContext(AuthContext); // Access the username state from AuthContext
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowAdded(false);
    setShowRemoved(false);
    setShowAdded(false);
    setCounty("");
    fetch("http://34.212.246.140:3001/setCounty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ county, emailAuth }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json(); // Parse the response body as JSON
        } else {
          setShowError(true);
          throw console.log("Something went wrong");
        }
      })
      .then((data) => {
        // Setting the county in the local storage, to use it later.
        setFavCounty(county);
        setShowAdded(true);
        console.log("Added the county succesfully.");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleRemove = (event) => {
    event.preventDefault();
    fetch("http://34.212.246.140:3001/removeCounty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailAuth }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json(); // Parse the response body as JSON
        } else {
          setShowError(true);
          throw console.log("Something went wrong");
        }
      })
      .then((data) => {
        // Setting the county in the local storage, to use it later.
        setFavCounty("");
        setShowRemoved(true);
        console.log("Removed the county Succesfully.");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <section className="text-center">
        <div>
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Alert Settings</h1>
          </div>
        </div>
      </section>
      <Container>
        <Row className="vh-min-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={4} xs={12}>
            <Card className="px-4 shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-center">
                          Enable the Alerts by choosing a county:
                        </Form.Label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(e) => setCounty(e.target.value)}
                        >
                          <option value="">Select your county</option>
                          <option value="Alameda">Alameda</option>
                          <option value="Alpine">Alpine</option>
                          <option value="Amador">Amador</option>
                          <option value="Butte">Butte</option>
                          <option value="Calaveras">Calaveras</option>
                          <option value="Colusa">Colusa</option>
                          <option value="Contra Costa">Contra Costa</option>
                          <option value="Del Norte">Del Norte</option>
                          <option value="El Dorado">El Dorado</option>
                          <option value="Fresno">Fresno</option>
                          <option value="Glenn">Glenn</option>
                          <option value="Humboldt">Humboldt</option>
                          <option value="Imperial">Imperial</option>
                          <option value="Inyo">Inyo</option>
                          <option value="Kern">Kern</option>
                          <option value="Kings">Kings</option>
                          <option value="Lake">Lake</option>
                          <option value="Lassen">Lassen</option>
                          <option value="Los Angeles">Los Angeles</option>
                          <option value="Madera">Madera</option>
                          <option value="Marin">Marin</option>
                          <option value="Mariposa">Mariposa</option>
                          <option value="Mendocino">Mendocino</option>
                          <option value="Merced">Merced</option>
                          <option value="Modoc">Modoc</option>
                          <option value="Mono">Mono</option>
                          <option value="Monterey">Monterey</option>
                          <option value="Napa">Napa</option>
                          <option value="Nevada">Nevada</option>
                          <option value="Orange">Orange</option>
                          <option value="Placer">Placer</option>
                          <option value="Plumas">Plumas</option>
                          <option value="Riverside">Riverside</option>
                          <option value="Sacramento">Sacramento</option>
                          <option value="San Benito">San Benito</option>
                          <option value="San Bernardino">San Bernardino</option>
                          <option value="San Diego">San Diego</option>
                          <option value="San Francisco">San Francisco</option>
                          <option value="San Joaquin">San Joaquin</option>
                          <option value="San Luis Obispo">
                            San Luis Obispo
                          </option>
                          <option value="San Mateo">San Mateo</option>
                          <option value="Santa Barbara">Santa Barbara</option>
                          <option value="Santa Clara">Santa Clara</option>
                          <option value="Santa Cruz">Santa Cruz</option>
                          <option value="Shasta">Shasta</option>
                          <option value="Sierra">Sierra</option>
                          <option value="Siskiyou">Siskiyou</option>
                          <option value="Solano">Solano</option>
                          <option value="Sonoma">Sonoma</option>
                          <option value="Stanislaus">Stanislaus</option>
                          <option value="Sutter">Sutter</option>
                          <option value="Tehama">Tehama</option>
                          <option value="Trinity">Trinity</option>
                          <option value="Tulare">Tulare</option>
                          <option value="Tuolumne">Tuolumne</option>
                          <option value="Ventura">Ventura</option>
                          <option value="Yolo">Yolo</option>
                          <option value="Yuba">Yuba</option>
                        </select>
                      </Form.Group>
                      <div className="d-grid gap-2 col-3 mx-auto">
                        <Button
                          variant="success"
                          type="submit"
                          onClick={handleSubmit}
                          disabled={county === ""}
                        >
                          Enable
                        </Button>
                      </div>
                      <hr />
                      <div className="d-grid gap-2 col-3 mx-auto">
                        <Button
                          type="submit"
                          variant="danger"
                          onClick={handleRemove}
                        >
                          Disable
                        </Button>
                      </div>
                      {showAdded && (
                        <p className={AlertCSS.pGreen}>
                          Your County has been succesfully selected. You will
                          receive alerts based on the county selected.
                        </p>
                      )}
                      {showRemoved && (
                        <p className={AlertCSS.pRed}>
                          Your County has been erased. Alerts are now disabled.
                        </p>
                      )}
                      {showError && (
                        <p className={AlertCSS.pRed}>
                          We couldn't update your preferred county. Sorry about
                          that, we are working on a fix.
                        </p>
                      )}
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
