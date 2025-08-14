import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
// import { observer } from "mobx-react";

import "./styles.css";
import booksRepository from "./Books/Books.repository";

interface Book {
  author: string;
  name: string;
}

function App(): React.ReactElement {
  const [list, setList] = useState<Book[]>([]);

  useEffect(() => {
    async function load(): Promise<void> {
      const books = await booksRepository.getBooks();
      setList(books);
    }
    load();
  }, []);

  return (
    <div>
      {list.map((book, i) => (
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
}

const ObservedApp = App;

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.render(<ObservedApp />, rootElement);
}
