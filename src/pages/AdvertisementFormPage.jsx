import Sidebar from "../components/Sidebar/Sidebar.jsx";
import AdvertisementForm from "../components/AdvertisementForm/AdvertisementForm.jsx";
import { AdvertisementAPI } from "../services/AdvertisementAPI";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './AdvertisementFormPage.css';
export function AdvertisementFormPage() {

    const { id } = useParams();
    const [advertisement, setAdvertisement] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            loadAdvertisement();
        } else {
            setAdvertisement({
                description: "",
                products: [],
                createdAt: new Date().toISOString(),
            });
        }
    }, [id]);

    async function handleUpdate(id, newAdvertisement) {
        try {
            if (id) {
                await AdvertisementAPI.update(id, newAdvertisement);
                loadAdvertisement();
                alert("Anúncio atualizado com sucesso!");
            } else {
                const created = await AdvertisementAPI.create(newAdvertisement);
                alert("Anúncio criado com sucesso!");
                console.log(created);
                navigate("..");
            }
        } catch (error) {
            console.error(error.message);
        }
    }


    return (
        <div className="advertisements-page-container">
            <div className="advertisement-edition">
                <h1>Formulário de Anúncio</h1>
                <AdvertisementForm
                    advertisement={advertisement}
                    onUpdate={handleUpdate}
                    isNew={!id} />
            </div>
        </div>
    );
}