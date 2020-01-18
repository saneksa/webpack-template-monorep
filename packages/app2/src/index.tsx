import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Expander from "@monorep/expander/src/expander";

const app2GetRoutes = () => {
  return [
    <Route key="app2" path="/app2" component={() => <div>App2</div>} />,
    <Route key="app22" path="/app22" component={() => <div>App22</div>} />
  ];
};

Expander.getInstance()?.expandRoutes(app2GetRoutes());

console.warn(Expander.getInstance().getRoutes());
