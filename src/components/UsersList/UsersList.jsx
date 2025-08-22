import { useEffect, useState } from "react";
import api from "../../services/api";
import UserCard from "../UserCard/UserCard";
import Button from "../Button/Button";
import styles from "./UsersList.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function UsersList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const size = 5;

  useEffect(() => {
    async function fetchLoggedUser() {
      try {
        const res = await api.get("/users/me");
        setLoggedUserId(res.data.id);
      } catch (error) {
        console.error("Erro ao buscar usuário logado:", error);
        setLoggedUserId(null);
      }
    }
    fetchLoggedUser();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await api.get("/users", { params: { page, size } });
        setUsers(res.data.content);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
        toast.error("Erro ao carregar usuários", { id: "fetch-users-error" });
      }
    }
    fetchUsers();
  }, [page]);

  const nextPage = () => {
    if (page + 1 < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const handleUserDeleted = (deletedId) => {
    setUsers((prev) => prev.filter((user) => user.id !== deletedId));
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? { ...u, ...updatedUser } : u))
    );
  };

  return (
    <div className={styles.usersList}>
      {users.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              imgUrl={user.imgUrl}
              userName={user.fullName}
              email={user.username}
              isAdmin={user.roles?.includes("ROLE_ADMIN")}
              loggedUserId={loggedUserId}
              onUserDeleted={handleUserDeleted}
              onUserUpdated={handleUserUpdated}
            />
          ))}
        </ul>
      )}

      <div className={styles.paginationCard}>
        <button
          onClick={prevPage}
          disabled={page === 0}
          className={styles.paginationButtons}
        >
          Anterior
        </button>
        <span className={styles.pagesText}>
          Página {page + 1} de {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={page + 1 === totalPages}
          className={styles.paginationButtons}
        >
          Próxima
        </button>
      </div>

      <Button
        text={"Criar Novo usuário"}
        action={() => navigate("register")}
      />
    </div>
  );
}

export default UsersList;