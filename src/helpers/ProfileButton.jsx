import { useState } from 'react';
import { ProfileModal } from '../components';
import { FaUser } from 'react-icons/fa';

export const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
        aria-label="Perfil de usuario"
      >
        <FaUser className="text-xl" />
      </button>
      <ProfileModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};
