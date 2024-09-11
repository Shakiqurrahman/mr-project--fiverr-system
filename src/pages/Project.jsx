import React, { useState } from "react";
import FlipMove from "react-flip-move";
import { FaCheck, FaTimes } from 'react-icons/fa'; // Icons for check and cross

const ReorderableProducts = () => {
  const initialProducts = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
    { id: 4, name: "Product 4" },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [tempProducts, setTempProducts] = useState([...products]); 
  console.log('updated',products);
  
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (index) => {
    if (index !== draggedIndex) {
      const updatedProducts = [...tempProducts];
      const draggedProduct = updatedProducts[draggedIndex];
      updatedProducts.splice(draggedIndex, 1);
      updatedProducts.splice(index, 0, draggedProduct);
      setTempProducts(updatedProducts);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleCustomize = () => {
    setIsCustomizing(true);
  };

  const handleSave = () => {
    setProducts(tempProducts); // Save the reordered products
    setIsCustomizing(false);
  };

  const handleCancel = () => {
    setTempProducts([...products]); // Reset to original order
    setIsCustomizing(false);
  };

  return (
    <div className="mx-auto my-20 max-w-[400px]">
      <button
        onClick={handleCustomize}
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Customize
      </button>

      {isCustomizing && (
        <div className="mb-4 flex justify-between">
          <button
            onClick={handleSave}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            <FaCheck />
          </button>
          <button
            onClick={handleCancel}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            <FaTimes />
          </button>
        </div>
      )}

      <FlipMove className="flex flex-col gap-4">
        {tempProducts.map((product, index) => (
          <div
            key={product.id}
            draggable={isCustomizing} // Only draggable when customizing is enabled
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            className={`cursor-move rounded-md border bg-white p-4 shadow-md ${
              draggedIndex === index ? "bg-gray-200" : "hover:bg-gray-50"
            }`}
          >
            {product.name}
          </div>
        ))}
      </FlipMove>
    </div>
  );
};

export default ReorderableProducts;
