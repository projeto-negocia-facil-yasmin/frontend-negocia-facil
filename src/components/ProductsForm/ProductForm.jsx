import { useState, useEffect } from "react";
import { ProductAPI } from "../../services/ProductAPI";
import toast from "react-hot-toast";
import styles from "./ProductForm.module.css";

function ProductForm({ productToEdit, onCancel, onSave }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Venda");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title || "");
      setPrice(productToEdit.price ?? "");
      setQuantity(productToEdit.quantity ?? "");
      setCategory(productToEdit.category || "");
      setType(productToEdit.forExchange ? "Troca" : "Venda");
      setDescription(productToEdit.description || "");
      setFile(null);
    } else {
      clearForm();
    }
  }, [productToEdit]);

  function clearForm() {
    setTitle("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setType("Venda");
    setDescription("");
    setFile(null);
  }

  function handleCancel() {
    clearForm();
    onCancel();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !price || !quantity || !category) {
      toast.warning("Preencha todos os campos obrigatórios.", {
        id: "product-validation-warning",
      });
      return;
    }

    const payload = {
      title,
      price: Number(price),
      quantity: Number(quantity),
      category,
      description,
      forExchange: type === "Troca",
    };

    const toastId = productToEdit?.id
      ? `product-save-${productToEdit.id}`
      : "product-save-new";

    try {
      setIsSaving(true);
      toast.loading(
        productToEdit && productToEdit.id
          ? "Atualizando produto..."
          : "Cadastrando produto...",
        { id: toastId }
      );

      let savedProduct;
      if (productToEdit && productToEdit.id) {
        savedProduct = await ProductAPI.update(productToEdit.id, payload);
        toast.success("Produto atualizado com sucesso!", { id: toastId });
      } else {
        savedProduct = await ProductAPI.create(payload);
        toast.success("Produto cadastrado com sucesso!", { id: toastId });
      }

      clearForm();
      onSave(savedProduct);
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Erro desconhecido.";
      toast.error(msg, { id: `${toastId}-error` });
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título do Produto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isSaving}
        />

        <div className={styles.inlineGroup}>
          <input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            disabled={isSaving}
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="0"
            disabled={isSaving}
          />
        </div>

        <div className={styles.inlineGroup}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            disabled={isSaving}
          >
            <option value="">Categoria</option>
            <option value="BOOK">Livro</option>
            <option value="UNIFORM">Uniforme</option>
            <option value="PERIPHERAL">Periférico</option>
            <option value="BACKPACK">Mochila</option>
            <option value="CALCULATOR">Calculadora</option>
            <option value="OTHERS">Outros</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={isSaving}
          >
            <option value="Venda">Venda</option>
            <option value="Troca">Troca</option>
          </select>
        </div>

        <input type="file" onChange={handleFileChange} disabled={isSaving} />

        <textarea
          placeholder="Descrição"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSaving}
        ></textarea>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancel}
            onClick={handleCancel}
            disabled={isSaving}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.save} disabled={isSaving}>
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;