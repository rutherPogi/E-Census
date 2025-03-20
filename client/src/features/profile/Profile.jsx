import { useState } from "react";
import { Container, Paper, Box, Typography, TextField,
         Button, Avatar, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff, PhotoCamera } from "@mui/icons-material";

import { useAuth } from "../../utils/auth/authContext";



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

  const { userData } = useAuth();
  const userInitials = getInitials(userData.accountName);

  const [formData, setFormData] = useState({
    name: userData.accountName,
    username: userData.username,
    password: "",
    showPassword: false,
    photo: userData.photo || "https://via.placeholder.com/150" // Placeholder image
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    // Implement update logic (e.g., API call to update user info)
  };

  return (
    <Container component={Paper} sx={{ p: 4, maxWidth: 500 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Avatar sx={{ bgcolor: '#DC623C', height: 100, width: 100, fontSize: '36px' }}>{userInitials}</Avatar>
        <IconButton component="label">
          <PhotoCamera />
          <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
        </IconButton>
        <Typography variant="h6">Edit Profile</Typography>
        <TextField label="Name" name="name" fullWidth value={formData.name} onChange={handleChange} />
        <TextField label="Username" name="username" fullWidth value={formData.username} onChange={handleChange} />
        <TextField
          label="Password"
          name="password"
          type={formData.showPassword ? "text" : "password"}
          fullWidth
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
}
