import * as React from "react";
import { Route } from "react-router-dom";
import { ModuleExpander, IModuleExpander } from "../../expander/src/ModuleExpander";
import { Expander } from "../../expander/src/Expander";

export const app2GetRoutes = () => {
  return [
    <Route key="app2" path="/app2" component={() => <div>App2</div>} />,
    <Route key="app22" path="/app22" component={() => <div>App22</div>} />
  ];
};

export class App2Module extends ModuleExpander implements IModuleExpander {}

Expander.getInstance().expandModules(new App2Module({ routes: app2GetRoutes() }));
