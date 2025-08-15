import React from "react";
import { observer } from "mobx-react";
import { useBooks } from "./Books.module";
import { ViewMode } from "../Shared/enums/ViewMode.enum";

const BooksView: React.FC = observer(() => {
  const { books, addBook, switchViewMode } = useBooks();

  return (
    <div>
      <div>
        <button onClick={() => switchViewMode(ViewMode.ALL)}>All Books</button>
        <button onClick={() => switchViewMode(ViewMode.PRIVATE)}>
          Private Books
        </button>
      </div>

      {books.map((book, i) => (
        <div key={i}>
          {book.author}: {book.name}
        </div>
      ))}
      <button
        onClick={() => {
          addBook();
        }}
      >
        Add
      </button>
    </div>
  );
});

export default BooksView;
