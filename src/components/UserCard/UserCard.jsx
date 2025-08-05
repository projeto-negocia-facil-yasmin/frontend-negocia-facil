import styles from './UserCard.module.css';
import { Edit, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from '../../services/api';

export default function UserCard({ id, imgUrl, userName, email, onUserDeleted, loggedUserId }) {
  const navigate = useNavigate();

  async function confirmDelete() {
    const confirm = window.confirm(`Tem certeza que deseja excluir o usuário ${userName}?`);
    if (!confirm) return;

    try {
      await api.delete(`/users/${id}`);
      toast.success("Usuário excluído com sucesso!");
      if (onUserDeleted) onUserDeleted(id);
    } catch (error) {
      toast.error(error.message || "Erro ao excluir usuário");
    }
  }

  function handleEditClick() {
    if (!loggedUserId) {
      toast.error("Usuário não autenticado.");
      return;
    }
    if (loggedUserId !== id) {
      toast.error("Você não tem permissão para editar este usuário.");
      return;
    }
    navigate(`/admin/users/${id}`);
  }

  return (
    <div className={styles.userCard}>
      <div className={styles.userInfo}>
        <img
          src={imgUrl || "https://conteudo.imguol.com.br/blogs/174/files/2018/05/iStock-648229868-1024x909.jpg"}
          alt={`Profile photo of ${userName}`}
          width={50}
          height={50}
        />
        <div className={styles.userNameAndEmailCard}>
          <span>{userName}</span>
          <span>{email}</span>
        </div>
      </div>
      <div className={styles.buttonsCard}>
        <button onClick={handleEditClick} className={styles.editButton}>
          <Edit size={20} />
        </button>
        <button onClick={confirmDelete} className={styles.deleteButton}>
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
}