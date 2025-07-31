import { Home, Package, Tag, Shield, LogOut, Users } from "lucide-react";
import SidebarHeader from "./SidebarHeader/SidebarHeader";
import styles from './Sidebar.module.css';
import { NavLink } from "react-router-dom";

function Sidebar({ roles = [], userName, imgUrl }) {
  const isAdmin = roles.includes("ADMIN");
  const basePath = isAdmin ? "/admin" : "/user";

  const menuItems = [
    { icon: <Home size={20} />, label: "Início", path: `${basePath}` },
    { icon: <Package size={20} />, label: "Produtos", path: `${basePath}/products` },
    { icon: <Tag size={20} />, label: "Anúncios", path: `${basePath}/advertisements` },
    { icon: <Shield size={20} />, label: "Regras", path: `${basePath}/rules` },

    ...(isAdmin
      ? [{ icon: <Users size={20} />, label: "Usuários", path: `${basePath}/users` }]
      : []),
  ];

  return (
    <aside className={styles.aside}>
      <SidebarHeader imgUrl={imgUrl} userName={userName} />
      <nav className={styles.nav}>
        {menuItems.map((item, index) => (
          <NavLink className={styles.link} key={index} to={item.path}>
            <span className={styles.svgImage}>{item.icon}</span>
            <span className={styles.text}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <NavLink className={styles.link} to={"/auth/login"}>
        <LogOut className={styles.svgImage} size={20} />
        <span className={styles.text}>Sair</span>
      </NavLink>
    </aside>
  );
}

export default Sidebar;