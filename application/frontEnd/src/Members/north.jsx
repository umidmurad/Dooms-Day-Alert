import React from "react";
import profilePhoto from "../Images/north-port.jpg";
import StyleCSS from "../Css/minor-stylings.module.css";
function North() {
  return (
    <>
      <head>
        <title>About Us</title>
      </head>
      <body className={StyleCSS.northDiv}>
        <h1>North Wiriyachinnakarn</h1>
        <p>Computer Science</p>
        <p>San Francisco State University</p>
        <img src={profilePhoto} alt="ProfilePhoto" width="300px" />
        <br></br>
        <br></br>
      </body>
    </>
  );
}

export default North;
