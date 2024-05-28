import React from "react";
import profilePhoto from "../Images/arin-img.png";
import arinCSS from "../Css/arin.module.css";
function Arin() {
  return (
    <>
      <head>
        <title>About Us</title>
      </head>
      <body className={arinCSS.body}>
        <div className={arinCSS.content}>
          <h1>Arin Ton</h1>
          <div className="profile-image">
            <img
              className={arinCSS.img}
              src={profilePhoto}
              alt="ProfilePhoto"
              height="200px"
              width="200px"
            />
          </div>
          <p>San Francisco State University</p>
          <p>Computer Science</p>
        </div>
      </body>
    </>
  );
}

export default Arin;
