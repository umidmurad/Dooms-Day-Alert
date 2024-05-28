import React from "react";

import CountyMapWildfire from "./GoogleApi/googleMapsWildfire";

function Wildfire() {
  return (
    <>
      <section className="text-center">
        <div>
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Wildfire</h1>
          </div>
        </div>
      </section>
      <div>
        <CountyMapWildfire />
      </div>
    </>
  );
}

export default Wildfire;
