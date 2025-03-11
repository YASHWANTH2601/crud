import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Products from "./pages/Products";
import { GlobalProvider } from "./context/useGlobalContext";
import EditItem from "./pages/EditItem";
import React, { Component } from "react";
import ProductItem from "./pages/ProductItem";

class App extends Component {
  render() {
    return (
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/productDetails/:id" element={<ProductItem />} />
            <Route path="/edit/:id" element={<EditItem />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    );
  }
}

export default App;
