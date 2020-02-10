import "reflect-metadata";
import { ServiceLocatorGeneric } from "./ServiceLocatorGeneric";

export const InjectConfig = (target: any, propertyName: string) => {
  const type = Reflect.getOwnMetadata("design:type", target, propertyName);

  Object.defineProperty(target, propertyName, {
    get: function() {
      return ServiceLocatorGeneric.resolve(type);
    }
  });
};
