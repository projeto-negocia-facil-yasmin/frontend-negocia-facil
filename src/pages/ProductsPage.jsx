import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductControls from "../components/ProductsControls/ProductControls";
import ProductForm from "../components/ProductForm/ProductForm";
import ProductList from "../components/ProductList/ProductList";
import { ProductAPI } from "../services/ProductAPI";
import "../App.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await ProductAPI.getAll();
      console.log("raw products payload:", data);

      let resolved = [];
      if (Array.isArray(data)) {
        resolved = data;
      } else if (data && Array.isArray(data.content)) {
        resolved = data.content;
      } else {
        console.warn("Formato inesperado de produtos recebido:", data);
      }

      setProducts(resolved);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleCreate = async (product) => {
    try {
      const newProduct = await ProductAPI.create(product);
      setProducts((prev) => [...prev, newProduct]);
      setShowForm(false);
      setEditingProduct(null);
      toast.dismiss();
      toast.success("Produto criado com sucesso!");
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  const handleUpdate = async (product) => {
    try {
      const updatedProduct = await ProductAPI.update(product.id, product);
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      setShowForm(false);
      setEditingProduct(null);
      toast.dismiss();
      toast.success("Produto atualizado com sucesso!");
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Deseja excluir este produto?");
    if (!confirm) return;

    try {
      await ProductAPI.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.dismiss();
      toast.success("Produto removido com sucesso!");
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const filtered = Array.isArray(products)
    ? products.filter((p) =>
        (p.title || "").toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="main-content">
      {!showForm ? (
        <>
          <ProductControls
            searchValue={search}
            onSearchChange={setSearch}
            onAddClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
          />
          <ProductList
            products={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
            showMenuOptions={true}
            showTrashButton={false}
          />
        </>
      ) : (
        <ProductForm
          productToEdit={editingProduct}
          onSave={async (saved) => {
            await loadProducts();
            setShowForm(false);
            setEditingProduct(null);
          }}
          onCancel={handleCancel}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        limit={1}
      />
    </div>
  );
}

export default ProductsPage;