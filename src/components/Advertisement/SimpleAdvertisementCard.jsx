import './SimpleAdvertisementCard.css';
import { MoreVertical } from "lucide-react"; 
import { useState } from "react";

function UserAdvertisementCard({
    id,
    creationTime,
    itemsCount,
    description,
    onEdit,
    onDelete
  }) {

  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className='user-advertisement-card'>
          <div>
              <div className='card-header'>
                  <div className="advertisement-dropdown"
                    onMouseEnter={() => setShowMenu(true)}
                    onMouseLeave={() => setShowMenu(false)}
                  >
                      <MoreVertical />
                      {showMenu && (
                        <div>
                          <button onClick={() => onEdit}>
                            Editar
                          </button>
                          <button onClick={() => onDelete(id)}>
                            Excluir
                          </button>
                        </div>
                      )}
                  </div>
                  <h2>Anúncio {id}</h2>
                  <p>Criado em {creationTime}</p>
              </div>
              <div className='card_subinfo'>
                  <p>Quantidade de itens no anúncio: {itemsCount}</p>
              </div>
          </div>
        <p>Descrição: {description}</p>
      </div>
      <div>
      </div>
    </>
  );
}

export default UserAdvertisementCard;