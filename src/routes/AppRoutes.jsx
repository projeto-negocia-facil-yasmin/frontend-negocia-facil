import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import Login from "../pages/Auth/Login/Login.jsx";
import Register from "../pages/Auth/Register/Register.jsx";
import EditUsersAdminPage from "../pages/admin/EditUsersAdminPage/EditUsersAdminPage.jsx";
import ListUsersAdminPage from "../pages/admin/ListUsersAdminPage/ListUsersAdminPage.jsx";
import CreateUsersAdminPage from "../pages/admin/CreateUsersAdminPage/CreateUsersAdminPage.jsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.jsx";
import AdminHomePage from "../pages/admin/AdminHomePage/AdminHomePage.jsx";
import Home from "../pages/Home.jsx";
import AdvertisementsPage from "../pages/AdvertisementsPage.jsx";
import { AdvertisementFormPage } from "../pages/AdvertisementFormPage.jsx";
import ProductsPage from "../pages/ProductsPage.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route path="admin" element={<AdminHomePage />}>
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

        <Route path="home" element={<Home />} />
        <Route path="advertisements" element={<AdvertisementsPage />} />
        <Route path="advertisements/new" element={<AdvertisementFormPage />} />
        <Route path="edit/:id" element={<AdvertisementFormPage />} />
        <Route path="products" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}