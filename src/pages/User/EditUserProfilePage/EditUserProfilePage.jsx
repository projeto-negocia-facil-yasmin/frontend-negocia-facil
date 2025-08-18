import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditUserForm from "../../../components/EditUserForm/EditUserForm.jsx";
import styles from "./EditUserProfilePage.module.css";
import { AuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";

export default function EditUserProfilePage() {
  const { user, updateUserName, updateProfileImage } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserData({
        ...user,
        password: "",
      });
    }
  }, [user]);

  const handleEditUser = async (data) => {
    try {
      const formattedData = {
        username: data.username,
        password: data.password,
        fullName: data.fullName,
        enrollmentNumber: data.enrollmentNumber,
        phone: data.phone,
        imgUrl: data.imgUrl,
      };

      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8080/api/v1/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar usuário no backend");
      }

      toast.success("Perfil atualizado com sucesso!", { id: "edit-profile-success" });

      updateUserName(data.fullName);
      if (data.imgUrl) updateProfileImage(data.imgUrl);

      navigate("/user/products");
    } catch (err) {
      console.error("Erro ao atualizar usuário no backend", err);
      toast.error("Erro ao atualizar o perfil.", { id: "edit-profile-error" });
    }
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.formHeader}>
        <h2>Editar Perfil</h2>
      </div>
      {userData ? (
        <EditUserForm
          user={userData}
          action={handleEditUser}
          cancelPath="/user/products"
        />
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}