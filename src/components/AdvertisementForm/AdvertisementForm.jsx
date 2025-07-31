import Button from "../Button/Button";
import ProductList from "../ProductList/ProductList";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductSelection } from "../ProductSelection/ProductSelection";
import "./AdvertisementForm.css";

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
    <div className="advertisement-form">
      {!isNew && (
        <div>
          <p>ID: {advertisement.id}</p>
          <p>{datetime.toLocaleDateString("pt-BR")}</p>
          <p>
            {datetime.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      )}

      <p>Quantidade de itens no anúncio: {products.length}</p>

      <form className="form-description" onSubmit={updateAdvertisement}>
        <label>Descrição:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button type="submit" text="Salvar" />
      </form>

      {products.length > 0 ? (
        <div>
          <h3>Produtos anunciados</h3>
          <ProductList
            products={products}
            onDelete={removeProduct}
            showMenuOptions={false}
            showTrashButton={true}
            showCheckBox={false}
          />
        </div>
      ) : (
        <p>Nenhum produto anunciado.</p>
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