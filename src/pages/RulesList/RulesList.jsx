import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { RuleAPI } from "../../services/RuleAPI";
import { isAdmin } from "../../utils/auth";
import toast from "react-hot-toast";
import styles from "./RulesList.module.css";
import { MoreVertical } from "lucide-react";

export default function RulesList() {
  const [rules, setRules] = useState([]);
  const navigate = useNavigate();
  const admin = isAdmin();
  const basePath = admin ? "/admin/rules" : "/user/rules";

  const fetchRules = async () => {
    try {
      const data = await RuleAPI.getAll();
      setRules(data);
    } catch (error) {
      const msg = error?.response?.data?.message || error.message;
      toast.error(msg);
    }
  };

  const deleteRule = async (id) => {
    if (!admin) return;

    const toastId = `rule-delete-${id}`;

    try {
      toast.loading("Excluindo regra...", { id: toastId });

      await RuleAPI.delete(id);

      toast.success("Regra excluída com sucesso!", { id: toastId });
      fetchRules();
    } catch (error) {
      const msg = error?.response?.data?.message || error.message;
      toast.error(msg, { id: `${toastId}-error` });
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Lista de Regras</h1>

        {rules.length === 0 ? (
          <p>Nenhuma regra encontrada.</p>
        ) : (
          <ul>
            {rules.map((rule) => (
              <li key={rule.id} className={styles.ruleItem}>
                <div>
                  <strong className={styles.ruleItemTitle}>{rule.title}</strong>
                  <p className={styles.ruleItemDescription}>{rule.description}</p>
                </div>

                {admin && (
                  <div style={{ position: "relative" }}>
                    <button
                      className={styles.dropdownButton}
                      onClick={() => toggleMenu(rule.id)}
                      aria-haspopup="true"
                      aria-expanded={openMenuId === rule.id}
                      aria-label="Abrir menu de opções"
                    >
                      <MoreVertical />
                    </button>

                    {openMenuId === rule.id && (
                      <div className={styles.dropdownMenu}>
                        <button
                          onClick={() => {
                            navigate(`${basePath}/edit`, { state: rule });
                            setOpenMenuId(null);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            deleteRule(rule.id);
                            setOpenMenuId(null);
                          }}
                        >
                          Excluir
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {admin && (
          <button
            className={styles.btnNewRule}
            onClick={() => navigate(`${basePath}/new`)}
            aria-label="Adicionar nova regra"
            type="button"
          >
            Nova Regra
          </button>
        )}
      </div>
    </div>
  );
}