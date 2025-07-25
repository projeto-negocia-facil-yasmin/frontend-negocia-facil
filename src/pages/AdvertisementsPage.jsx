import { useState, useEffect } from "react";
import { AdvertisementAPI } from "../services/AdvertisementAPI";
import SimpleAdvertisementCard from "../components/Advertisement/SimpleAdvertisementCard";
import './AdvertisementsPage.css';

function AdvertisementsPage() {
    
    const [advertisements, setAdvertisements] = useState([]);

    useEffect(() => {
        loadAdvertisements();
      }, []);

    async function loadAdvertisements() {
       
        const data = await AdvertisementAPI.getAll();
        console.log(data);
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
    
    return (
        <>
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
                        onDelete={() => handleDelete(ad.id)}/>
                    ))}
                </div>
                )}
            </div>
        </>
    );
}
export default AdvertisementsPage;