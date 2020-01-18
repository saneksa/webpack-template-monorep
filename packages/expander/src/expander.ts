import { merge, isFunction, isArray } from "lodash";

class Expander {
  private static instance: Expander;
  private routes: JSX.Element[] = [];
  private entrypointList: (() => void)[] = [];

  public static getInstance(): Expander {
    if (Expander.instance) {
      return Expander.instance;
    }

    Expander.instance = new Expander();

    return Expander.instance;
  }

  private constructor() {}

  public expandRoutes(routesConfig: JSX.Element | JSX.Element[]) {
    if (isArray(routesConfig)) {
      this.routes.push(...routesConfig);
    } else {
      this.routes.push(routesConfig);
    }

    return this;
  }

  public expandEntryPoint(entrypoint: () => void) {
    this.entrypointList.push(entrypoint);
    return this;
  }

  public getRoutes() {
    return this.routes;
  }

  public build() {
    this.entrypointList.forEach(getEntrypoint => {
      if (isFunction(getEntrypoint)) {
        getEntrypoint();
      }
    });
  }
}

export default Expander;
