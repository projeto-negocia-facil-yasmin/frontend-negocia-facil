import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login/Login.jsx"
import Register from "../pages/Auth/Register/Register.jsx"
import EditUsersAdminPage from "../pages/admin/EditUsersAdminPage/EditUsersAdminPage.jsx"
import ListUsersAdminPage from "../pages/admin/ListUsersAdminPage/ListUsersAdminPage.jsx"
import CreateUsersAdminPage from "../pages/admin/CreateUsersAdminPage/CreateUsersAdminPage.jsx"
import {Navigate} from "react-router";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.jsx";
import AdminHomePage from "../pages/admin/AdminHomePage/AdminHomePage.jsx";

export default function AppRoutes(){
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Navigate to="/auth/login" />}/>
                <Route path="*" element={<NotFoundPage/>}/>

                <Route path="admin" element={<AdminHomePage/>}>
                    <Route path="users">
                        <Route index element={<ListUsersAdminPage />} />
                        <Route path=":id" element={<EditUsersAdminPage />} />
                        <Route path="register" element={<CreateUsersAdminPage />} />
                    </Route>
                </Route>

                <Route path="auth">
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

            </Routes>

        </BrowserRouter>
    )
}