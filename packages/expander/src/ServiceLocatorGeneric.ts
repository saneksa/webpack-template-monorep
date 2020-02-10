class ServiceLocator {
  private registeredClasses?: Map<Function, Function>;
  private isInitialize?: boolean;

  private init() {
    this.registeredClasses = new Map<Function, Function>();
    this.isInitialize = true;
  }

  public register(classKey: Function, instance: Function) {
    if (!this.isInitialize) {
      this.init();
    }

    this.registeredClasses?.set(classKey, instance);
  }

  public resolve(classKey: Function) {
    return this.registeredClasses?.get(classKey);
  }
}

const serviceLocatorInstance = new ServiceLocator();

export { serviceLocatorInstance as ServiceLocatorGeneric };
