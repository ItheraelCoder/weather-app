import { useState } from 'react';
import { ProfileModal } from '../components';

export const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Ver Perfil
      </button>
      <ProfileModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};
