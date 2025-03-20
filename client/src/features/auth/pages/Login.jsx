import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Snackbar, Alert, useMediaQuery } from '@mui/material';
import axios from "axios";

import logo from "../../../assets/questionnaire.png";
import { useAuth } from '../../../utils/auth/authContext';
import { UsernameInput, PasswordInput } from "../../../components/common/FormFields";



const Login = () => {
  // State variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: false, password: false });
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Hooks
  const { login } = useAuth();
  const navigate = useNavigate();

  // Helper functions
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Form submission handler
  const handleLogin = async (e) => {
    e.preventDefault();
    
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
    
    try {
      // API call to login
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        username,
        password,
      });
      
      // Validate token from response
      if (!res.data.token) {
        console.error("No token received from server");
        setSnackbar({ 
          open: true, 
          message: "Authentication error - no token received", 
          severity: "error" 
        });
        return;
      }

      
      // Store token, user data and update auth context
      const userData = {
        username: res.data.username,
        accountName: res.data.accountName,
        userID: res.data.userID,
        position: res.data.position
      };

      login(res.data.token, userData);
      
      // Set authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      // Show success message and redirect
      setSnackbar({ open: true, message: "Login successful!", severity: "success" });
      setTimeout(() => navigate('/main'), 1500);
    } catch (err) {
      console.error(err);
      
      // Handle different error cases
      let errorMessage = "Error logging in";
      if (err.response?.status === 401) errorMessage = "Invalid username or password";
      else if (err.response?.status === 404) errorMessage = "User not found";
      
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
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
        gap: '100px',
        backgroundColor: '#2A2A3A',
        padding: { xs: '20px', sm: '40px' },
        boxSizing: 'border-box'

      }}>

      {/* Logo and header section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Box
          component="img"
          src={logo}
          alt="eCensus Logo"
          sx={{
            height: { xs: '50px', sm: '80px' },
            marginBottom: '16px'
          }}
        />

        <Typography 
          variant="h2" 
          fontFamily={'Prosto One'} 
          color="#fff"
          sx={{ fontSize: { xs: '28px', sm: '36px' } }}
        > 
          <span style={{ color: '#FF5733' }}>e</span>Census
        </Typography>
        
        <Typography 
          variant="body1" 
          color="#E0E0E0"
          textAlign="center"
          sx={{ mt: 2, mb: 1 }}
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
            gap: 3, 
            width: '450px' 
          }}
        >
          {/* Form fields */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <UsernameInput
              label="Username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
              helperText={errors.username ? "Please enter your username" : ""}
              placeholder="Enter username"
              required
            />
            
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              helperText={errors.password ? "Please enter your password" : ""}
            />
          </Box>
          
          {/* Login button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              py: 1.5, 
              backgroundColor: '#FF5733', 
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#e65100',
              },
              borderRadius: '4px',
              textTransform: 'none'
            }}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          
          {/* Forgot password link */}
          <Typography 
            component={Link} 
            to="/forgot-password"
            variant="body2" 
            color="#E0E0E0"
            textAlign="center"
            sx={{ 
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
                color: '#FF5733'
              },
              cursor: 'pointer'
            }}
          >
            Forgot Password?
          </Typography>
        </Box>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;