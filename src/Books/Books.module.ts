import { BooksStore } from "./Books.store";
import { BooksController } from "./Books.controller";

import { useEffect } from "react";
import { EntityModule } from "../Shared/EntityModule";

class BooksModule extends EntityModule<BooksStore, BooksController> {
  constructor() {
    const store = new BooksStore();
    const controller = new BooksController(store);
    super(store, controller);
  }
}

const booksModule = new BooksModule();

export const useBooks = () => {
  const booksStore = booksModule.getStore();
  const booksController = booksModule.getController();

  useEffect(() => {
    booksController.loadBooks();
  }, []);

  return {
    books: booksStore.books,
    viewMode: booksStore.viewMode,
    addBook: booksController.addBook.bind(booksController),
    loadPrivateBooks: booksController.loadPrivateBooks.bind(booksController),
    setViewMode: booksStore.setViewMode.bind(booksStore),
    switchViewMode: booksController.switchViewMode.bind(booksController),
  };
};
