import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from './Modal';

const ProductAdd = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [productAdded, setProductAdded] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://dummyjson.com/products/add',
      { name,price });
      console.log('Product added successfully:', response.data);
      setProductAdded(true);
      setIsModalOpen(true)
    } catch (err) {
      console.error('Error adding product:', err.response ? err.response.data : err.message);
      setError('Error adding product');
      setIsModalOpen(true)
    }
  };

  const closeModal = ()=>{
    setIsModalOpen(false);
    setProductAdded(false);
    setError('');
  }

  return (
    <div className="flex items-center justify-center mt-6 p-7 m-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="text-white text-center  mt-7 space-y-6 w-full max-w-sm">
        <h2 className="text-2xl mb-6">Add Product</h2>
        <div className="flex flex-col items-start">
          <div className='text-black mb-2'>Name:</div>
          <input
            className="w-full p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col items-start mt-4">
          <label className="text-black mb-2">Price:</label>
          <input
            className="w-full p-2 border text-black border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 w-full"
        >
          Add Product
        </Button>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={productAdded ? 'Success' : 'Error'}
        message={productAdded ? 'Product Added Successfully!' : error}
      />
        
    </div>
  );
};

export default ProductAdd;
