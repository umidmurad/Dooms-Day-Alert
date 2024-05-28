import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import StyleCSS from "../../Css/minor-stylings.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const { setIsLoggedIn, setUsername, setAType, setEmailAuth, setFavCounty } =
    useContext(AuthContext); // Get the setIsLoggedIn function from AuthContext

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://34.212.246.140:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json(); // Parse the response body as JSON
        } else {
          setShowError(true);
          throw console.error("Incorrect Credentials Entered.");
        }
      })
      .then((data) => {
        // Access the username from the response and set it in state
        setIsLoggedIn(true);
        setUsername(data.username); // Set the username using setUsername function
        setAType(data.account_type);
        setEmailAuth(data.email);
        setFavCounty(data.prefCounty);
        console.log(data.email);
        console.log("Login Successful");
        console.log(data);
        navigate("/"); // Redirect to home page
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
            <h1 className="fw-light">Login</h1>
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
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <NavLink
                            id={StyleCSS.navlinkP}
                            className="me-2 text-primary"
                            to="/forgot-password"
                          >
                            Forgot Password
                          </NavLink>
                        </p>
                      </Form.Group>
                      <div className="d-grid gap-2 col-3 mx-auto">
                        <Button className="btn btn-dark" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <NavLink
                          className="me-2 text-primary"
                          to="/registration"
                          id={StyleCSS.navlinkP}
                        >
                          Sign-up
                        </NavLink>
                      </p>
                    </div>
                    {showError && (
                      <p className={StyleCSS.pRed}>
                        The email or the password is incorrect. Try again.
                      </p>
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
