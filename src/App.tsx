import React from "react";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Pages";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer />
      <HomePage />
    </div>
  );
}

export default App;
