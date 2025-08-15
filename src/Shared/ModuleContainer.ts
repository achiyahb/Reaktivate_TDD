import { BooksStore } from "../Books/Books.store";
import { BooksController } from "../Books/Books.controller";
import { EntityModule } from "./EntityModule";

export abstract class ModuleContainer<T> {
  protected static instances = new Map<string, any>();
  protected Modules: T;

  public constructor() {
    this.Modules = this.createModules();
  }

  protected abstract createModules(): T;

  static getInstance<T extends ModuleContainer<any>>(this: new () => T): T {
    const className = this.name;
    if (!ModuleContainer.instances.has(className)) {
      ModuleContainer.instances.set(className, new this());
    }
    return ModuleContainer.instances.get(className);
  }

  getModules(): T {
    return this.Modules;
  }
}

export interface AppModules {
  books: EntityModule<BooksStore, BooksController>;
}

export class AppModuleContainer extends ModuleContainer<AppModules> {
  protected createModules(): AppModules {
    return {
      books: createEntityModule(BooksStore, BooksController),
    };
  }
}

export const appModuleContainer = AppModuleContainer.getInstance();

export function createEntityModule<Store, Controller>(
  StoreClass: new () => Store,
  ControllerClass: new (store: Store) => Controller
): EntityModule<Store, Controller> {
  const store = new StoreClass();
  const controller = new ControllerClass(store);

  return new (class extends EntityModule<Store, Controller> {
    constructor() {
      super(store, controller);
    }
  })();
}
