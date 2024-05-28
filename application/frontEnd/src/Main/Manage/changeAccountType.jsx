import React, { useContext, useState } from "react";
import { AuthContext } from "../Authentication/Auth";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import ChangeACSS from "../../Css/change-account-type.module.css";

export default function ChangeAccount() {
  //To Block access to show pages without loging in.
  const { isLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerContact, setManagerContact] = useState("");
  const [showParagraph, setShowParagraph] = useState(false);
  const [showError, setShowError] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://34.212.246.140:3001/upAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          companyName,
          position,
          managerName,
          managerContact,
        }),
      });
      if (response.ok) {
        setEmail("");
        setCompanyName("");
        setPosition("");
        setManagerName("");
        setManagerContact("");
        setShowParagraph(true);
        console.log(await response.json());
      } else {
        console.error(`Request failed with status code ${response.status}`);
        setShowError(true);
      }
    } catch (error) {
      console.error(error);
      console.log("Something went wrong.");
    }
  };

  if (!isLoggedIn) {
    return (
      <h1 className={ChangeACSS.returnWarning}>
        is not granted, please Login or Sign-Up!
      </h1>
    ); // Return null to prevent rendering the protected content
  }

  return (
    <div>
      <section className="text-center">
        <div>
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Upgrade Account Type</h1>
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
                        <Form.Label className="text-center">
                          Select Account Type
                        </Form.Label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="2">Official Account</option>
                          {/* <option value="1">Regular Account</option> */}
                        </select>
                      </Form.Group>
                      {/* Email */}
                      <Form.Group className="mb-3" controlId="Email">
                        <Form.Label className="text-center">Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter Email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </Form.Group>

                      {/* Company Name */}
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">
                          Company / Organization
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Company/Organization Name"
                          value={companyName}
                          onChange={(event) =>
                            setCompanyName(event.target.value)
                          }
                        />
                      </Form.Group>

                      {/* Position Title */}

                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">
                          Title of Employment
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Position/Title"
                          value={position}
                          onChange={(event) => setPosition(event.target.value)}
                        />
                      </Form.Group>

                      {/* Manager Information*/}

                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">
                          Manager Contact Information
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Manager Name"
                          value={managerName}
                          onChange={(event) =>
                            setManagerName(event.target.value)
                          }
                        />
                        <br></br>
                        <Form.Control
                          type="email"
                          placeholder="Enter Manager Email"
                          value={managerContact}
                          onChange={(event) =>
                            setManagerContact(event.target.value)
                          }
                        />
                      </Form.Group>

                      <div className="d-grid gap-2 col-3 mx-auto">
                        <Button
                          variant="dark"
                          type="submit"
                          disabled={
                            !email ||
                            !companyName ||
                            !position ||
                            !managerName ||
                            !managerContact
                          }
                        >
                          Submit
                        </Button>
                      </div>
                      {showParagraph && (
                        <p className={ChangeACSS.pGreen}>
                          Your information has been successfully submitted.
                        </p>
                      )}
                      {showError && (
                        <p classNam={ChangeACSS.pRed}>
                          We couldn't submit your information, we are working on
                          a fix.
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
