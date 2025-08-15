import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";

import "./styles.css";
import BooksView from "./Books/Books.view";

function App(): React.ReactElement {
  return (
    <>
      <BooksView />
    </>
  );
}

const ObservedApp = observer(App);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.render(<ObservedApp />, rootElement);
}
