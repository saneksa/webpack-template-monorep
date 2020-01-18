import * as React from "react";
import { Route } from "react-router-dom";
import { Expander } from "@monorep/expander/src/Expander";
import { ModuleExpander, IModuleExpander } from "@monorep/expander/src/ModuleExpander";

const app2GetRoutes = () => {
  return [
    <Route key="app2" path="/app2" component={() => <div>App2</div>} />,
    <Route key="app22" path="/app22" component={() => <div>App22</div>} />
  ];
};

class App2Module extends ModuleExpander implements IModuleExpander {}

Expander.getInstance().expandModules(new App2Module({ routes: app2GetRoutes() }));
