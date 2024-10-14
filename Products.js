import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbars from './Navbars';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Products = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state)=>state.auth.user)

  const getAllProductList = async () => {
    setIsLoading(true);
    const response = await axios.get('https://dummyjson.com/products');
    setProduct(response.data.products);
    setIsLoading(false);
  };

  useEffect(() => {
    if(user){
      getAllProductList()
    };
  }, [user]);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Navbars />
      <div className="flex-col font-bold text-center mt-4">
        {/* <h1>Product List</h1> */}
        <Link
          to="/addproducts"
          variant="primary"
          className="col-lg-2 bg-blue-500 text-white py-2 px-4 rounded" 
        >
          Add Product
        </Link>
        {/* {isLoading && <div>Loading...</div>} */}
        <div className="grid grid-cols-3 gap-6 p-4">
          {product.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-md flex flex-col items-center">
              <img src={product.thumbnail} alt={product.title} className="w-48 h-48 object-cover mb-4" />
              <span className="font-semibold">Name: {product.title}</span>
              <span className="text-gray-600 font-semibold">Price: ${product.price}</span>
              <Button variant="primary" className="mt-2">View Details</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
