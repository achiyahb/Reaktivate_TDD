import React from "react";
import { observer } from "mobx-react";
import { useBooks } from "./Books.service";

const BooksView: React.FC = observer(() => {
  const { books, addBook } = useBooks();

  return (
    <div>
      {books.map((book, i) => (
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
