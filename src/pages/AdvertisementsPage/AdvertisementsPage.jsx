import { useState, useEffect } from "react";
import { AdvertisementAPI } from "../../services/AdvertisementAPI.js";
import { CategoryAPI } from "../../services/CategoryAPI.js";
import SimpleAdvertisementCard from "../../components/SimpleAdvertisementCard/SimpleAdvertisementCard.jsx";
import styles from "./AdvertisementsPage.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import toast from "react-hot-toast";
import { getUserId } from "../../utils/auth.js";

function AdvertisementsPage() {
  const navigate = useNavigate();
  const userId = getUserId();
  const [advertisements, setAdvertisements] = useState([]);
  const [allAdvertisements, setAllAdvertisements] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    loadAdvertisements();
    loadCategories();
  }, []);

  async function loadAdvertisements() {
    try {
      const data = await AdvertisementAPI.getAll();
      setAdvertisements(data);
      setAllAdvertisements(data);
    } catch (err) {
      toast.error("Erro ao carregar anúncios.");
      console.error(err);
    }
  }

  async function loadCategories() {
    try {
      const data = await CategoryAPI.getAll();
      setCategories(data);
    } catch (err) {
      toast.error("Erro ao carregar categorias.");
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

  function applyFilters() {
    if (selectedCategories.length === 0) {
      setAdvertisements(allAdvertisements);
    } else {
      const filtered = allAdvertisements.filter((ad) =>
        ad.products.some((p) => selectedCategories.includes(p.categoryId))
      );
      setAdvertisements(filtered);
    }
    setFilterOpen(false);
  }

  return (
    <div className={styles.advertisementsPageContainer}>
      <div className={styles.advertisementsPage}>
        <div className={styles.headerRow}>
          <button
            className={styles.filterButton}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            Filtrar
          </button>
        </div>

        {filterOpen && (
          <div className={styles.filterDropdown}>
            <ul>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <label>
                    <input
                      type="checkbox"
                      value={cat.id}
                      checked={selectedCategories.includes(cat.id)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setSelectedCategories((prev) =>
                          checked
                            ? [...prev, cat.id]
                            : prev.filter((id) => id !== cat.id)
                        );
                      }}
                    />
                    {cat.name}
                  </label>
                </li>
              ))}
            </ul>
            <button onClick={applyFilters}>Aplicar filtros</button>
          </div>
        )}

        {advertisements.length === 0 ? (
          <p>Nenhum anúncio encontrado.</p>
        ) : (
          <div className={styles.advertisementsList}>
            {advertisements.map((ad) => {
              const isOwner = userId === ad.advertiser?.id;

              return (
                <SimpleAdvertisementCard
                  key={ad.id}
                  id={ad.id}
                  creationTime={new Date(ad.createdAt).toLocaleDateString("pt-BR")}
                  products={ad.products}
                  onDelete={isOwner ? () => handleDelete(ad.id) : undefined}
                  onEdit={isOwner ? () => handleEdit(ad.id) : undefined}
                  isOwner={isOwner}
                />
              );
            })}
          </div>
        )}

        <Button text={"Novo anúncio"} action={handleNewAdvertisement} />
      </div>
    </div>
  );
}

export default AdvertisementsPage;