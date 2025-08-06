import React, { useState, useEffect } from "react";
import styles from "./ProductForm.module.css";
import { CategoryAPI } from "../../services/CategoryAPI";

function ProductForm({ productToEdit, onCancel, onSave }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState("Venda");
  const [description, setDescription] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoryAPI.getAll()
      .then((data) => setCategories(data))
      .catch(() => alert("Erro ao carregar categorias"));
  }, []);

  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title || "");
      setPrice(productToEdit.price || "");
      setQuantity(productToEdit.quantity || "");
      setCategoryId(productToEdit.category?.id || "");
      setType(productToEdit.forExchange ? "Troca" : "Venda");
      setDescription(productToEdit.description || "");
      setImagePreviewUrl(productToEdit.imageUrl || "");
    } else {
      clearForm();
    }
  }, [productToEdit]);

  function clearForm() {
    setTitle("");
    setPrice("");
    setQuantity("");
    setCategoryId("");
    setType("Venda");
    setDescription("");
    setImagePreviewUrl("");
    setIsUploading(false);
  }

  function handleCancel() {
    clearForm();
    onCancel();
  }

  async function handleImageUpload(file) {
    setIsUploading(true);
    const cloudName = "dxnmdkbnd";
    const uploadPreset = "negocia_facil";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setImagePreviewUrl(data.secure_url);
      } else {
        throw new Error("Erro ao enviar imagem.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar imagem.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !price || !quantity || !categoryId) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      id: productToEdit?.id,
      title,
      price: Number(price),
      quantity: Number(quantity),
      categoryId: Number(categoryId),
      description,
      forExchange: type === "Troca",
      imageUrl: imagePreviewUrl,
    };

    onSave(payload);
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>{productToEdit ? "Editar Produto" : "Cadastro de Produto"}</h1>

        <input
          type="text"
          placeholder="Título do Produto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className={styles.inlineGroup}>
          <input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="0"
          />
        </div>

        <div className={styles.inlineGroup}>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
            <option value="">Selecione uma categoria</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Venda">Venda</option>
            <option value="Troca">Troca</option>
          </select>
        </div>

        <input type="file" onChange={handleFileChange} />

        {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" className={styles.imagePreview} />}

        <textarea
          placeholder="Descrição"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className={styles.buttonGroup}>
          <button type="button" className={styles.cancel} onClick={handleCancel}>
            Cancelar
          </button>
          <button type="submit" className={styles.save} disabled={isUploading}>
            {isUploading ? "Enviando imagem..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;