import styles from "./SimpleAdvertisementCard.module.css";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { AdvertisementAPI } from "../../services/AdvertisementAPI";
import toast from "react-hot-toast";

function SimpleAdvertisementCard({
  id,
  creationTime,
  products,
  onEdit,
  onDelete,
  isOwner = false,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!onDelete) return;
    try {
      setLoading(true);
      await AdvertisementAPI.delete(id);
      toast.success("Anúncio deletado com sucesso!");
      onDelete(id);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.userAdvertisementCard}>
      {isOwner && (
        <div className={styles.cardHeader}>
          <button
            className={styles.advertisementDropdown}
            onClick={() => setShowMenu((prev) => !prev)}
            aria-label="Abrir menu de opções"
            disabled={loading}
          >
            <MoreVertical />
          </button>

          {showMenu && (
            <div className={styles.dropdownMenu}>
              {onEdit && (
                <button
                  className={styles.dropdownMenuButton}
                  onClick={onEdit}
                  disabled={loading}
                >
                  Editar
                </button>
              )}
              {onDelete && (
                <button
                  className={styles.dropdownMenuButton}
                  onClick={handleDelete}
                  disabled={loading}
                >
                  Excluir
                </button>
              )}
            </div>
          )}
        </div>
      )}

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

      {!isOwner && (
        <div className={styles.contactButtonWrapper}>
          <button
            className={styles.contactButton}
            onClick={() => navigate(`/contact/${id}`)}
          >
            Contatar Anunciante
          </button>
        </div>
      )}
    </div>
  );
}

export default SimpleAdvertisementCard;