import { isFunction, isArray } from "lodash";
import { ModuleExpander } from "./ModuleExpander";

export class Expander {
  private static instance: Expander;
  private routes: JSX.Element[] = [];
  private entrypointList: (() => void)[] = [];
  private modules: ModuleExpander[] = [];

  public static getInstance(): Expander {
    if (Expander.instance) {
      return Expander.instance;
    }

    Expander.instance = new Expander();

    return Expander.instance;
  }

  private constructor() {}

  private expandRoutes(routesConfig: JSX.Element | JSX.Element[]) {
    if (isArray(routesConfig)) {
      this.routes.push(...routesConfig);
    } else {
      this.routes.push(routesConfig);
    }

    return this;
  }

  private expandEntryPoint(entrypoint: (() => void) | null) {
    if (entrypoint) {
      this.entrypointList.push(entrypoint);
    }

    return this;
  }

  public getRoutes() {
    return this.routes;
  }

  public expandModules(module: ModuleExpander) {
    this.modules.push(module);
    this.expandRoutes(module.getRoutes());
    this.expandEntryPoint(module.getEntrypoint());

    return this;
  }

  public getModules() {
    return this.modules;
  }

  public build() {
    this.entrypointList.forEach((getEntrypoint) => {
      if (isFunction(getEntrypoint)) {
        getEntrypoint();
      }
    });
  }
}
