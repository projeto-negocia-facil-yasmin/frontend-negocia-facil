import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ContactAdvertiserPage.module.css";

export default function ContactAdvertiserPage() {
  const { advertisementId } = useParams();
  const [advertiser, setAdvertiser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdvertiser() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8080/api/v1/advertisements/${advertisementId}/advertiser`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );
        setAdvertiser(res.data);
      } catch (err) {
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