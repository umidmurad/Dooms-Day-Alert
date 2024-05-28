import React, { useContext } from "react";
import { AuthContext } from "../Authentication/Auth";
import { Col, Row, Container, Card, Form, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styleCSS from "../../Css/minor-stylings.module.css";

export default function Manage() {
  //To Block access to show pages without loging in.
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return (
      <div className={styleCSS.wrapper}>
        <h1 className={styleCSS.callback}>
          Access is not granted, please sign in!
        </h1>
      </div>
    ); // Return null to prevent rendering the protected content
  }
  return (
    <div>
      <section className="text-center">
        <div>
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Manage Account</h1>
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
                      <Stack direction="vertical" gap={4}>
                        <NavLink
                          className="btn btn-outline-success me-2"
                          to="/manage/changePassword"
                        >
                          Change Password
                        </NavLink>
                        <NavLink
                          className="btn btn-outline-success me-2"
                          to="/manage/changeAccountType"
                        >
                          Upgrade Account Type
                        </NavLink>

                        <NavLink
                          className="btn btn-outline-success me-2"
                          to="/manage/addData"
                        >
                          Add Data
                        </NavLink>
                        <NavLink
                          className="btn btn-outline-success me-2"
                          to="/manage/alerts"
                        >
                          Alert Settings
                        </NavLink>
                      </Stack>
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
