import { isArray, isFunction } from "lodash";
import { action, computed, makeObservable, observable } from "mobx";
import type { ModuleExpander } from "./ModuleExpander";

type TPrivateFields = "_routes" | "_modules";

export class Expander {
  private static instance: Expander;
  private _routes: JSX.Element[] = [];
  private entrypointList: (() => void)[] = [];
  private _modules: ModuleExpander[] = [];

  public static getInstance(): Expander {
    if (Expander.instance) {
      return Expander.instance;
    }

    Expander.instance = new Expander();

    return Expander.instance;
  }

  private constructor() {
    makeObservable<this, TPrivateFields>(this, {
      _routes: observable.struct,
      _modules: observable,
      routes: computed,
      expandModules: action.bound,
    });
  }

  public get routes() {
    return this._routes;
  }

  public get modules() {
    return this._modules;
  }

  private expandRoutes(routesConfig: JSX.Element | JSX.Element[]) {
    if (isArray(routesConfig)) {
      this._routes.push(...routesConfig);
    } else {
      this._routes.push(routesConfig);
    }

    return this;
  }

  private expandEntryPoint(entrypoint: (() => void) | null) {
    if (entrypoint) {
      this.entrypointList.push(entrypoint);
    }

    return this;
  }

  public expandModules(module: ModuleExpander) {
    this._modules.push(module);
    this.expandRoutes(module.getRoutes());
    this.expandEntryPoint(module.getEntrypoint());

    return this;
  }

  public build() {
    this.entrypointList.forEach((getEntrypoint) => {
      if (isFunction(getEntrypoint)) {
        getEntrypoint();
      }
    });
  }
}
