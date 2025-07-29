import styles from "./SidebarLayout.module.css";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";

export default function SidebarLayout({ children }) {
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  const userName = localStorage.getItem("userName") || "Usuário";
  const imgUrl = localStorage.getItem("userImg") || "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Riley";

  return (
    <div className={styles.layout}>
      <Sidebar roles={roles} userName={userName} imgUrl={imgUrl} />
      <main>{children}</main>
    </div>
  );
}