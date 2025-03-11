import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "../../context/useGlobalContext";
import "./index.css";
const ProductItem = () => {
  const [item, setItem] = useState({});
  const navigator = useNavigate();
  const { cartList } = useGlobalContext();
  const { id } = useParams();
  useEffect(() => {
    // Check if the product exists in the cartList (updated data)
    const existingProduct = cartList.find(
      (product) => product.id === parseInt(id)
    );

    if (existingProduct) {
      setItem(existingProduct); // Use the updated product
    } else {
      // If not found in cartList, fetch from API
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((response) => response.json())
        .then((json) => {
          setItem(json);
        });
    }
  }, [id, cartList]);

  return (
    <div className="product">
      <img style={{ width: "200px" }} src={item.image} alt="" />
      <p>{item.title}</p>
      <p>Price: {item.price}</p>
      <p>{item.description}</p>
      <button onClick={() => navigator(`/edit/${item.id}`)}>edit</button>
    </div>
  );
};

export default ProductItem;
