import styles from './EditUserForm.module.css';
import Button from "../Button/Button";
import { useState, useEffect, useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import CloudinaryImageUpload from "../ImageUpload/CloudinaryImageUpload";
import { AuthContext } from "../../context/AuthContext";

export default function EditUserForm({ user, action, cancelPath }) {
  const navigate = useNavigate();
  const { user: loggedUser, updateProfileImage } = useContext(AuthContext);

  const [formState, setFormState] = useState({
    fullName: user?.fullName || "",
    username: user?.username || "",
    enrollmentNumber: user?.enrollmentNumber || "",
    password: "",
    phone: user?.phone || "",
    imgUrl: user?.imgUrl || ""
  });

  useEffect(() => {
    setFormState({
      fullName: user?.fullName || "",
      username: user?.username || "",
      enrollmentNumber: user?.enrollmentNumber || "",
      password: "",
      phone: user?.phone || "",
      imgUrl: user?.imgUrl || ""
    });
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      fullName: formState.fullName,
      enrollmentNumber: formState.enrollmentNumber,
      phone: formState.phone,
      imgUrl: formState.imgUrl
    };
    await action(data);

    if (loggedUser?.id === user.id && formState.imgUrl) {
      updateProfileImage(formState.imgUrl);
    }
  }

  return (
    <ErrorBoundary>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          name="fullName"
          value={formState.fullName}
          onChange={handleChange}
          required
          placeholder="Nome completo"
        />
        <input
          name="username"
          value={formState.username}
          onChange={handleChange}
          required
          placeholder="Email institucional"
          type="email"
        />
        <input
          name="phone"
          value={formState.phone}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, '');
            setFormState(prev => ({ ...prev, phone: onlyNumbers.slice(0, 11) }));
          }}
          required
          placeholder="Telefone (11 dígitos)"
          type="tel"
          pattern="\d{11}"
          title="Telefone deve conter exatamente 11 dígitos numéricos"
        />
        <input
          name="enrollmentNumber"
          value={formState.enrollmentNumber}
          onChange={handleChange}
          required
          placeholder="Matrícula"
        />
        <input
          name="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="Senha (deixe vazio para manter)"
          type="password"
        />
        <CloudinaryImageUpload
          onUploadSuccess={(url) => setFormState(prev => ({ ...prev, imgUrl: url }))}
          initialImage={formState.imgUrl}
        />
        <Button text="Salvar Alterações" type="submit" />
        <Button text="Cancelar" action={() => navigate(cancelPath || "/user/products")} />
      </form>
    </ErrorBoundary>
  );
}