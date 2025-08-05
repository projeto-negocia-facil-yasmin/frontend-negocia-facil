import React, { useState } from "react";

export default function CloudinaryImageUpload({ onUploadSuccess }) {
  const [preview, setPreview] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "negocia_facil");

    const cloudName = "dxnmdkbnd";

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setPreview(data.secure_url);
        if (onUploadSuccess) onUploadSuccess(data.secure_url);
      } else {
        console.error("Erro no upload:", data);
        alert("Erro ao fazer upload da imagem.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de rede ao fazer upload.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {preview && (
        <div>
          <img src={preview} alt="Preview" style={{ width: "200px", marginTop: "10px" }} />
        </div>
      )}
    </div>
  );
}