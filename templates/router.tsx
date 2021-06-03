import React, { Suspense } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Lazy Loaders

function PowerupRouter() {
  return (
    <div>
      <Suspense fallback={<div style={{ margin: '6px' }}>Loading...</div>}>
        <Router basename={process.env.CONTEXT_PATH || undefined}>
        </Router>
      </Suspense>
    </div>
  );
}

export default PowerupRouter;
