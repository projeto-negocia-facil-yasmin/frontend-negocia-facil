import React, { useState } from "react";
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
    category,
    forExchange,
    description,
    imageUrl,
  } = product;

  const [menuOpen, setMenuOpen] = useState(false);

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

            {showMenuOptions && (
              <div className={styles.menuContainer}>
                <button
                  className={styles.menuButton}
                  onClick={() => setMenuOpen((prev) => !prev)}
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
          <span className={styles.qty}>qtd:{quantity}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.category}>{category}</span>
          <span className={styles.exchange}>{forExchange ? "Troca" : "Venda"}</span>
        </div>

        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

export default ProductCard;