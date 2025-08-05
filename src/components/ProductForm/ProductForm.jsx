import React, { useEffect, useState } from "react";
import styles from "./ProductForm.module.css";
import { ProductAPI } from "../../services/ProductAPI";
import { toast } from "react-toastify";

function ProductForm({ productToEdit, onCancel, onSave }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Venda");
  const [description, setDescription] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title);
      setPrice(productToEdit.price);
      setQuantity(productToEdit.quantity);
      setCategory(productToEdit.category);
      setType(productToEdit.forExchange ? "Troca" : "Venda");
      setDescription(productToEdit.description);
      setImagePreviewUrl(productToEdit.imageUrl || "");
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
        console.log("URL da imagem enviada:", data.secure_url);
        setImagePreviewUrl(data.secure_url);
      } else {
        console.error("Erro no upload:", data);
        toast.error("Erro ao enviar imagem.");
      }
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      toast.error("Erro ao enviar imagem.");
    } finally {
      setIsUploading(false); 
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !price || !quantity || !category) {
      toast.dismiss();
      toast.warn("Preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      title,
      price: Number(price),
      quantity: Number(quantity),
      category,
      description,
      forExchange: type === "Troca",
      imageUrl: imagePreviewUrl,
    };

    try {
      toast.dismiss();

      let savedProduct;
      if (productToEdit && productToEdit.id) {
        savedProduct = await ProductAPI.update(productToEdit.id, payload);
        toast.success("Produto atualizado com sucesso!");
      } else {
        savedProduct = await ProductAPI.create(payload);
        toast.success("Produto cadastrado com sucesso!");
      }

      clearForm();
      onSave(savedProduct);
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Cadastro de Produto</h1>

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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Categoria</option>
            <option value="BOOK">Livro</option>
            <option value="UNIFORM">Uniforme</option>
            <option value="PERIPHERAL">Periférico</option>
            <option value="BACKPACK">Mochila</option>
            <option value="CALCULATOR">Calculadora</option>
            <option value="OTHERS">Outros</option>
          </select>

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Venda">Venda</option>
            <option value="Troca">Troca</option>
          </select>
        </div>

        <input type="file" onChange={handleFileChange} />

        {imagePreviewUrl && (
          <img
            src={imagePreviewUrl}
            alt="Preview"
            className={styles.imagePreview}
          />
        )}

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

          <button
            type="submit"
            className={styles.save}
            disabled={isUploading} 
          >
            {isUploading ? "Enviando imagem..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;