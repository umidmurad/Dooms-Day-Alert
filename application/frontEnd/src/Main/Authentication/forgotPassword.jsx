import React, { useContext, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import styleCSS from "../../Css/minor-stylings.module.css";

export default function ForgotPassword() {
  const [secAnswer, setSecAnswer] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { setEmailAuth } = useContext(AuthContext);
  const [showParagraph, setShowParagraph] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://34.212.246.140:3001/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, secAnswer }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json(); // Parse the response body as JSON
        } else {
          setShowParagraph(true);
          throw console.log("Incorrect Answer entered");
        }
      })
      .then((data) => {
        // Access the username from the response and set it in state
        setEmailAuth(data.email); // Set the username using setUsername function
        console.log("Correct Security Answer");
        navigate("/newPassword"); // Redirect to home page
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
            <h1 className="fw-light">Forgot Password</h1>
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
                        <Form.Label className="text-center">Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="example@mail.com"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Security Question
                        </Form.Label>
                        <Form.Select>
                          <option>What is your favorite hobby?</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          placeholder="Enter Security Answer"
                          value={secAnswer}
                          onChange={(event) => setSecAnswer(event.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid gap-2 col-3 mx-auto">
                        <Button variant="dark" type="submit">
                          Send
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Remember your password?{" "}
                        <NavLink
                          className="me-2"
                          to="/login"
                          id={styleCSS.pLogin}
                        >
                          Login here!
                        </NavLink>
                      </p>
                    </div>
                    {showParagraph && (
                      <p className={styleCSS.pRed}>
                        Incorrect Email or Security Answer has been entered.
                        Please try again.
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
