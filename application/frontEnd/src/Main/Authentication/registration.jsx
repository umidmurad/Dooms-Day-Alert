import React, { useState } from "react";
import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  Stack,
} from "react-bootstrap";

import { NavLink } from "react-router-dom";
import StyleCSS from "../../Css/minor-stylings.module.css";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [account_type, setAccountType] = useState("");
  const [secAnswer, setSecAnswer] = useState("");
  const [showFailed, setShowFailed] = useState(false);
  const [userError, setUserError] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //resetting in case, they retry to sign in.
    setUserError(false);
    setShowError(false);
    setShowFailed(false);
    if (password !== confirmPassword) {
      setShowError(true);
      return;
    }
    try {
      const response = await fetch("http://34.212.246.140:3001/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          secAnswer,
          account_type,
        }),
      });
      if (response.ok) {
        console.log(response.data);
        window.location.href = "/login";
      } else if (response.status === 401) {
        // Account already exists with the given email or username
        response.text().then((message) => {
          console.log(message);
          if (message === "Account already exists with that email.") {
            setShowFailed(true);
          } else {
            setUserError(true);
          }
        });
      } else {
        // Some other error occurred
        console.error("Error creating account:", response.statusText);
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
            <h1 className="fw-light">Registration</h1>
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
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Username"
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                          minLength={3}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          minLength={8}
                        />
                        <Form.Control.Feedback type="invalid">
                          Password must be at least 8 characters long.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPasswordConfirm"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(event.target.value)
                          }
                          minLength={8}
                        />
                        <Form.Control.Feedback type="invalid">
                          Password must be at least 8 characters long.
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="text-center">
                          Security Question
                        </Form.Label>
                        <Form.Select>
                          <option>What is your favorite hobby?</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Enter Security Answer"
                          value={secAnswer}
                          onChange={(event) => setSecAnswer(event.target.value)}
                        />
                      </Form.Group>

                      <Stack direction="vertical" gap={4}>
                        <Stack direction="horizontal" gap={3}>
                          <Form.Check
                            className={StyleCSS.manageH1}
                            inline
                            type={`radio`}
                            label={`Regular Account`}
                            id={`inline-radio-1`}
                            name="group1"
                            value="regular"
                            onChange={(event) =>
                              setAccountType(event.target.value)
                            }
                          />
                        </Stack>
                        <Stack direction="vertical" gap={3}>
                          <div className="d-grid">
                            <Button
                              variant="outline-dark"
                              type="submit"
                              disabled={
                                !username ||
                                !email ||
                                !password ||
                                !secAnswer ||
                                !account_type
                              }
                            >
                              Create Account
                            </Button>
                          </div>
                        </Stack>
                      </Stack>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?{" "}
                        <NavLink
                          className="me-2 text-primary"
                          to="/login"
                          id={StyleCSS.navlinkP}
                        >
                          Login
                        </NavLink>
                      </p>
                    </div>
                    {showFailed && (
                      <p className={StyleCSS.pRed}>
                        That email already exists. Forgot Password?
                        <NavLink className="me-2" to="/forgot-password">
                          Forgot Password
                        </NavLink>
                      </p>
                    )}
                    {userError && (
                      <p className={StyleCSS.pRed}>Username is taken.</p>
                    )}
                    {showError && (
                      <p className={StyleCSS.pRed}>Passwords do not match.</p>
                    )}
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
