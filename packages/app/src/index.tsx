import * as React from "react";
import { render } from "react-dom";
import App from "./containers/App/App";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import { ModuleExpander, IModuleExpander } from "../../core/src/ModuleExpander";
import { Expander, Injectable } from "@monorep/core";

const expanderInstance = Expander.getInstance();

export const rootEntryPoint = () => {
  render(
    <BrowserRouter>
      <Switch key="1">
        {expanderInstance.getRoutes()}
        <Route key="404" path="*" component={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>,
    document.getElementById("root")
  );
};

export const appRoutes = () => {
  return [
    <Route
      key="default"
      component={() => (
        <div>
          Default <Link to="/app2">sdfsdfsdf</Link>
        </div>
      )}
      path="/"
      exact={true}
    />,
    <Route key="app" component={App} path="/a" exact={true} />,
    <Route key="b" path="/b" component={() => <div>Ghddf</div>} exact={true} />,
  ];
};

@Injectable({
  routes: appRoutes(),
  entrypoint: rootEntryPoint,
})
export class AppModule extends ModuleExpander implements IModuleExpander {}
