import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products, onEdit, onDelete, showMenuOptions, showTrashButton, showCheckBox, selectedProducts, toggleProductSelection }) {
  return (
    <div className="card-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
          onEdit={onEdit}
          showMenuOptions={showMenuOptions}
          showTrashButton={showTrashButton}
          showCheckBox={showCheckBox}
          selectedProducts={selectedProducts}
          toggleProductSelection={toggleProductSelection}
        />
      ))}
    </div>
  );
}

export default ProductList;