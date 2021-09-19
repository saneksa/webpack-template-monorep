import { Expander, Injectable } from "@monorep/core";
import "antd/dist/antd.css";
import { observer } from "mobx-react";
import type { FC } from "react";
import { render } from "react-dom";
import { BrowserRouter, Link, Route, Switch, useLocation } from "react-router-dom";
import { IModuleExpander, ModuleExpander } from "../../core/src/ModuleExpander";
import App from "./containers/App/App";

const expanderInstance = Expander.getInstance();

const Component: FC = observer(() => {
  const routes = expanderInstance.routes;

  const location = useLocation();

  return (
    <>
      <div style={{ marginBottom: "24px" }}>
        {routes.map((el) => (
          <span key={el.props.path}>
            <span
              style={
                el.props.path === location.pathname
                  ? {
                      backgroundColor: "blue",
                    }
                  : undefined
              }
            >
              <Link style={{ padding: "12px" }} to={el.props.path}>
                {el.props.path}
              </Link>
            </span>
          </span>
        ))}
      </div>
      <div>
        <Switch key="1">
          {routes}
          <Route key="404" path="*" component={() => <div>404</div>} />
        </Switch>
      </div>
    </>
  );
});

export const rootEntryPoint = () => {
  render(
    <BrowserRouter>
      <Component />
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
