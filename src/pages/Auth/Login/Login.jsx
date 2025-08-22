import styles from "./Login.module.css";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../../../components/Button/Button.jsx";
import { AuthContext } from "../../../context/AuthContext";
import { UserAPI } from "../../../services/UserAPI";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const suapRes = await UserAPI.authenticateSuap({
        enrollmentNumber,
        password,
      });

      const token = suapRes.token;
      const roles = suapRes.roles ?? [];
      const user = {
        ...suapRes.user,
        profileImage: suapRes.user.imgUrl || "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Riley",
      };

      login(token, roles, user);

      toast.success("Login SUAP realizado com sucesso!");

      if (roles.includes("ADMIN")) navigate("/admin");
      else navigate("/user/products");
    } catch (err) {
      console.error("Erro SUAP login:", err);
      toast.error(err.response?.data || "Falha na autenticação SUAP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2 className={styles.title}>Bem-vindo de volta! Acesse sua conta</h2>

        <input
          type="text"
          placeholder="Matrícula SUAP"
          value={enrollmentNumber}
          onChange={(e) => setEnrollmentNumber(e.target.value)}
          className={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Senha SUAP"
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