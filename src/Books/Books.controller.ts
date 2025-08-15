import booksRepository from "./Books.repository";
import { Book } from "./Book.interface";
import { BooksStore } from "./Books.store";
import { ViewMode } from "../Shared/enums/ViewMode.enum";

export class BooksController {
  constructor(private readonly booksStore: BooksStore) {}

  async loadBooks() {
    const books = await booksRepository.getBooks();
    this.booksStore.setBooks(books);
  }

  async loadPrivateBooks() {
    const books = await booksRepository.getPrivateBooks();
    this.booksStore.setBooks(books);
  }

  async switchViewMode(mode: ViewMode) {
    this.booksStore.setViewMode(mode);
    if (mode === ViewMode.ALL) {
      await this.loadBooks();
    } else {
      await this.loadPrivateBooks();
    }
  }

  async addBook() {
    const book: Book = {
      name: "Demo Book",
      author: "Demo Author",
      ownerId: "achiya",
      isPrivate: true,
    };
    const isAdded = await booksRepository.addBook(book);
    if (isAdded) {
      this.booksStore.setBooks([...this.booksStore.books, book]);
    }
  }
}
