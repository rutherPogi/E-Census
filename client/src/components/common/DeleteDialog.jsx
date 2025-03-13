import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress
} from '@mui/material';

const DeleteDialog = ({ 
  open, 
  item, 
  onClose, 
  onConfirm, 
  isDeleting,
  title = "Confirm Deletion",
  messageTemplate = "Do you want to delete this item?",
  idField = "id",
  nameField = "name" 
}) => {
  if (!item) return null;

  // Generate message using template and item properties
  const message = typeof messageTemplate === 'function' 
    ? messageTemplate(item) 
    : messageTemplate.replace('{id}', item[idField])
                    .replace('{name}', item[nameField]);
  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting}>No</Button>
        <Button 
          onClick={onConfirm} 
          color="error" 
          disabled={isDeleting}
          startIcon={isDeleting ? <CircularProgress size={20} /> : null}
        >
          {isDeleting ? 'Deleting...' : 'Yes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;