import styles from "./SimpleAdvertisementCard.module.css";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

function SimpleAdvertisementCard({
  id,
  creationTime,
  itemsCount,
  description,
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
        >
          <MoreVertical />
        </button>

        {showMenu && (
          <div className={styles.dropdownMenu}>
            <button onClick={onEdit}>Editar</button>
            <button onClick={() => onDelete(id)}>Excluir</button>
          </div>
        )}

        <h2>Anúncio {id}</h2>
        <p>Criado em {creationTime}</p>
      </div>

      <div className={styles.cardSubinfo}>
        <p>Quantidade de itens no anúncio: {itemsCount}</p>
      </div>

      <p>Descrição: {description}</p>
    </div>
  );
}

export default SimpleAdvertisementCard;