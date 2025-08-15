import { action, makeAutoObservable, observable } from "mobx";
import { Book } from "./Book.interface";
import { ViewMode } from "../Shared/enums/ViewMode.enum";

export class BooksStore {
  books: Book[] = [];
  viewMode: ViewMode = ViewMode.ALL;

  constructor() {
    makeAutoObservable(this, {
      books: observable,
      viewMode: observable,
      setBooks: action,
      setViewMode: action,
    });
  }

  async setBooks(books: Book[]) {
    this.books = books;
  }

  setViewMode(mode: ViewMode) {
    this.viewMode = mode;
  }
}
