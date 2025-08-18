import AdvertisementForm from "../../components/AdvertisementForm/AdvertisementForm.jsx";
import { AdvertisementAPI } from "../../services/AdvertisementAPI";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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
    if (id) loadAdvertisement();
  }, [id]);

  async function loadAdvertisement() {
    try {
      const data = await AdvertisementAPI.getById(id);
      setAdvertisement(data);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }

  async function handleUpdate(id, newAdvertisement) {
    try {
      if (id) {
        await AdvertisementAPI.update(id, newAdvertisement);
        toast.success("Anúncio atualizado com sucesso!");
      } else {
        await AdvertisementAPI.create(newAdvertisement);
        toast.success("Anúncio criado com sucesso!");
      }
      navigate("..", { replace: true });
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }

  return (
    <div className={styles.advertisementsPageContainer}>
      <div className={styles.advertisementEdition}>
        <AdvertisementForm
          advertisement={advertisement}
          onUpdate={handleUpdate}
          isNew={!id}
        />
      </div>
    </div>
  );
}