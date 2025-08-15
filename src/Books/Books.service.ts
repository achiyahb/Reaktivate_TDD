import { BooksStore } from "./Books.store";
import { BooksController } from "./Books.controller";
import { EntityService } from "../Shared/EntityService";

import { useEffect } from "react";

class BooksEntityService extends EntityService<BooksStore, BooksController> {
  constructor() {
    const store = new BooksStore();
    const controller = new BooksController(store);
    super(store, controller);
  }
}

const booksService = new BooksEntityService();

export const useBooks = () => {
  const booksStore = booksService.getStore();
  const booksController = booksService.getController();

  useEffect(() => {
    booksController.loadBooks();
  }, []);

  return {
    books: booksStore.books,
    addBook: booksController.addBook.bind(booksController),
  };
};
