import styles from "./SimpleAdvertisementCard.module.css";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

function SimpleAdvertisementCard({
  id,
  creationTime,
  products,
  onEdit,
  onDelete,
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.userAdvertisementCard}>
      <div className={styles.cardHeader}>
        <button
          className={styles.advertisementDropdown}
          onClick={() => setShowMenu((prev) => !prev)}
          aria-label="Abrir menu de opções"
        >
          <MoreVertical />
        </button>

        {showMenu && (
          <div className={styles.dropdownMenu}>
            <button className={styles.dropdownMenuButton} onClick={onEdit}>Editar</button>
            <button className={styles.dropdownMenuButton} onClick={() => onDelete(id)}>Excluir</button>
          </div>
        )}
      </div>

      <div className={styles.productsContainer}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showTrashButton={false}
              showCheckBox={false}
            />
          ))
        ) : (
          <p className={styles.noProductsText}>Nenhum produto nesse anúncio.</p>
        )}
      </div>

      <p className={styles.creationTime}>
        Criado em <time dateTime={creationTime}>{creationTime}</time>
      </p>
    </div>
  );
}

export default SimpleAdvertisementCard;