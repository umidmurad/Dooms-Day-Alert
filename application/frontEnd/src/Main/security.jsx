import React from "react";

import CountyMapSecurity from "./GoogleApi/googleMapsSecurity";

function Security() {
  return (
    <>
      <section className="text-center">
        <div>
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Security</h1>
          </div>
        </div>
      </section>
      <div>
        <CountyMapSecurity />
      </div>
    </>
  );
}

export default Security;
