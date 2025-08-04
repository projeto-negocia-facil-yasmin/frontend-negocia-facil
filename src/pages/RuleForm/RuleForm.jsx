import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RuleAPI } from "../../services/ruleAPI";
import { isAdmin } from "../../utils/auth";
import styles from "./RuleForm.module.css";

export default function RuleForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const rule = location.state;

  const [title, setTitle] = useState(rule?.title || "");
  const [description, setDescription] = useState(rule?.description || "");

  useEffect(() => {
    if (!isAdmin()) {
      navigate(-1);
    }
  }, [navigate]);

  const saveRule = async () => {
    const data = {
      title,
      description,
      active: true,
    };

    try {
      if (rule) {
        await RuleAPI.update(rule.id, data);
      } else {
        await RuleAPI.create(data);
      }
      navigate("/admin/rules");
    } catch (error) {
      console.error("Erro ao salvar regra:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>{rule ? "Editar Regra" : "Nova Regra"}</h1>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />

        <button className={styles.btn} onClick={saveRule}>
          Salvar
        </button>
      </div>
    </div>
  );
}