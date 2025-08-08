import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { RuleAPI } from "../../services/ruleAPI";
import { isAdmin } from "../../utils/auth";
import toast from "react-hot-toast";
import styles from "./RuleForm.module.css";

export default function RuleForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const rule = location.state;

  const [title, setTitle] = useState(rule?.title || "");
  const [description, setDescription] = useState(rule?.description || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isAdmin()) {
      toast.error("Acesso negado."); 
      navigate(-1);
    }
  }, [navigate]);

  const saveRule = async () => {
    if (!title.trim()) {
      toast.warning("O título é obrigatório.", { id: "rule-validation" });
      return;
    }

    const data = {
      title,
      description,
      active: true,
    };

    const toastId = rule ? `rule-save-${rule.id}` : "rule-save-new";

    try {
      setIsSaving(true);
      toast.loading(rule ? "Atualizando regra..." : "Criando regra...", { id: toastId });

      if (rule) {
        await RuleAPI.update(rule.id, data);
        toast.success("Regra atualizada com sucesso!", { id: toastId });
      } else {
        await RuleAPI.create(data);
        toast.success("Regra criada com sucesso!", { id: toastId });
      }

      navigate("/admin/rules");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Erro ao salvar regra.";
      toast.error(msg, { id: `${toastId}-error` });
      console.error("Erro ao salvar regra:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h1 className={styles.formHeader}>
          {rule ? "Editar Regra" : "Cadastrar Regra"}
        </h1>

        <div className={styles.inputGroup}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.inputField}
            placeholder="Título"
            disabled={isSaving}
          />
        </div>

        <div className={styles.inputGroup}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${styles.inputField} ${styles.textareaField}`}
            placeholder="Descrição"
            disabled={isSaving}
          />
        </div>

        <div className={styles.buttonsContainer}>
          <button
            className={styles.cancelButton}
            onClick={() => navigate("/admin/rules")}
            disabled={isSaving}
          >
            Cancelar
          </button>
          <button
            className={styles.saveButton}
            onClick={saveRule}
            disabled={isSaving}
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}