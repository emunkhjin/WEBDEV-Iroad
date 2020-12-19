import React from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route
        path={`${match.url}home`}
        component={asyncComponent(() => import("./SamplePage"))}
      />
      <Route
        path={`${match.url}show/:id`}
        component={asyncComponent(() => import("./Show"))}
      />
      <Route
        path={`${match.url}edit/:id`}
        component={asyncComponent(() => import("./Edit"))}
      />
    </Switch>
  </div>
);

export default App;
