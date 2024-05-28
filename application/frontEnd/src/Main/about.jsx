import React from "react";
import aboutCSS from "../Css/about.module.css";
import { Link } from "react-router-dom";
function About() {
  return (
    <>
      <div className={aboutCSS.body}>
        <div>
          <div className={aboutCSS.teamheader}>
            <h3 className={aboutCSS.h3}>Software Engineering Class SFSU</h3>
            <p className={aboutCSS.h3}>Spring 2023 - Section 02</p>

            <h5 className={aboutCSS.h3}>Team 6</h5>
          </div>
          <div className={aboutCSS.teamlinks}>
            <Link to="../members/north" className={aboutCSS.btn}>
              North Wiriyachinnakarn
            </Link>
            <Link to="../members/matthew" className={aboutCSS.btn}>
              Matthew Marcos
            </Link>
            <Link to="../members/umid" className={aboutCSS.btn}>
              Umid Muradli
            </Link>
            <Link to="../members/edward" className={aboutCSS.btn}>
              Edward Li
            </Link>
            <Link to="../members/khabibullo" className={aboutCSS.btn}>
              Khabibullo Khujamberdiev
            </Link>
            <Link to="../members/arin" className={aboutCSS.btn}>
              Arin Ton
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
