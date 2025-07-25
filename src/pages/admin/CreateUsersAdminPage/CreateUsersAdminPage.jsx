import styles from './CreateUsersAdminPage.module.css'
import UserForm from "../../../components/UserForm/UserForm.jsx";
import axios from "axios";

function CreateUsersAdminPage() {

    async function handleCreateUser(data) {
        try {
            await axios.post(
                "http://localhost:8080/api/v1/users",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            alert("Usuário criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar usuário:", error.response?.data || error.message || error);
            alert("Ocorreu um erro ao criar o usuário. Verifique o console para mais detalhes.");
        }
    }
    return (
        <div className={styles.mainContent}>
            <div className={styles.formHeader}>
                <h2>Formulário de cadastro</h2>
            </div>
            <UserForm action={handleCreateUser} />
        </div>
    )
}
export default CreateUsersAdminPage