import React from "react";
import profilePhoto from "../Images/khabibullo-img.png";
import khabibulloCSS from "../Css/khabibullo.module.css";
function Khabibullo() {
  return (
    <>
      <head>
        <title>About Us</title>
      </head>
      <body className={khabibulloCSS.body}>
        <div className={khabibulloCSS.container}>
          <div className={khabibulloCSS.imgme}>
            <img
              src={profilePhoto}
              className={khabibulloCSS.img}
              alt="ProfilePhoto"
              width="200px"
              height="200px"
            />
          </div>
          <div>
            <h3 className={khabibulloCSS.h3}>Khabibullo Khujamberdiev</h3>
            <p>SFSU Computer Science student</p>
          </div>
        </div>
      </body>
    </>
  );
}

export default Khabibullo;
