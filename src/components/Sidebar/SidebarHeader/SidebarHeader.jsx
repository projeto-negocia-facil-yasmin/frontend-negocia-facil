import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import styles from './SidebarHeader.module.css';

function SidebarHeader() {
  const { user, userName } = useContext(AuthContext);

  return (
    <div className={styles.sidebarHeader}>
      <img
        src={user?.profileImage || "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Riley"}
        width={100}
        height={100}
        alt={`Usuário: ${userName}`}
      />
      <span>{userName}</span>
    </div>
  );
}

export default SidebarHeader;