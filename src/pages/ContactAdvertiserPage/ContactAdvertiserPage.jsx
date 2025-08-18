import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./ContactAdvertiserPage.module.css";
import { AdvertisementAPI } from "../../services/AdvertisementAPI";
import toast from "react-hot-toast";

export default function ContactAdvertiserPage() {
  const { advertisementId } = useParams();
  const [advertiser, setAdvertiser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdvertiser() {
      try {
        setLoading(true);
        const data = await AdvertisementAPI.getAdvertiserByAdvertisementId(advertisementId);
        setAdvertiser(data);
      } catch (err) {
        toast.error(err.message || "Erro ao buscar anunciante.");
        console.error("Erro ao buscar anunciante:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAdvertiser();
  }, [advertisementId]);

  if (loading) return <p>Carregando...</p>;

  if (!advertiser) return <p>Anunciante não encontrado.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Contato do Anunciante</h2>
        <p>
          <strong>Nome:</strong> {advertiser.fullName}
        </p>
        <p>
          <strong>Telefone:</strong>{" "}
          <a
            href={`https://wa.me/${advertiser.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.phoneLink}
          >
            {advertiser.phone}
          </a>
        </p>
      </div>
    </div>
  );
}