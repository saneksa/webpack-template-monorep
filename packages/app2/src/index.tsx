import * as React from "react";
import { Route } from "react-router-dom";
import { ModuleExpander, Expander, Injectable } from "@monorep/core";
import type { IModuleExpander } from "@monorep/core";

export const app2GetRoutes = () => {
  return [
    <Route key="app2" path="/app2" component={() => <div>App2</div>} />,
    <Route key="app22" path="/app22" component={() => <div>App22</div>} />,
  ];
};

@Injectable({
  routes: app2GetRoutes(),
})
export class App2Module extends ModuleExpander implements IModuleExpander {}
