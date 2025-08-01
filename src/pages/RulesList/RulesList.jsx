import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RuleAPI } from "../../services/ruleAPI";
import { isAdmin } from "../../utils/auth";

export default function RulesList() {
  const [rules, setRules] = useState([]);
  const navigate = useNavigate();
  const admin = isAdmin();

  const fetchRules = async () => {
    try {
      const data = await RuleAPI.getAll();
      setRules(data);
    } catch (error) {
      console.error("Erro ao buscar regras:", error);
    }
  };

  const deleteRule = async (id) => {
    if (!admin) return;
    try {
      await RuleAPI.delete(id);
      fetchRules();
    } catch (error) {
      console.error("Erro ao deletar regra:", error);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Lista de Regras</h1>
        {admin && (
          <button className="btn" onClick={() => navigate("new")}>
            Nova Regra
          </button>
        )}
        {rules.length === 0 ? (
          <p>Nenhuma regra encontrada.</p>
        ) : (
          <ul>
            {rules.map((rule) => (
              <li key={rule.id} className="rule-item">
                <div>
                  <strong>{rule.title}</strong>
                  <p>{rule.description}</p>
                </div>
                {admin && (
                  <div>
                    <button
                      className="btn edit"
                      onClick={() => navigate("edit", { state: rule })}
                    >
                      Editar
                    </button>
                    <button
                      className="btn delete"
                      onClick={() => deleteRule(rule.id)}
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}