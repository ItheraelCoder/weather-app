import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { getProfile, deleteAccount } from '../services/authService';
import { useDispatch } from 'react-redux';
import { logout } from '../store';
import { motion, AnimatePresence } from 'framer-motion'; // Importa Framer Motion para animar el modal

Modal.setAppElement('#root');

export const ProfileModal = ({ isOpen, closeModal }) => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch {
      setError('Error al cargar el perfil');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      alert('Cuenta eliminada correctamente');
      dispatch(logout());
      window.location.href = '/';
    } catch {
      setError('Error al eliminar la cuenta');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Perfil del Usuario"
          className="modal"
          overlayClassName="fixed inset-0 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }} // Animación inicial
            animate={{ opacity: 1, y: 0 }} // Animación al abrir
            exit={{ opacity: 0, y: -50 }} // Animación al cerrar
            transition={{ duration: 0.3 }} // Duración de la animación
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Perfil del Usuario
            </h2>
            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}
            <div className="space-y-4">
              <p>
                <strong className="text-gray-700">Nombre de usuario:</strong>{' '}
                <span className="text-gray-600">{profile.username}</span>
              </p>
              <p>
                <strong className="text-gray-700">Email:</strong>{' '}
                <span className="text-gray-600">{profile.email}</span>
              </p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
              >
                Eliminar Cuenta
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

ProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};