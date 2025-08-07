import Button from "../Button/Button";
import ProductList from "../ProductList/ProductList";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductSelection } from "../ProductSelection/ProductSelection";
import styles from "./AdvertisementForm.module.css";
import toast from "react-hot-toast";

export default function AdvertisementForm({ advertisement, onUpdate, isNew }) {
  const navigate = useNavigate();
  const datetime = new Date(advertisement.createdAt);

  const [products, setProducts] = useState(advertisement.products || []);

  useEffect(() => {
    setProducts(advertisement.products || []);
  }, [advertisement]);

  async function updateAdvertisement(event) {
    event.preventDefault();
    if (products.length === 0) {
      toast.error("Adicione pelo menos um produto ao anúncio antes de salvar.");
      return;
    }
    const userId = products[0]?.userId;

    advertisement.products = products;
    advertisement.advertiser = { id: userId };

    try {
      await onUpdate(advertisement.id, advertisement);
      toast.success(isNew ? "Anúncio criado com sucesso!" : "Anúncio atualizado com sucesso!");
    } catch (err) {
      toast.error("Erro ao salvar anúncio.");
      console.error(err);
    }
  }

  const removeProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className={styles.advertisementForm}>
      {!isNew && (
        <div className={styles.infoSection}>
          <p>ID: {advertisement.id}</p>
          <p>
            {datetime.toLocaleDateString("pt-BR")} -{" "}
            {datetime.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      )}

      <p>
        Quantidade de itens no anúncio: <strong>{products.length}</strong>
      </p>

      <form onSubmit={updateAdvertisement}>
        <div className={styles.buttonGroup}>
          <Button
            type="button"
            text="Cancelar"
            action={() => navigate("..", { replace: true })}
          />
          <Button type="submit" text="Salvar" />
        </div>
      </form>

      <div className={styles.productSection}>
        {products.length > 0 ? (
          <ProductList
            products={products}
            onDelete={removeProduct}
            showMenuOptions={false}
            showTrashButton={true}
            showCheckBox={false}
          />
        ) : (
          <p>Nenhum produto anunciado.</p>
        )}
      </div>

      <div className={styles.productSelection}>
        <h3>Adicionar Produtos</h3>
        <ProductSelection selectedProducts={products} onSelect={setProducts} />
      </div>
    </div>
  );
}