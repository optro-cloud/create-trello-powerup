import React, { Suspense } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {TrelloProvider} from '@optro/ui-react';

// Lazy Loaders

const t = window.TrelloPowerUp.iframe();

function PowerupRouter() {
  return (
    <div>
      <TrelloProvider t={t}>
      <Suspense fallback={<div style={{ margin: '6px' }}>Loading...</div>}>
        <Router basename={process.env.CONTEXT_PATH || undefined}>
        </Router>
      </Suspense>
      </TrelloProvider>
    </div>
  );
}

export default PowerupRouter;
