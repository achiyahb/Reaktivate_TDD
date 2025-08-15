import { action, makeAutoObservable, observable } from "mobx";
import { Book } from "./Book.interface";
import { ViewMode } from "../Shared/enums/ViewMode.enum";

export class BooksStore {
  books: Book[] = [];
  viewMode: ViewMode = ViewMode.ALL;
  privateBooksCount: number = 0;

  constructor() {
    makeAutoObservable(this, {
      books: observable,
      viewMode: observable,
      setBooks: action,
      setViewMode: action,
      privateBooksCount: observable,
      setPrivateBooksCount: action,
    });
  }

  setBooks(books: Book[]) {
    this.books = books;
    this.setPrivateBooksCount();
  }

  setViewMode(mode: ViewMode) {
    this.viewMode = mode;
  }

  setPrivateBooksCount(): void {
    this.privateBooksCount = this.books.filter((book) => book.isPrivate).length;
  }
}
