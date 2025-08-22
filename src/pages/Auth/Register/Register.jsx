import styles from "./Register.module.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../../../components/Button/Button.jsx";
import CloudinaryImageUpload from "../../../components/ImageUpload/CloudinaryImageUpload.jsx";
import { AuthContext } from "../../../context/AuthContext";
import { UserAPI } from "../../../services/UserAPI";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username,
      password,
      fullName,
      enrollmentNumber,
      phone,
      imgUrl: profileImage,
    };

    try {
      const suapRes = await UserAPI.authenticateSuap(userData);
      const token = suapRes.token;
      const roles = suapRes.roles ?? [];
      const user = {
        ...suapRes.user,
        profileImage: suapRes.user.imgUrl || profileImage || "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Riley",
      };

      login(token, roles, user);
      toast.success("Cadastro e login SUAP realizados com sucesso!", { id: "register-success" });

      if (roles.includes("ADMIN")) navigate("/admin");
      else navigate("/user/products");
    } catch (err) {
      console.error("Erro SUAP:", err);
      toast.error(err.response?.data || "Falha na autenticação SUAP", { id: "register-error" });
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
        />

        <input
          type="text"
          placeholder="Nome completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={styles.input}
          required
        />

        <input
          type="text"
          placeholder="Matrícula"
          value={enrollmentNumber}
          onChange={(e) => setEnrollmentNumber(e.target.value)}
          className={styles.input}
          required
        />

        <input
          type="text"
          placeholder="Telefone (11 dígitos, somente números)"
          value={phone}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, '');
            setPhone(onlyNumbers.slice(0, 11));
          }}
          className={styles.input}
          required
          pattern="^\d{11}$"
          title="O telefone deve conter exatamente 11 dígitos numéricos, sem espaços ou símbolos"
        />

        <CloudinaryImageUpload onUploadSuccess={setProfileImage} />

        <Button type="submit" text={loading ? "Cadastrando..." : "Cadastrar"} disabled={loading} />
        <Link to="/auth/login" className={styles.link}>
          Já tem uma conta? Voltar para login
        </Link>
      </form>
    </div>
  );
}