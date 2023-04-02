import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./Screen/Home";
import Products from "./Screen/Products";
import Login from "./Screen/Login";
import Inventory from "./Admin/Inventory";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Inventory" element={<Inventory />} />
      </Routes>
    </div>
  );
}

export default App;
