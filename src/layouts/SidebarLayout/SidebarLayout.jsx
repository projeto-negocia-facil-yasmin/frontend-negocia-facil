import styles from "./SidebarLayout.module.css";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function SidebarLayout({ children }) {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.layout}>
      <Sidebar
        roles={user?.roles || []}
        userName={user?.fullName || "Usuário"}
        imgUrl={user?.imgUrl || "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Riley"}
      />
      <main>{children}</main>
    </div>
  );
}