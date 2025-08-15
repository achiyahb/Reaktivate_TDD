export abstract class EntityModule<Store, Controller> {
  protected store: Store;
  protected controller: Controller;

  constructor(store: Store, controller: Controller) {
    this.store = store;
    this.controller = controller;
  }

  getStore(): Store {
    return this.store;
  }

  getController(): Controller {
    return this.controller;
  }
}

export interface EntityModules<Store, Controller> {
  store: Store;
  controller: Controller;
}
