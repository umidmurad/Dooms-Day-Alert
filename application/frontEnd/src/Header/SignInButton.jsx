import React, { useContext } from "react";
import { Dropdown, Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Main/Authentication/Auth";

function SignedInButton() {
  const { setIsLoggedIn, setUsername, setEmailAuth, setFavCounty } =
    useContext(AuthContext); // Access setIsLoggedIn from AuthContext
  const { username } = useContext(AuthContext); // Access the username state from AuthContext
  const navigate = useNavigate();
  const handleSignOut = () => {
    // Update allstates to default
    setIsLoggedIn(false);
    setUsername("");
    setEmailAuth("");
    setFavCounty("");
    // Refresh the page
    navigate("/");
  };

  return (
    <>
      <Dropdown align="end">
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          Hi, {username}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Stack direction="vertical" gap={3}>
            <Stack direction="horizontal"></Stack>
            <Dropdown.Item href="/manage">Manage Account</Dropdown.Item>
            <div className="d-grid gap-2">
              <Button variant="outline-dark" onClick={handleSignOut}>
                Sign out
              </Button>
            </div>
          </Stack>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default SignedInButton;
