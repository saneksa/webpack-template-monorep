import { TModuleExpanderParams, ModuleExpander } from "./ModuleExpander";
import { Expander } from "./Expander";

export const Injectable = (params: TModuleExpanderParams) => <
  T extends { new (params: TModuleExpanderParams): ModuleExpander }
>(
  Module: T
) => {
  Expander.getInstance().expandModules(new Module(params));
};
