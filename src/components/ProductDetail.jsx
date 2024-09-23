// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { items } from "./Data";
// import Product from "./Product";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ProductDetail = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const [product, setProduct] = useState({});
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   useEffect(() => {
//     // Find the current product by ID
//     const currentProduct = items.find((item) => item.id == id);
//     setProduct(currentProduct);

//     if (currentProduct) {
//       // Filter related products based on category
//       const related = items.filter(
//         (item) => item.category === currentProduct.category && item.id !== currentProduct.id
//       );
//       setRelatedProducts(related);
//     }
//   }, [id]);

//   const addToCart = (product) => {
//     const itemExists = cart.some((item) => item.id === product.id);
//     if (!itemExists) {
//       setCart([...cart, product]);
//       toast.success("Item added to cart", {
//         position: "top-right",
//         autoClose: 1500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     } else {
//       toast.info("Item already in cart", {
//         position: "top-right",
//         autoClose: 1500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     }
//   };

//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={1500}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
//       <div className="container con">
//         <div className="img">
//           <img src={product.imgSrc} alt={product.title} />
//         </div>
//         <div className="text-center">
//           <h1 className="card-title">{product.title}</h1>
//           <p className="card-text">{product.description}</p>
//           <button className="btn btn-primary mx-3">{product.price} ₹</button>
//           <button
//             onClick={() => addToCart(product)}
//             className="btn btn-warning"
//           >
//             Add To Cart
//           </button>
//         </div>
//       </div>
//       <h1 className="text-center">Related Products</h1>
//       <Product cart={cart} setCart={setCart} items={relatedProducts} />
//     </>
//   );
// };

// export default ProductDetail;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { items } from './Data';
import Product from './Product';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = ({ cart, setCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const foundProduct = items.find((item) => item.id === parseInt(id));
    setProduct(foundProduct);

    if (foundProduct) {
      const related = items.filter(item => item.category === foundProduct.category);
      setRelatedProducts(related);
    }
  }, [id]);

  const addToCart = (id, price, title, description, imgSrc) => {
    const obj = { id, price, title, description, imgSrc };
    setCart([...cart, obj]);
    toast.success('Item added to cart', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <div className="container con">
        <div className="img">
          <img src={product.imgSrc} alt={product.title} />
        </div>
        <div className="text-center">
          <h1 className="card-title">{product.title}</h1>
          <p className="card-text">{product.description}</p>
          <button className="btn btn-primary mx-3">{product.price} ₹</button>
          <button
            onClick={() =>
              addToCart(
                product.id,
                product.price,
                product.title,
                product.description,
                product.imgSrc
              )
            }
            className="btn btn-warning"
          >
            Add To Cart
          </button>
        </div>
      </div>
      <h1 className="text-center">Related Products</h1>
      {relatedProducts.length > 0 ? (
        <Product cart={cart} setCart={setCart} items={relatedProducts} />
      ) : (
        <p>No related products available.</p>
      )}
    </>
  );
};

export default ProductDetail;

