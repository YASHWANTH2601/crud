// import { useEffect, useState } from "react";
// import { useGlobalContext } from "../../context/useGlobalContext";
// import { useParams } from "react-router-dom";
// const EditItem = () => {
//   const { cartList, setCartList } = useGlobalContext();
//   const { id } = useParams();
//   const [item, setItem] = useState({});
//   const [edit, setEdit] = useState({
//     title: "",
//     price: "",
//     description: "",
//     category: "",
//   });
//   useEffect(() => {
//     fetch(`https://fakestoreapi.com/products/${id}`)
//       .then((response) => response.json())
//       .then((json) => {
//         setItem(json);
//         setEdit(json);
//       });
//   }, [id]);

//   const submited = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(item),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update product");
//       }

//       const updatedProduct = await response.json();

//       // Update cartList with the new product details
//       const updatedCartList = cartList.map((product) =>
//         product.id === updatedProduct.id ? updatedProduct : product
//       );

//       setCartList(updatedCartList);
//       console.log("Updated cartList:", updatedCartList);
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };

//   const handleChange = (e) => {
//     // setEdit({
//     //   ...edit,
//     //   [e.target.name]: e.target.value,
//     // });
//     setItem({
//       ...item,
//       [e.target.name]: e.target.value,
//     });
//     console.log(item);
//   };
//   return (
//     <div>
//       <h1>EditItem</h1>
//       <form onSubmit={submited}>
//         <label>title</label>{" "}
//         <input
//           type="text"
//           name="title"
//           value={item.title}
//           onChange={handleChange}
//         />
//         <label>price</label>
//         <input
//           type="text"
//           name="price"
//           value={item.price}
//           onChange={handleChange}
//         />
//         <label>description</label>
//         <input
//           type="text"
//           name="description"
//           value={item.description}
//           onChange={handleChange}
//         />
//         <label>category</label>
//         <input
//           type="text"
//           name="category"
//           value={item.category}
//           onChange={handleChange}
//         />
//         <button type="submit">update</button>
//       </form>
//     </div>
//   );
// };

// export default EditItem;

import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/useGlobalContext";
import { useParams } from "react-router-dom";

const EditItem = () => {
  const { cartList, setCartList } = useGlobalContext();
  const { id } = useParams();
  const [edit, setEdit] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setEdit(json);
      });
  }, [id]);

  const submited = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(edit),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();

      // Update cartList properly
      const updatedCartList = cartList.map((product) =>
        product.id === parseInt(id) ? updatedProduct : product
      );

      setCartList(updatedCartList);
      console.log("Updated cartList:", updatedCartList);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleChange = (e) => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Edit Item</h1>
      <form onSubmit={submited}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={edit.title}
          placeholder="Title"
          onChange={handleChange}
        />

        <label>Price</label>
        <input
          type="text"
          name="price"
          value={edit.price}
          placeholder="Price"
          onChange={handleChange}
        />

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={edit.description}
          placeholder="Description"
          onChange={handleChange}
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={edit.category}
          placeholder="Category"
          onChange={handleChange}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditItem;
