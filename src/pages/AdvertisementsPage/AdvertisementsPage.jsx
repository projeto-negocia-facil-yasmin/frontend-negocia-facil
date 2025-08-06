import { useState, useEffect } from "react";
import { AdvertisementAPI } from "../../services/AdvertisementAPI.js";
import SimpleAdvertisementCard from "../../components/SimpleAdvertisementCard/SimpleAdvertisementCard.jsx";
import styles from "./AdvertisementsPage.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import toast from "react-hot-toast";

function AdvertisementsPage() {
  const navigate = useNavigate();

  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    loadAdvertisements();
  }, []);

  async function loadAdvertisements() {
    try {
      const data = await AdvertisementAPI.getAll();
      setAdvertisements(data);
    } catch (err) {
      toast.error("Erro ao carregar anúncios.");
      console.error(err);
    }
  }

  const handleDelete = async (id) => {
    try {
      await AdvertisementAPI.delete(id);
      await loadAdvertisements();
      toast.success("Anúncio deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar anúncio.");
      console.error(error.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`${id}`);
  };

  const handleNewAdvertisement = () => {
    navigate("new");
  };

  return (
    <div className={styles.advertisementsPageContainer}>
      <div className={styles.advertisementsPage}>
        {advertisements.length === 0 ? null : (
          <div className={styles.advertisementsList}>
            {advertisements.map((ad) => (
              <SimpleAdvertisementCard
                key={ad.id}
                id={ad.id}
                creationTime={new Date(ad.createdAt).toLocaleDateString("pt-BR")}
                products={ad.products}
                onDelete={() => handleDelete(ad.id)}
                onEdit={() => handleEdit(ad.id)}
              />
            ))}
          </div>
        )}
        <Button text={"Novo anúncio"} action={handleNewAdvertisement} />
      </div>
    </div>
  );
}

export default AdvertisementsPage;