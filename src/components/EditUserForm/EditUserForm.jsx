import styles from './EditUserForm.module.css';
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

export default function EditUserForm({ user, action }) {

    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        fullName: user?.fullName || "",
        username: user?.username || "",
        enrollmentNumber: user?.enrollmentNumber || "",
        password: "",
        phone: user?.phone || "",
    });

    useEffect(() => {
        setFormState({
            fullName: user?.fullName || "",
            username: user?.username || "",
            enrollmentNumber: user?.enrollmentNumber || "",
            password: "",
            phone: user?.phone || "",
        });
    }, [user]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = { ...formState, id: user.id };
        action(data);
    }

    return (
        <ErrorBoundary>
            <form className={styles.form} onSubmit={handleSubmit}>

                <input
                    name="fullName"
                    value={formState.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Nome completo"
                />

                <input
                    name="username"
                    value={formState.username}
                    onChange={handleChange}
                    required
                    placeholder="Email institucional"
                    type="email"
                />

                <input
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    required
                    placeholder="Telefone (11 dígitos, só números)"
                    type="tel"
                    pattern="\d{11}"
                    title="Telefone deve conter exatamente 11 dígitos numéricos"
                />

                <input
                    name="enrollmentNumber"
                    value={formState.enrollmentNumber}
                    onChange={handleChange}
                    required
                    placeholder="Matrícula"
                />

                <input
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    placeholder="Senha (deixe vazio para manter)"
                    type="password"
                />

                <Button text="Salvar Alterações" type={"submit"} />
                <Button text="Cancelar" action={() => { navigate("/admin/users") }} />
            </form>

        </ErrorBoundary>
    );
}