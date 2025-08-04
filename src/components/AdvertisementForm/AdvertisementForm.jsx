import Button from "../Button/Button";
import ProductList from "../ProductList/ProductList";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductSelection } from "../ProductSelection/ProductSelection";
import styles from "./AdvertisementForm.module.css";

export default function AdvertisementForm({ advertisement, onUpdate, isNew }) {
  const navigate = useNavigate();
  const datetime = new Date(advertisement.createdAt);

  const [products, setProducts] = useState(advertisement.products || []);
  const [description, setDescription] = useState(advertisement.description || "");

  useEffect(() => {
    setProducts(advertisement.products || []);
    setDescription(advertisement.description || "");
  }, [advertisement]);

  async function updateAdvertisement(event) {
    event.preventDefault();
    if (products.length === 0) {
      alert("Adicione pelo menos um produto ao anúncio antes de salvar.");
      return;
    }
    const userId = products[0]?.userId;

    advertisement.description = description;
    advertisement.products = products;
    advertisement.advertiser = { id: userId };

    await onUpdate(advertisement.id, advertisement);
  }

  const removeProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className={styles.advertisementForm}>
      {!isNew && (
        <div>
          <p className={styles.paragraphText}>ID: {advertisement.id}</p>
          <p className={styles.paragraphText}>{datetime.toLocaleDateString("pt-BR")}</p>
          <p className={styles.paragraphText}>
            {datetime.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      )}

      <p className={styles.paragraphText}>Quantidade de itens no anúncio: {products.length}</p>

      <form className={styles.formDescription} onSubmit={updateAdvertisement}>
        <label htmlFor="description" className={styles.labelText}>Descrição:</label>
        <textarea
          id="description"
          name="description"
          className={styles.descriptionTextarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button type="submit" text="Salvar" />
      </form>

      {products.length > 0 ? (
        <div>
          <h3 className={styles.heading3}>Produtos anunciados</h3>
          <ProductList
            products={products}
            onDelete={removeProduct}
            showMenuOptions={false}
            showTrashButton={true}
            showCheckBox={false}
          />
        </div>
      ) : (
        <p className={styles.paragraphText}>Nenhum produto anunciado.</p>
      )}

      <ProductSelection selectedProducts={products} onSelect={setProducts} />
      <Button
        type="button"
        text="Cancelar"
        action={() => navigate("..", { replace: true })}
      />
    </div>
  );
}