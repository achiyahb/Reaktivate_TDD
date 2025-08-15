import { action, makeAutoObservable, observable } from "mobx";
import { Book } from "./Book.interface";

export class BooksStore {
  books: Book[] = [];

  constructor() {
    makeAutoObservable(this, {
      books: observable,
      setBooks: action,
    });
  }

  async setBooks(books: Book[]) {
    this.books = books;
  }
}
