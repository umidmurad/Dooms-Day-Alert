import React from "react";
import profilePhoto from "../Images/Edward.jpg";
import StyleCSS from "../Css/minor-stylings.module.css";
function Edward() {
  return (
    <>
      <head>
        <title>About Us</title>
      </head>
      <body>
        <div className={StyleCSS.manageH1}>
          <h1>Edward Li</h1>
          <img src={profilePhoto} alt="ProfilePhoto" width="400" height="600" />
          <p>
            Hi there! My name is Edward, and I am a senior college student with
            a major in computer science. As a transfer student, <br />
            I joined San Francisco State University last year and have been
            thoroughly enjoying my time here. <br />
            Throughout my studies, I have developed a passion for coding and
            have honed my skills through various classes and projects. <br />
            When I'm not working on my coursework, you can find me indulging in
            some of my favorite hobbies, such as playing video games, <br />
            shooting hoops on the basketball court, or binge-watching my latest
            television obsession. <br />
            These activities not only provide me with an enjoyable escape from
            the rigors of school but also keep me mentally and physically
            active. <br />
            I am excited to see where my love for computer science will take me
            in the future and am always open to new challenges and
            opportunities. <br />
            I am confident that my strong work ethic, dedication, and passion
            for coding will allow me to succeed in any environment. <br />
          </p>
        </div>
        <div className={StyleCSS.manageH1}>
          <a href="https://github.com/Edwards-Github">Github</a>
        </div>
      </body>
    </>
  );
}

export default Edward;
