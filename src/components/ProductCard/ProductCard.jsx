import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CategoryAPI } from "../../services/CategoryAPI";
import styles from "./ProductCard.module.css";

function ProductCard({
  product,
  onEdit,
  onDelete,
  showMenuOptions = true,
  showTrashButton = true,
  showCheckBox = false,
  selected = false,
  toggleSelection,
}) {
  const {
    title,
    price,
    quantity,
    categoryId,
    forExchange,
    description,
    imageUrl,
  } = product;

  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const location = useLocation();
  const isAdvertisementPage = location.pathname.includes("/advertisement");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await CategoryAPI.getAll();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error(error.message || "Erro ao carregar categorias");
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  const categoryObj = categories.find((c) => c.id === categoryId);
  const categoryName = categoryObj ? categoryObj.name : "Sem categoria";

  return (
    <div className={styles.card}>
      {imageUrl && <img src={imageUrl} className={styles.thumb} alt={title} />}

      <div className={styles.body}>
        <div className={styles.topRow}>
          <h3 className={styles.topRowTitle}>{title}</h3>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {showCheckBox && (
              <input
                type="checkbox"
                checked={selected}
                onChange={toggleSelection}
              />
            )}

            {showMenuOptions && !isAdvertisementPage && (
              <div className={styles.menuContainer}>
                <button
                  className={styles.menuButton}
                  onClick={() => setMenuOpen((prev) => !prev)}
                  aria-label="Abrir menu de opções"
                >
                  ⋮
                </button>

                {menuOpen && (
                  <div className={styles.dropdownMenu}>
                    <button onClick={() => onEdit && onEdit(product)}>
                      Editar
                    </button>
                    <button onClick={() => onDelete && onDelete(product.id)}>
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            )}

            {!showMenuOptions && showTrashButton && (
              <button onClick={() => onDelete && onDelete(product.id)}>🗑</button>
            )}
          </div>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.price}>
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <span className={styles.qty}>qtd: {quantity}</span>
        </div>

        <div className={styles.infoRow}>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <span className={styles.category}>{categoryName}</span>
            <span className={styles.exchange}>
              {forExchange ? "Troca" : "Venda"}
            </span>
          </div>
        </div>

        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

export default ProductCard;