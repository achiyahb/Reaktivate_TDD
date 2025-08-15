import React from "react";
import { observer } from "mobx-react";
import { useBooks } from "./Books.module";
import { ViewMode } from "../Shared/enums/ViewMode.enum";

const BooksView: React.FC = observer(() => {
  const { books, viewMode, addBook, switchViewMode } = useBooks();

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            name="viewMode"
            value={ViewMode.ALL}
            checked={viewMode === ViewMode.ALL}
            onChange={() => switchViewMode(ViewMode.ALL)}
          />
          All Books
        </label>
        <label>
          <input
            type="radio"
            name="viewMode"
            value={ViewMode.PRIVATE}
            checked={viewMode === ViewMode.PRIVATE}
            onChange={() => switchViewMode(ViewMode.PRIVATE)}
          />
          Private Books
        </label>
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
