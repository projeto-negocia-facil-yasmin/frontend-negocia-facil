import styles from "./Register.module.css";
import { useState } from "react";
import Button from "../../../components/Button/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username,
      password,
      fullName,
      enrollmentNumber,
    };

    try {
      const registerRes = await axios.post("http://localhost:8080/auth/register", userData);

      if (registerRes.status === 201 || registerRes.status === 200) {
        const loginRes = await axios.post("http://localhost:8080/auth/login", {
          username,
          password,
        });

        const token = loginRes.data.accessToken;
        localStorage.setItem("token", token);

        toast.success("Cadastro realizado com sucesso!", { id: "register-success" });

        if (username.toLowerCase().endsWith("@ifpb.edu.br")) {
          navigate("/admin");
        } else {
          navigate("/user/products");
        }
      } else {
        toast.error("Falha inesperada no cadastro.", { id: "register-failure" });
      }
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Erro ao cadastrar";
      toast.error(msg, { id: "register-error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleRegister} className={styles.form} aria-label="formulário de cadastro">
        <h2 className={styles.title}>Bem-vindo! Crie sua conta</h2>

        <input
          type="email"
          placeholder="Email institucional"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          required
          pattern="^[a-zA-Z0-9._%+\-]+@(ifpb\.edu\.br|academico\.ifpb\.edu\.br)$"
          title="O email deve terminar com @ifpb.edu.br ou @academico.ifpb.edu.br"
          aria-label="email institucional"
        />

        <input
          type="password"
          placeholder="Senha (mínimo 8 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
          minLength={8}
          maxLength={30}
          aria-label="senha"
        />

        <input
          type="text"
          placeholder="Nome completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={styles.input}
          required
          aria-label="nome completo"
        />

        <input
          type="text"
          placeholder="Matrícula"
          value={enrollmentNumber}
          onChange={(e) => setEnrollmentNumber(e.target.value)}
          className={styles.input}
          required
          aria-label="matrícula"
        />

        <Button type="submit" text={loading ? "Cadastrando..." : "Cadastrar"} disabled={loading} />
        <Link to="/auth/login" className={styles.link}>
          Já tem uma conta? Voltar para login
        </Link>
      </form>
    </div>
  );
}