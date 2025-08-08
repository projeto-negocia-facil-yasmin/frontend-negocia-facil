import React, { useEffect, useState } from "react";
import ProductList from "../ProductList/ProductList";
import { ProductAPI } from "../../services/ProductAPI";
import styles from "./ProductSelection.module.css";

export function ProductSelection({ selectedProducts = [], onSelect }) {
  const [allProducts, setAllProducts] = useState([]);

  const safeSelected = Array.isArray(selectedProducts) ? selectedProducts : [];

  const availableProducts = Array.isArray(allProducts)
    ? allProducts.filter((product) => !safeSelected.some((p) => p.id === product.id))
    : [];

  useEffect(() => {
    loadAllProducts();
  }, []);

  async function loadAllProducts() {
    try {
      const data = await ProductAPI.getAll();
      console.log("Produtos retornados da API:", data);
      const productsArray = Array.isArray(data)
        ? data
        : Array.isArray(data.content)
        ? data.content
        : [];
      setAllProducts(productsArray);
    } catch (e) {
      console.error("Erro carregando produtos disponíveis", e);
      setAllProducts([]);
    }
  }

  const toggleProductSelection = (product) => {
    const alreadySelected = safeSelected.some((p) => p.id === product.id);
    const newSelection = alreadySelected
      ? safeSelected.filter((p) => p.id !== product.id)
      : [...safeSelected, product];
    onSelect(newSelection);
  };

  if (availableProducts.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <ProductList
        products={availableProducts}
        showMenuOptions={false}
        showTrashButton={false}
        showCheckBox={true}
        selectedProducts={safeSelected}
        toggleProductSelection={toggleProductSelection}
      />
    </div>
  );
}