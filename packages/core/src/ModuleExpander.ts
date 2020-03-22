export interface IModuleExpander {
  getRoutes(): JSX.Element[];
  getEntrypoint(): (() => void) | null;
}

export type TModuleExpanderParams = {
  routes: JSX.Element[];
  entrypoint?: (() => void) | null;
};

export abstract class ModuleExpander implements IModuleExpander {
  protected routes: JSX.Element[];
  protected entrypoint: (() => void) | null;

  constructor({ routes, entrypoint }: TModuleExpanderParams) {
    this.routes = routes;
    this.entrypoint = entrypoint ?? null;
  }

  public getRoutes() {
    return this.routes;
  }

  public getEntrypoint() {
    return this.entrypoint;
  }
}
