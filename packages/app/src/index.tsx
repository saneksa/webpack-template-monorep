import { Expander, Injectable } from "@monorep/core";
import "antd/dist/antd.css";
import { render } from "react-dom";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { IModuleExpander, ModuleExpander } from "../../core/src/ModuleExpander";
import App from "./containers/App/App";

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
    <Route key="app" render={(props) => <App {...props} />} path="/a" exact={true} />,
    <Route key="b" path="/b" component={() => <div>Ghddf</div>} exact={true} />,
  ];
};

@Injectable({
  routes: appRoutes(),
  entrypoint: rootEntryPoint,
})
export class AppModule extends ModuleExpander implements IModuleExpander {}
