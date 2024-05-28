import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import StyleCSS from "../../Css/minor-stylings.module.css";

export default function NewPassword() {
  const { emailAuth } = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showParagraph, setShowParagraph] = useState(false);
  const [showError, setShowError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setShowError(true);
      return;
    }
    try {
      const response = await fetch("http://34.212.246.140:3001/newPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailAuth,
          newPassword,
        }),
      });
      if (response.ok) {
        console.log("Password changed successfully.");
        setNewPassword("");
        setConfirmPassword("");
        setShowParagraph(true);
      } else {
        console.error(`Request failed. Status: ${response.status}`);
        alert("Password failed to change. We are working on a fix.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section className="text-center">
        <div>
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Create a new password</h1>
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
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label> New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder=""
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          minLength={8}
                        />
                        <Form.Control.Feedback type="invalid">
                          Password must be at least 8 characters long.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder=""
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          minLength={8}
                        />
                        <Form.Control.Feedback type="invalid">
                          Password must be at least 8 characters long.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </div>
                      {showParagraph && (
                        <p className={StyleCSS.pGreen}>
                          Password Changed succesfully!
                          <br></br>
                          <NavLink className="me-2" to="/login">
                            Login here!
                          </NavLink>
                        </p>
                      )}
                      {showError && (
                        <p className={StyleCSS.pRed}>Passwords do not match!</p>
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
