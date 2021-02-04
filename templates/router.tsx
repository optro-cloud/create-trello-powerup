import React, { Suspense } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import { hot } from "react-hot-loader/root";

// Lazy Loading Here

function PowerupRouter() {
  return (
    <div>
      <Suspense fallback={<div style={{ margin: "6px" }}>Loading...</div>}>
        <Router basename={process.env.CONTEXT_PATH || undefined}>
          {/* Routes Here */}
        </Router>
      </Suspense>
    </div>
  );
}

export default hot(PowerupRouter);
