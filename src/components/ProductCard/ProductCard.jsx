import React, { useState } from "react";
import "./ProductCard.css";

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
    <div className="card">
      {imageUrl && <img src={imageUrl} className="thumb" alt={title} />}

      <div className="body">
        <div className="top-row">
          <h3>{title}</h3>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {showCheckBox && (
              <input
                type="checkbox"
                checked={selected}
                onChange={toggleSelection}
              />
            )}

            {showMenuOptions && (
              <div className="menu-container">
                <button
                  className="menu-button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                >
                  ⋮
                </button>

                {menuOpen && (
                  <div className="dropdown-menu">
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
              <button onClick={() => onDelete && onDelete(product.id)}>
                🗑
              </button>
            )}
          </div>
        </div>

        <div className="info-row">
          <span className="price">
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <span className="qty">qtd:{quantity}</span>
        </div>

        <div className="info-row">
          <span className="category">{category}</span>
          <span className="exchange">{forExchange ? "Troca" : "Venda"}</span>
        </div>

        <p className="description">{description}</p>
      </div>
    </div>
  );
}

export default ProductCard;