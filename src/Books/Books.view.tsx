import React, { useEffect } from "react";
import { useLocalObservable, observer } from "mobx-react";
import { BooksStore } from "./Books.store";
import { BooksController } from "./Books.controller";

const BooksView: React.FC = observer(() => {
  const booksStore = useLocalObservable(() => new BooksStore());

  useEffect(() => {
    const booksController = new BooksController(booksStore);
    booksController.loadBooks();
  }, []);

  return (
    <div>
      {booksStore.books.map((book, i) => (
        <div key={i}>
          {book.author}: {book.name}
        </div>
      ))}
      <button
        onClick={() => {
          alert("TBD");
        }}
      >
        Add
      </button>
    </div>
  );
});

export default BooksView;
