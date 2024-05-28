import React from "react";
import profilePhoto from "../Images/Umid.jpeg";
import umidCSS from "../Css/umid.module.css";
function Umid() {
  return (
    <>
      <head>
        <title>Umid Muradli</title>
      </head>
      <body className={umidCSS.body}>
        <h1 className={umidCSS.manageH1}>Umid Muradli</h1>

        <div className={umidCSS.middle}>
          <div className={umidCSS.responsive}>
            <div className={umidCSS.gallery}>
              <img src={profilePhoto} alt="Lankaran" width="600" height="400" />

              <div className={umidCSS.desc}>Lankaran | Azerbaijan</div>
            </div>
          </div>
        </div>
        <div className={umidCSS.clearfix}></div>

        <div className={umidCSS.middle}>
          <p>I am Umid Muradli, </p>
          <p> 24 Years Old, </p>
          <p>Full Stack Developer</p>
        </div>
      </body>
    </>
  );
}

export default Umid;
