import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from '@mui/material';
import axios from "axios";

import logo from "../../../assets/MSWDO-Logo.png";
import { Notification } from "../../../components/common/Notification";
import { UsernameInput, PasswordInput } from "../../../components/common/FormFields";

import { useAuth } from '../../../utils/auth/authContext';
import { post } from '../../../utils/api/apiService';
import { useNotification } from "../../accounts/hooks/useNotification";



const Login = () => {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: false, password: false });
  const [isLoading, setIsLoading] = useState(false);

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isOnline) {
      return showNotification("You are offline. Please connect to the internet to log in.", "error");
    }
    
    // Form validation
    const newErrors = {
      username: username.trim() === "",
      password: password.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.username || newErrors.password) {
      return; // Stop form submission if there are errors
    }
    
    // Start loading state
    setIsLoading(true);
    console.log("Loggin In...");
    
    try {
      const res = await post("/auth/login", { username, password });
      
      if (!res.token) {
        return showNotification("Authentication error - no token received", "error");
      }

      const userData = {
        username: res.username,
        accountName: res.accountName,
        userID: res.userID,
        position: res.position
      };

      localStorage.setItem('authToken', res.token);
      localStorage.setItem('userData', JSON.stringify(userData));

      login(res.token, userData);

      axios.defaults.headers.common['Authorization'] = `Bearer ${res.token}`;

      showNotification("Login successful!", "success");
      setTimeout(() => navigate('/main'), 1500);
    } catch (err) {
      console.error(err);

      let errorMessage = "Error logging in";
      if (err.response?.status === 401) errorMessage = "Invalid username or password";
      else if (err.response?.status === 404) errorMessage = "User not found";
      showNotification(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <Box 
      sx={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: '40px', sm: '60px', md: '80px', lg: '100px' },
        backgroundColor: '#2A2A3A',
        padding: { xs: '16px', sm: '24px', md: '32px', lg: '40px' },
        boxSizing: 'border-box'
      }}
    >
      {/* Logo and header section */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%' 
      }}>
        <Box
          component="img"
          src={logo}
          alt="eCensus Logo"
          sx={{
            height: { xs: '40px', sm: '50px', md: '60px', lg: '80px' },
            marginBottom: { xs: '8px', sm: '12px', md: '16px' }
          }}
        />

        <Typography 
          variant="h2" 
          fontFamily={'Prosto One'} 
          color="#fff"
          sx={{ 
            fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '36px' }
          }}
        > 
          <span style={{ color: '#FF5733' }}>e</span>Tbayat
        </Typography>
        
        <Typography 
          variant="body1" 
          color="#E0E0E0"
          textAlign="center"
          sx={{ 
            mt: { xs: 1, sm: 1.5, md: 2 }, 
            mb: 1,
            px: 2,
            fontSize: { xs: '14px', sm: '16px' }
          }}
        >
          Please login to access your account.
        </Typography>
      </Box>
            
      {/* Login form */}
      <Box 
        component="form" 
        onSubmit={handleLogin} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: { xs: 2, sm: 2.5, md: 3 }, 
          width: { xs: '100%', sm: '350px', md: '400px', lg: '450px' },
          maxWidth: '90%'
        }}
      >
        {/* Form fields */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5, md: 3 } }}>
          <UsernameInput
            label="Username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
            helperText={errors.username ? "Please enter your username" : ""}
            placeholder="Enter username"
            required
            fullWidth
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            helperText={errors.password ? "Please enter your password" : ""}
            fullWidth
          />
        </Box>
        
        {/* Login button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ 
            py: { xs: 1, sm: 1.25, md: 1.5 }, 
            backgroundColor: '#FF5733', 
            color: 'white',
            fontSize: { xs: '14px', sm: '15px', md: '16px' },
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#e65100',
            },
            borderRadius: '4px',
            textTransform: 'none',
            mt: { xs: 1, sm: 1.5, md: 2 }
          }}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </Box>

      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />
    </Box>
  );
};

export default Login;