import React, { useContext, useState } from "react";
import { AuthContext } from "../Authentication/Auth";
import { Col, Row, Container, Card, Form, Stack } from "react-bootstrap";
import addDataCSS from "../../Css/add-data.module.css";

import AddWeatherForm from "../AddDataForm/addWeatherForm";
import AddCovidForm from "../AddDataForm/addCovidForm";
import AddWildfireForm from "../AddDataForm/addWildfireForm";
import AddSecurityForm from "../AddDataForm/addSecurityForm";

export default function AddData() {
  const [type, setType] = useState("SECURITY");
  //To Block access to show pages without loging in.
  const { isLoggedIn } = useContext(AuthContext);
  const { aType } = useContext(AuthContext);
  if (!isLoggedIn) {
    return (
      <div className={addDataCSS.wrapper}>
        <h1 className={addDataCSS.callback}>
          Access is not granted, please Login or Sign-Up!
        </h1>
      </div>
    ); // Return null to prevent rendering the protected content
  } else if (aType === "regular") {
    return (
      <div className={addDataCSS.wrapper}>
        <h1 className={addDataCSS.callback}>
          Access is not granted, because you have a Regular Account! Please
          Upgrade to Official account to add data.
        </h1>
      </div>
    ); // Return null to prevent rendering the protected content
  }

  return (
    <div>
      <section className="text-center">
        <div>
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Add Data</h1>
          </div>
        </div>
      </section>
      <Container>
        <Row className="vh-min-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={20}>
            <Card className="px-4 shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="mb-3">
                    <Form>
                      <Stack gap={3}>
                        <Form.Select
                          aria-label="Default select example"
                          value={type}
                          onChange={(e) => {
                            console.log("e.target.value", e.target.value);
                            setType(e.target.value);
                          }}
                        >
                          <option value="WEATHER">Weather</option>
                          <option value="COVID">Covid-19</option>
                          <option value="WILDFIRE">Wildfire</option>
                          <option value="SECURITY">Security</option>
                        </Form.Select>
                        {(() => {
                          switch (type) {
                            case "WEATHER":
                              return <AddWeatherForm />;
                            case "COVID":
                              return <AddCovidForm />;
                            case "WILDFIRE":
                              return <AddWildfireForm />;
                            case "SECURITY":
                              return <AddSecurityForm />;
                            default:
                              return <AddWeatherForm />;
                          }
                        })()}
                      </Stack>
                      <div className="d-grid gap-2 col-3 mx-auto "></div>
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
