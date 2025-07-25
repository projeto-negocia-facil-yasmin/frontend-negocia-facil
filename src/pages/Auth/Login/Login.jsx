import styles from "./Login.module.css"
import axios from "axios"
import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import Button from "../../../components/Button/Button.jsx";
export default function Login(){

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                username: email,
                password: password
            });

            console.log(response);

            const token = response.data.accessToken;

            localStorage.setItem("token", token);

            navigate("/admin/");

        } catch (err) {
            console.error("Erro ao fazer login:", err);
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
                    required={true}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    required={true}
                />
                <Button type={"submit"} text={"Entrar"}/>
                <Link to="/auth/register" className={styles.link}>
                    Ainda não tem uma conta? Cadastre-se aqui
                </Link>
            </form>
        </div>
    )
}