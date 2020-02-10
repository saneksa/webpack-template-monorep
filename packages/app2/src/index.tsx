import * as React from "react";
import { Route } from "react-router-dom";

import App2 from "./App2";
import { ServiceLocatorGeneric } from "@monorep/expander/src/ServiceLocatorGeneric";
import { IIAppConfig } from "@monorep/app/src/containers/App/App";
import { ModuleExpander, IModuleExpander } from "@monorep/expander/src/ModuleExpander";
import { Expander } from "@monorep/expander/src/Expander";

export const app2GetRoutes = () => {
  return [
    <Route key="app2" path="/app2" component={() => <div>App2</div>} />,
    <Route key="app22" path="/app22" component={() => <div>App22</div>} />
  ];
};

ServiceLocatorGeneric.register(IIAppConfig, App2);

export class App2Module extends ModuleExpander implements IModuleExpander {}

Expander.getInstance().expandModules(new App2Module({ routes: app2GetRoutes() }));
