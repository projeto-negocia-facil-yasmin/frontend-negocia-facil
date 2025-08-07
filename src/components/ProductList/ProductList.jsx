import ProductCard from "../ProductCard/ProductCard";

function ProductList({
  products,
  onEdit,
  onDelete,
  showMenuOptions = true,
  showTrashButton = true,
  showCheckBox = false,
  selectedProducts = [],
  toggleProductSelection,
}) {
  return (
    <div className="card-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          showMenuOptions={showMenuOptions}
          showTrashButton={showTrashButton}
          showCheckBox={showCheckBox}
          selected={selectedProducts.some((p) => p.id === product.id)}
          toggleSelection={() => toggleProductSelection && toggleProductSelection(product)}
        />
      ))}
    </div>
  );
}

export default ProductList;