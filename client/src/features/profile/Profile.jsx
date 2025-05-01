import { useState } from "react";
import { Container, Paper, Box, Typography, TextField, Button, Avatar, Snackbar, Alert } from "@mui/material";
import ChangePasswordDialog from "./ChangePasswordDialog";

import { useAuth } from "../../utils/auth/authContext";
import { updateUserProfile } from './userService';

const getInitials = (name) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2); // Limit to 2 characters
};

export default function Profile() {
  
  const { userData, updateUserData } = useAuth();

  const [formData, setFormData] = useState({
    accountName: userData.accountName,
    username: userData.username
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const userInitials = getInitials(formData.accountName);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveChanges = async () => {
    try {
      await updateUserProfile(userData.userID, formData);
      console.log("Profile updated successfully", formData);
      // Update the local state and localStorage with the new data
      updateUserData(formData);
      setSnackbar({
        open: true,
        message: "Profile updated successfully",
        severity: "success"
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to update profile",
        severity: "error"
      });
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <Container component={Paper} sx={{ p: 4, maxWidth: 500 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Avatar sx={{ bgcolor: '#DC623C', height: 100, width: 100, fontSize: '36px' }}>{userInitials}</Avatar>
        <Typography variant="h6">{`@${formData.username}`}</Typography>
        <TextField 
          label="Name" 
          name="accountName" 
          fullWidth 
          value={formData.accountName} 
          onChange={handleChange}
        />
        <TextField 
          label="Username" 
          name="username" 
          fullWidth 
          value={formData.username} 
          onChange={handleChange}
        />
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={handleSaveChanges}
          sx={{ mb: 1 }}
        >
          Save Changes
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={handleOpenDialog}
        >
          Change Password
        </Button>
      </Box>

      <ChangePasswordDialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        userID={userData.userID}
        onSuccess={() => {
          setSnackbar({
            open: true,
            message: "Password updated successfully",
            severity: "success"
          });
        }}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}