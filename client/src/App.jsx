import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import AllRoutes from "./components/allRoutes";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
