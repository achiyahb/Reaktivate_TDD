import React from "react";
import { observer } from "mobx-react";
import { useBooks } from "../Books/Books.module";

const Header: React.FC = () => {
  const { privateBooksCount } = useBooks();
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">Reaktivate</h1>
        <div className="private-books-counter">
          Your books: {privateBooksCount}
        </div>
      </div>
    </header>
  );
};

export default observer(Header);
