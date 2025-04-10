import { useState } from 'react';

export const useNotification = () => {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const showNotification = (message, type = 'info') => {
    setSnackbarMessage(message);
    setSeverity(type);
    setSnackbarOpen(true);
  };

  return {
    snackbarOpen,
    snackbarMessage,
    severity,
    showNotification,
    setSnackbarOpen
  };
};