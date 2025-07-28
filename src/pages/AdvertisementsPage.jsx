import { useState, useEffect } from "react";
import { AdvertisementAPI } from "../services/AdvertisementAPI";
import SimpleAdvertisementCard from "../components/SimpleAdvertisementCard/SimpleAdvertisementCard";
import './AdvertisementsPage.css';
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Button from "../components/Button/Button.jsx";

function AdvertisementsPage() {

    const navigate = useNavigate();
    
    const [advertisements, setAdvertisements] = useState([]);

    useEffect(() => {
        loadAdvertisements();
      }, []);

    async function loadAdvertisements() {
       
        const data = await AdvertisementAPI.getAll();
        setAdvertisements(data);
        
    }

    const handleDelete = async (id) => {
        try {
            await AdvertisementAPI.delete(id);
            loadAdvertisements();
            console.info("Anúncio deletado com sucesso!");
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    }

    const handleNewAdvertisement = () => {
        navigate("/advertisements/new")
    }
    
    return (
        <div className="advertisements-page-container">
            <Sidebar />
            <div className="advertisements-page">
                {advertisements.length === 0 ? (
                    <p className="mensagem-de-aviso">Nenhum anúncio encontrado.</p>
                ) : (
                    <div className="advertisements-list">
                        
                    {advertisements.map((ad) => (
                        <SimpleAdvertisementCard 
                        key={ad.id} 
                        id={ad.id} 
                        creationTime={ad.createdAt} 
                        description={ad.description} 
                        itemsCount={ad.products.length}
                        onDelete={() => handleDelete(ad.id)}
                        onEdit={() => handleEdit(ad.id)}/>
                    ))}
                </div>
                )}
                <Button text={"Novo anúncio"} action={handleNewAdvertisement}/>
            </div>
        </div>
    );
}
export default AdvertisementsPage;