import React, { useContext, useState } from "react";
import { AuthContext } from "../Authentication/Auth";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import FileCSS from "../../Css/change-account-type.module.css";

export default function ChangePassword() {
  const { emailAuth } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showParagraph, setShowParagraph] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setting these to false in case user tries again.
    setShowParagraph(false);
    setShowError(false);
    setShowFailed(false);
    if (newPassword !== confirmPassword) {
      setShowError(true);
      return;
    }
    try {
      const response = await fetch(
        "http://34.212.246.140:3001/changePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailAuth,
            oldPassword,
            newPassword,
          }),
        }
      );
      if (response.ok) {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowParagraph(true);
      } else {
        console.error(`Request failed. Status: ${response.status}`);
        setShowFailed(true);
      }
    } catch (error) {
      console.error(error);
      alert("Something failed, we are working on a fix!");
    }
  };

  return (
    <div>
      <section className="text-center">
        <div>
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Change Password</h1>
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
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder=""
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
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
                      <div className="d-grid">
                        <Button
                          variant="dark"
                          type="submit"
                          disabled={
                            !oldPassword || !newPassword || !confirmPassword
                          }
                        >
                          Submit
                        </Button>
                      </div>
                      {showParagraph && (
                        <p className={FileCSS.pGreen}>
                          Password Changed succesfully!
                          <br></br>
                        </p>
                      )}
                      {showError && (
                        <p className={FileCSS.pRed}>Passwords do not match!</p>
                      )}
                      {showFailed && (
                        <p className={FileCSS.pRed}>
                          Incorrect Old Password! Try again.
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
