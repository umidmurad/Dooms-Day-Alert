import React from "react";
import footerCSS from "../Css/footer.module.css";

function Footer() {
  return (
    <>
      <footer className="footer mt-auto py-3 bg-body-tertiary bg-light">
        <div className={footerCSS.box}>
          <div className="container border-bottom" id={footerCSS.navLinks}>
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <a href="/" className="nav-link px-2 link-dark">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="/about" className="nav-link px-2 link-dark">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* <div className={footerCSS.switchButton}>
            <div className="form-check form-switch tooltip-demo">
              <input
                className="form-check-input"
                type="checkbox"
                id="toggle-btn"
                title=""
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                data-bs-title="Toggle Dark Mode or press [D] hot-key"
                data-bs-original-title=""
              />
              <label className="form-check-label" htmlFor="toggle-btn"></label>
            </div>
          </div> */}
        </div>
        <div className="text-center text-muted" id={footerCSS.privacySenctence}>
          <p>
            We prioritize your privacy and confidentiality and do not disclose
            any of your personal information to third parties.
          </p>
        </div>

        <div className="text-center text-muted">
          <p>SFSU Software Engineering Project CSC 648-848, Spring 2023.</p>
        </div>
        <div className="text-center text-muted">
          <p>For Demonstration Only © Dooms Day Alert</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
