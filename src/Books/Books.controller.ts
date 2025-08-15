import booksRepository from "./Books.repository";
import { Book } from "./Book.interface";
import { BooksStore } from "./Books.store";

export class BooksController {
  constructor(private readonly booksStore: BooksStore) {}

  async loadBooks() {
    const books = await booksRepository.getBooks();
    this.booksStore.setBooks(books);
  }

  async addBook() {
    const book: Book = {
      name: "Demo Book",
      author: "Demo Author",
      ownerId: "achiya",
    };
    const isAdded = await booksRepository.addBook(book);
    if (isAdded) {
      this.booksStore.setBooks([...this.booksStore.books, book]);
    }
  }
}
