import AdvertisementForm from "../../components/AdvertisementForm/AdvertisementForm.jsx";
import { AdvertisementAPI } from "../../services/AdvertisementAPI";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./AdvertisementFormPage.module.css";

export function AdvertisementFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [advertisement, setAdvertisement] = useState({
    description: "",
    products: [],
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    if (id) {
      loadAdvertisement();
    }
  }, [id]);

  async function loadAdvertisement() {
    try {
      const data = await AdvertisementAPI.getById(id);
      setAdvertisement(data);
    } catch (error) {
      toast.error("Erro ao carregar anúncio.");
      console.error(error);
    }
  }

  async function handleUpdate(id, newAdvertisement) {
    try {
      if (id) {
        await AdvertisementAPI.update(id, newAdvertisement);
      } else {
        await AdvertisementAPI.create(newAdvertisement);
      }
      navigate("..", { replace: true });
    } catch (error) {
      toast.error("Erro ao salvar anúncio.");
      console.error(error.message);
    }
  }

  return (
    <div className={styles.advertisementsPageContainer}>
      <div className={styles.advertisementEdition}>
        <h1>Formulário de Anúncio</h1>
        <AdvertisementForm
          advertisement={advertisement}
          onUpdate={handleUpdate}
          isNew={!id}
        />
      </div>
    </div>
  );
}