import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function RulesList() {
  const [rules, setRules] = useState([]);
  const navigate = useNavigate();

  const fetchRules = async () => {
    try {
      const response = await api.get("/rules");
      setRules(response.data);
    } catch (error) {
      console.error("Erro ao buscar regras:", error);
    }
  };

  const deleteRule = async (id) => {
    try {
      await api.delete(`/rules/${id}`);
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
        <button className="btn" onClick={() => navigate("/nova")}>
          Nova Regra
        </button>
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
                <div>
                  <button
                    className="btn edit"
                    onClick={() => navigate("/editar", { state: rule })}
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
