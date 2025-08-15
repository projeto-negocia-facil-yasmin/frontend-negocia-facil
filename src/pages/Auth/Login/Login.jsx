import styles from "./Login.module.css";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../../components/Button/Button.jsx";
import { AuthContext } from "../../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username: email,
        password: password,
      });

      const token = response.data.accessToken;
      const roles = response.data.roles ?? [];

      const userResponse = await axios.get("http://localhost:8080/api/v1/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userWithImage = {
        ...userResponse.data,
        profileImage: userResponse.data.imgUrl || "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Riley",
      };

      login(token, roles, userWithImage);

      if (roles.includes("ADMIN")) navigate("/admin");
      else navigate("/user/products");
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      alert("Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2 className={styles.title}>Bem-vindo de Volta! Acesse sua conta</h2>

        <input
          type="email"
          placeholder="Email institucional"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />

        <Button type="submit" text={loading ? "Entrando..." : "Entrar"} disabled={loading} />

        <Link to="/auth/register" className={styles.link}>
          Ainda não tem uma conta? Cadastre-se aqui
        </Link>
      </form>
    </div>
  );
}