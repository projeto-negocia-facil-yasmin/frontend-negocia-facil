import { Outlet } from "react-router";

import SidebarLayout from "../../../layouts/SidebarLayout/SidebarLayout.jsx";

export default function UserHomePage() {
  return (
    <SidebarLayout isAdmin={false}>
      <Outlet />
    </SidebarLayout>
  );
}