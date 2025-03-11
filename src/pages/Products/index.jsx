import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useGlobalContext } from "../../context/useGlobalContext";

import "./index.css";
const categories = [
  {
    name: "All",
    categoryName: "",
  },
  {
    name: "electronics",
    categoryName: "electronics",
  },
  {
    name: "jewelery",
    categoryName: "jewelery",
  },
  {
    name: "men's clothing",
    categoryName: "men's clothing",
  },
  {
    name: "women's clothing",
    categoryName: "women's clothing",
  },
];

const Products = () => {
  const { cartList, setCartList, removeProductItem } = useGlobalContext();
  const [categorys, setcategorys] = useState("");
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  });

  const navigator = useNavigate();
  const makeApiCall = async () => {
    const api =
      categorys === ""
        ? `https://fakestoreapi.com/products`
        : `https://fakestoreapi.com/products/category/${categorys}`;

    const options = {
      method: "GET",
    };
    const response = await fetch(api, options);
    if (response.ok) {
      const data = await response.json();
      const filterData =
        categorys === ""
          ? data
          : data.filter((each) => each.category === categorys);
      setCartList(filterData);
      // console.log(filterData);
    }
  };
  useEffect(() => {
    makeApiCall();
  }, [categorys]);
  const categoriesValue = (event) => {
    setcategorys(event.target.value);
  };
  const addNewProduct = () => {
    if (!newProduct.title || !newProduct.price) {
      alert("Title and Price are required!");
      return;
    }

    const productToAdd = {
      ...newProduct,
      id: cartList.length + 1, // Generate a unique ID
    };

    setCartList([...cartList, productToAdd]); // Update cartList with new product
    setNewProduct({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    });
  };

  return (
    <>
      <select onChange={categoriesValue}>
        {categories.map((each) => (
          <option key={each.name} value={each.categoryName}>
            {each.name}
          </option>
        ))}
      </select>
      <div>
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        />
        <button onClick={addNewProduct}>Add Product</button>
      </div>
      <div>
        <div>
          {cartList.length > 0 ? (
            <ul className="productListContainer">
              {cartList.map((product, index) => (
                <div key={index} className="productItem">
                  <Link className="link" to={`/productDetails/${product.id}`}>
                    <img className="productImage" src={product.image} />
                    <p>{product.title}</p>
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeProductItem(product.id)}
                  >
                    delete
                  </button>
                </div>
              ))}
            </ul>
          ) : (
            <h1>ntg</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
