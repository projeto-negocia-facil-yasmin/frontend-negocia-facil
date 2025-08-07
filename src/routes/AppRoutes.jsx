import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Auth/Login/Login.jsx";
import Register from "../pages/Auth/Register/Register.jsx";
import AdminHomePage from "../pages/Admin/AdminHomePage/AdminHomePage.jsx";
import EditUsersAdminPage from "../pages/Admin/EditUsersAdminPage/EditUsersAdminPage.jsx";
import ListUsersAdminPage from "../pages/Admin/ListUsersAdminPage/ListUsersAdminPage.jsx";
import CreateUsersAdminPage from "../pages/Admin/CreateUsersAdminPage/CreateUsersAdminPage.jsx";
import UserHomePage from "../pages/User/UserHomePage/UserHomePage.jsx";
import ProductsPage from "../pages/ProductsPage/ProductsPage.jsx";
import AdvertisementsPage from "../pages/AdvertisementsPage/AdvertisementsPage.jsx";
import { AdvertisementFormPage } from "../pages/AdvertisementFormPage/AdvertisementFormPage.jsx";
import RulesList from "../pages/RulesList/RulesList.jsx";
import RuleForm from "../pages/RuleForm/RuleForm.jsx";
import Home from "../pages/Home/Home.jsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.jsx";
import ContactAdvertiserPage from "../pages/ContactAdvertiserPage/ContactAdvertiserPage.jsx";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="admin" element={<AdminHomePage />}>
          <Route path="users">
            <Route index element={<ListUsersAdminPage />} />
            <Route path=":id" element={<EditUsersAdminPage />} />
            <Route path="register" element={<CreateUsersAdminPage />} />
          </Route>

          <Route path="products" element={<ProductsPage />} />

          <Route path="advertisements">
            <Route index element={<AdvertisementsPage />} />
            <Route path="new" element={<AdvertisementFormPage />} />
            <Route path=":id" element={<AdvertisementFormPage />} />
          </Route>

          <Route path="rules">
            <Route index element={<RulesList />} />
            <Route path="new" element={<RuleForm />} />
            <Route path="edit" element={<RuleForm />} />
          </Route>
        </Route>

        <Route path="user" element={<UserHomePage />}>
          <Route path="products" element={<ProductsPage />} />

          <Route path="advertisements">
            <Route index element={<AdvertisementsPage />} />
            <Route path="new" element={<AdvertisementFormPage />} />
            <Route path=":id" element={<AdvertisementFormPage />} />
          </Route>

          <Route path="rules">
            <Route index element={<RulesList />} />
            <Route path="new" element={<RuleForm />} />
            <Route path="edit" element={<RuleForm />} />
          </Route>
        </Route>

        <Route path="home" element={<Home />} />
        <Route path="contact/:advertiserId" element={<ContactAdvertiserPage />} />
      </Routes>
    </BrowserRouter>
  );
}