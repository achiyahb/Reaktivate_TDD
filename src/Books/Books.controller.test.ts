import { BooksController } from "./Books.controller";
import { Book } from "./Book.interface";

jest.mock("./Books.repository");

describe("BooksController", () => {
  let booksController: BooksController;
  let mockBooksStore: any;

  beforeEach(() => {
    mockBooksStore = {
      books: [],
      setBooks: jest.fn(),
    };

    booksController = new BooksController(mockBooksStore);

    jest.clearAllMocks();
  });

  describe("constructor", () => {
    it("should create a BooksController instance", () => {
      expect(booksController).toBeInstanceOf(BooksController);
    });
  });

  describe("loadBooks", () => {
    it("should call repository and update store", async () => {
      const mockBooks: Book[] = [
        { id: 1, name: "Test Book", author: "Test Author", ownerId: "achiya" },
      ];

      const mockRepository = require("./Books.repository").default;
      mockRepository.getBooks = jest.fn().mockResolvedValue(mockBooks);

      await booksController.loadBooks();

      expect(mockRepository.getBooks).toHaveBeenCalled();
      expect(mockBooksStore.setBooks).toHaveBeenCalledWith(mockBooks);
    });
  });

  describe("addBook", () => {
    it("should add book successfully and update store", async () => {
      const mockRepository = require("./Books.repository").default;
      mockRepository.addBook = jest.fn().mockResolvedValue(true);

      await booksController.addBook();

      expect(mockRepository.addBook).toHaveBeenCalled();
      expect(mockBooksStore.setBooks).toHaveBeenCalled();
    });

    it("should not update store when book addition fails", async () => {
      const mockRepository = require("./Books.repository").default;
      mockRepository.addBook = jest.fn().mockResolvedValue(false);

      await booksController.addBook();

      expect(mockRepository.addBook).toHaveBeenCalled();
      expect(mockBooksStore.setBooks).not.toHaveBeenCalled();
    });
  });
});
