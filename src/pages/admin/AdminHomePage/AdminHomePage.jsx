import { Outlet } from "react-router";
import SidebarLayout from "../../../layouts/SidebarLayout/SidebarLayout.jsx";
export default function AdminHomePage() {
    return (
        <SidebarLayout>
            <Outlet/>
        </SidebarLayout>
    )
}