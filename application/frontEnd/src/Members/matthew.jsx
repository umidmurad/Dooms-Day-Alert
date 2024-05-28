import React from "react";
import profilePhoto from "../Images/matthew-img.JPEG";
import StyleCSS from "../Css/minor-stylings.module.css";
function Matthew() {
  return (
    <>
      <head>
        <div>
          <title>About Us</title>
        </div>
      </head>
      <body>
        <div className={StyleCSS.manageH1}>
          <h1>Matthew Marcos</h1>
          <img src={profilePhoto} alt="ProfilePhoto" width="400" height="400" />
          <p>Student number: 918620773</p>
          <p> 22 years old</p>
          <p>Back-end programmer</p>
          <a href="https://github.com/mmarcos3">Github Account</a>
        </div>
      </body>
    </>
  );
}

export default Matthew;
