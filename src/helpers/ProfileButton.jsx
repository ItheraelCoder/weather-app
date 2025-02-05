import { useState } from 'react';
import { ProfileModal } from '../components'; // Importar el componente del modal

export const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button onClick={openModal}>Ver Perfil</button>
      <ProfileModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};
