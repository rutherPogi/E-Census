import { Snackbar, Alert } from "@mui/material";

export const Notification = ({ 
  snackbarMessage, 
  snackbarOpen, 
  setSnackbarOpen,
  severity
}) => {

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert 
        onClose={handleSnackbarClose} 
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};


