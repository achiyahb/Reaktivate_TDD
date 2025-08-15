import { BooksController } from "./Books.controller";
import { Book } from "./Book.interface";
import { ViewMode } from "../Shared/enums/ViewMode.enum";

jest.mock("./Books.repository");

describe("BooksController", () => {
  let booksController: BooksController;
  let mockBooksStore: any;

  beforeEach(() => {
    mockBooksStore = {
      books: [],
      setBooks: jest.fn(),
      setViewMode: jest.fn(),
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

    it("should handle empty books array", async () => {
      const mockRepository = require("./Books.repository").default;
      mockRepository.getBooks = jest.fn().mockResolvedValue([]);

      await booksController.loadBooks();

      expect(mockRepository.getBooks).toHaveBeenCalled();
      expect(mockBooksStore.setBooks).toHaveBeenCalledWith([]);
    });

    it("should handle repository errors gracefully", async () => {
      const mockRepository = require("./Books.repository").default;
      mockRepository.getBooks = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));

      await expect(booksController.loadBooks()).rejects.toThrow(
        "Database error"
      );
      expect(mockRepository.getBooks).toHaveBeenCalled();
      expect(mockBooksStore.setBooks).not.toHaveBeenCalled();
    });
  });

  describe("loadPrivateBooks", () => {
    it("should call repository and update store with private books", async () => {
      const mockPrivateBooks: Book[] = [
        {
          id: 1,
          name: "Private Book",
          author: "Private Author",
          ownerId: "achiya",
        },
      ];

      const mockRepository = require("./Books.repository").default;
      mockRepository.getPrivateBooks = jest
        .fn()
        .mockResolvedValue(mockPrivateBooks);

      await booksController.loadPrivateBooks();

      expect(mockRepository.getPrivateBooks).toHaveBeenCalled();
      expect(mockBooksStore.setBooks).toHaveBeenCalledWith(mockPrivateBooks);
    });

    it("should handle empty private books array", async () => {
      const mockRepository = require("./Books.repository").default;
      mockRepository.getPrivateBooks = jest.fn().mockResolvedValue([]);

      await booksController.loadPrivateBooks();

      expect(mockRepository.getPrivateBooks).toHaveBeenCalled();
      expect(mockBooksStore.setBooks).toHaveBeenCalledWith([]);
    });

    it("should handle repository errors gracefully", async () => {
      const mockRepository = require("./Books.repository").default;
      mockRepository.getPrivateBooks = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));

      await expect(booksController.loadPrivateBooks()).rejects.toThrow(
        "Database error"
      );
      expect(mockRepository.getPrivateBooks).toHaveBeenCalled();
      expect(mockBooksStore.setBooks).not.toHaveBeenCalled();
    });
  });

  describe("switchViewMode", () => {
    it("should switch to ALL mode and load all books", async () => {
      const mockBooks: Book[] = [
        { id: 1, name: "Test Book", author: "Test Author", ownerId: "achiya" },
      ];

      const mockRepository = require("./Books.repository").default;
      mockRepository.getBooks = jest.fn().mockResolvedValue(mockBooks);

      await booksController.switchViewMode(ViewMode.ALL);

      expect(mockBooksStore.setViewMode).toHaveBeenCalledWith(ViewMode.ALL);
      expect(mockRepository.getBooks).toHaveBeenCalled();
      expect(mockBooksStore.setBooks).toHaveBeenCalledWith(mockBooks);
    });

    it("should switch to PRIVATE mode and load private books", async () => {
      const mockPrivateBooks: Book[] = [
        {
          id: 1,
          name: "Private Book",
          author: "Private Author",
          ownerId: "achiya",
        },
      ];

      const mockRepository = require("./Books.repository").default;
      mockRepository.getPrivateBooks = jest
        .fn()
        .mockResolvedValue(mockPrivateBooks);

      await booksController.switchViewMode(ViewMode.PRIVATE);

      expect(mockBooksStore.setViewMode).toHaveBeenCalledWith(ViewMode.PRIVATE);
      expect(mockRepository.getPrivateBooks).toHaveBeenCalled();
      expect(mockBooksStore.setBooks).toHaveBeenCalledWith(mockPrivateBooks);
    });

    it("should handle errors when switching to ALL mode", async () => {
      const mockRepository = require("./Books.repository").default;
      mockRepository.getBooks = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));

      await expect(
        booksController.switchViewMode(ViewMode.ALL)
      ).rejects.toThrow("Database error");
      expect(mockBooksStore.setViewMode).toHaveBeenCalledWith(ViewMode.ALL);
      expect(mockRepository.getBooks).toHaveBeenCalled();
      expect(mockBooksStore.setBooks).not.toHaveBeenCalled();
    });

    it("should handle errors when switching to PRIVATE mode", async () => {
      const mockRepository = require("./Books.repository").default;
      mockRepository.getPrivateBooks = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));

      await expect(
        booksController.switchViewMode(ViewMode.PRIVATE)
      ).rejects.toThrow("Database error");
      expect(mockBooksStore.setViewMode).toHaveBeenCalledWith(ViewMode.PRIVATE);
      expect(mockRepository.getPrivateBooks).toHaveBeenCalled();
      expect(mockBooksStore.setBooks).not.toHaveBeenCalled();
    });
  });

  describe("addBook", () => {
    it("should add book successfully and update store", async () => {
      const mockRepository = require("./Books.repository").default;
      mockRepository.addBook = jest.fn().mockResolvedValue(true);

      await booksController.addBook();

      expect(mockRepository.addBook).toHaveBeenCalledWith({
        name: "Demo Book",
        author: "Demo Author",
        ownerId: "achiya",
      });
      expect(mockBooksStore.setBooks).toHaveBeenCalled();
    });

    it("should not update store when book addition fails", async () => {
      const mockRepository = require("./Books.repository").default;
      mockRepository.addBook = jest.fn().mockResolvedValue(false);

      await booksController.addBook();

      expect(mockRepository.addBook).toHaveBeenCalled();
      expect(mockBooksStore.setBooks).not.toHaveBeenCalled();
    });

    it("should handle repository errors gracefully", async () => {
      const mockRepository = require("./Books.repository").default;
      mockRepository.addBook = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));

      await expect(booksController.addBook()).rejects.toThrow("Database error");
      expect(mockRepository.addBook).toHaveBeenCalled();
      expect(mockBooksStore.setBooks).not.toHaveBeenCalled();
    });

    it("should preserve existing books when adding new book", async () => {
      const existingBooks: Book[] = [
        {
          id: 1,
          name: "Existing Book",
          author: "Existing Author",
          ownerId: "achiya",
        },
      ];
      mockBooksStore.books = existingBooks;

      const mockRepository = require("./Books.repository").default;
      mockRepository.addBook = jest.fn().mockResolvedValue(true);

      await booksController.addBook();

      expect(mockBooksStore.setBooks).toHaveBeenCalledWith([
        ...existingBooks,
        { name: "Demo Book", author: "Demo Author", ownerId: "achiya" },
      ]);
    });
  });

  describe("integration scenarios", () => {
    it("should handle multiple operations in sequence", async () => {
      const mockRepository = require("./Books.repository").default;
      mockRepository.getBooks = jest.fn().mockResolvedValue([]);
      mockRepository.getPrivateBooks = jest.fn().mockResolvedValue([]);
      mockRepository.addBook = jest.fn().mockResolvedValue(true);

      // Load all books
      await booksController.loadBooks();
      expect(mockRepository.getBooks).toHaveBeenCalledTimes(1);

      // Switch to private view
      await booksController.switchViewMode(ViewMode.PRIVATE);
      expect(mockRepository.getPrivateBooks).toHaveBeenCalledTimes(1);

      // Add a book
      await booksController.addBook();
      expect(mockRepository.addBook).toHaveBeenCalledTimes(1);

      // Switch back to all view
      await booksController.switchViewMode(ViewMode.ALL);
      expect(mockRepository.getBooks).toHaveBeenCalledTimes(2);
    });
  });
});
