import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getProfile, deleteAccount } from '../services/authService';
import { useDispatch } from 'react-redux'; // Importar useDispatch
import { logout } from '../store'; // Importar la acción de logout
import '../styles/ProfileModal.css';

Modal.setAppElement('#root');

export const ProfileModal = ({ isOpen, closeModal }) => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');
  const dispatch = useDispatch(); // Usar useDispatch

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      setError('Error al cargar el perfil');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      alert('Cuenta eliminada correctamente');
      dispatch(logout()); // Despachar la acción de logout para actualizar el estado de autenticación
      window.location.href = '/';
    } catch (error) {
      setError('Error al eliminar la cuenta');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Perfil del Usuario"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Perfil del Usuario</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <p><strong>Nombre de usuario:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
      </div>
      <button onClick={handleDeleteAccount}>Eliminar Cuenta</button>
      <button onClick={closeModal}>Cerrar</button>
    </Modal>
  );
};