import { useEffect, useState, useContext } from "react";
import axios from "axios";
import EditUserForm from "../../../components/EditUserForm/EditUserForm.jsx";
import styles from "./EditUsersAdminPage.module.css";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthContext";

function EditUsersAdminPage() {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const { user, updateUserName } = useContext(AuthContext);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserData(res.data);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        toast.error("Erro ao buscar usuário.", { id: "fetch-user-error" });
      }
    }
    fetchUser();
  }, [id]);

  async function handleEditUser(data) {
    const formattedData = {
      username: data.username,
      password: data.password,
      fullName: data.fullName,
      enrollmentNumber: data.enrollmentNumber,
      phone: data.phone,
    };

    try {
      await axios.put(`http://localhost:8080/api/v1/users/${data.id}`, formattedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Usuário editado com sucesso!", { id: "edit-user-success" });

      if (user?.id === data.id) {
        updateUserName(data.fullName);
      }
    } catch (error) {
      console.error("Erro ao editar usuário:", error.response?.data || error.message || error);
      toast.error("Erro ao editar o usuário.", { id: "edit-user-error" });
    }
  }

  return (
    <div className={styles.mainContent}>
      <div className={styles.formHeader}>
        <h2>Formulário de edição</h2>
      </div>
      {userData ? (
        <EditUserForm user={userData} action={handleEditUser} />
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default EditUsersAdminPage;