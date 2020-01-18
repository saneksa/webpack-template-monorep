import * as React from "react";
import { render } from "react-dom";
import App from "./containers/App/App";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Expander } from "@monorep/expander/src/Expander";
import { ModuleExpander, IModuleExpander } from "@monorep/expander/src/ModuleExpander";

const expanderInstance = Expander.getInstance();

const rootEntryPoint = () => {
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

const appRoutes = () => {
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
    <Route key="b" path="/b" component={() => <div>Ghddf</div>} exact={true} />
  ];
};

class AppModule extends ModuleExpander implements IModuleExpander {}

expanderInstance.expandModules(
  new AppModule({
    routes: appRoutes(),
    entrypoint: rootEntryPoint
  })
);
