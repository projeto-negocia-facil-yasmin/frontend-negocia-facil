import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Package, Tag, Shield, LogOut, Users, UserCog } from "lucide-react";
import SidebarHeader from "./SidebarHeader/SidebarHeader";
import styles from './Sidebar.module.css';
import { AuthContext } from "../../context/AuthContext.jsx";

function Sidebar() {
  const { roles } = useContext(AuthContext);
  const admin = roles.includes("ADMIN");
  const basePath = admin ? "/admin" : "/user";

  const menuItems = [
    { icon: <Package size={20} />, label: "Produtos", path: `${basePath}/products` },
    { icon: <Tag size={20} />, label: "Anúncios", path: `${basePath}/advertisements` },
    { icon: <Shield size={20} />, label: "Regras", path: `${basePath}/rules` },
    ...(admin
      ? [{ icon: <Users size={20} />, label: "Usuários", path: `${basePath}/users` }]
      : [{ icon: <UserCog size={20} />, label: "Editar Perfil", path: `${basePath}/edit-profile` }]),
  ];

  return (
    <aside className={styles.aside}>
      <SidebarHeader />
      <nav className={styles.nav}>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            <span className={styles.svgImage}>{item.icon}</span>
            <span className={styles.text}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <NavLink className={styles.link} to="/auth/login">
        <LogOut className={styles.svgImage} size={20} />
        <span className={styles.text}>Sair</span>
      </NavLink>
    </aside>
  );
}

export default Sidebar;