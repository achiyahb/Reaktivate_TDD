import { BooksStore } from "../Books/Books.store";
import { BooksController } from "../Books/Books.controller";
import { EntityService } from "./EntityService";

export abstract class ServiceContainer<T> {
  protected static instances = new Map<string, any>();
  protected services: T;

  public constructor() {
    this.services = this.createServices();
  }

  protected abstract createServices(): T;

  static getInstance<T extends ServiceContainer<any>>(this: new () => T): T {
    const className = this.name;
    if (!ServiceContainer.instances.has(className)) {
      ServiceContainer.instances.set(className, new this());
    }
    return ServiceContainer.instances.get(className);
  }

  getServices(): T {
    return this.services;
  }
}

export interface AppServices {
  books: EntityService<BooksStore, BooksController>;
}

export class AppServiceContainer extends ServiceContainer<AppServices> {
  protected createServices(): AppServices {
    return {
      books: createEntityService(BooksStore, BooksController),
    };
  }
}

export const appServiceContainer = AppServiceContainer.getInstance();

export function createEntityService<Store, Controller>(
  StoreClass: new () => Store,
  ControllerClass: new (store: Store) => Controller
): EntityService<Store, Controller> {
  const store = new StoreClass();
  const controller = new ControllerClass(store);

  return new (class extends EntityService<Store, Controller> {
    constructor() {
      super(store, controller);
    }
  })();
}
