import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../../utils/auth/authContext';
import { PasswordInput, TextInput } from '../../../components/common/FormFields';
import { Box, Button, Typography, Container, Snackbar, Alert, useMediaQuery } from '@mui/material';
import loginImage from "../../../assets/image1.jpg"
import axios from "axios";
 
const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: false, password: false });
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const { login } = useAuth();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width: 960px)'); // Hides image on tablet and smaller

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const newErrors = {
      username: username.trim() === "",
      password: password.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.username || newErrors.password) {
      return;
    }
    
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        username,
        password,
      });
      
      // Check if the response contains a token
      if (!res.data.token) {
        console.error("No token received from server");
        alert("Authentication error - no token received");
        return;
      }
      
      // Pass the token to your auth context
      login(res.data.token);
      
      // Set the authorization header for future axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      setSnackbar({ open: true, message: "Login successful!", severity: "success" });
      setTimeout(() => navigate('/main'), 1500);
    } catch (err) {
      console.error(err);
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
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        backgroundColor: 'var(--body-color)'
      }}>


      <Container disableGutters
        sx = {{
          display: 'flex',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '1em',
          width: { md: '100%', lg: '80%'},
          height: '80%'
        }}>

        {!isSmallScreen && (
          <Box
            sx = {{
              flex: 1,
              backgroundImage: `url(${loginImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              overflow: 'hidden',
              borderRadius: '.5em 0 0 .5em'
            }}
          />
        )}

        <Container 
          sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            backgroundColor: '#fff',
            borderRadius: '0 .5em .5em 0'
          }}
        >       
          <Box sx = {{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', }}>
            {/* LOGO */} 
            <Box sx = {{ width: 150, height: 150, border: '2px solid #303030', borderRadius: 1, }}/>

            {/* TEXT */} 
            <Box sx = {{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', }}>
              <Typography component="h1" variant="h5" fontWeight="bold" sx={{color: '#303030'}}>
                LOG 
                <Typography component="span" variant="h5" color="#e65100" fontWeight="bold" sx = {{ ml: 1 }}>
                  IN
                </Typography>
              </Typography>
            </Box>
          </Box>
            
          {/* LOGIN FORM */} 
          <Box component="form" onSubmit={handleLogin} 
            sx = {{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 3, 
              width: '100%' 
            }}>
              <Box sx = {{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextInput
                  label =  'Username'
                  autofocus
                  value =  {username}
                  onChange =  {(e) => setUsername(e.target.value)}
                  error =  {errors.username}
                  helperText =  {errors.username ? "Please enter your username" : ""}
                  placeholder = 'ex. juanDelaCruz'
                  required
                />
                <PasswordInput
                  value =  {password}
                  onChange =  {(e) => setPassword(e.target.value)}
                  error =  {errors.password}
                  helperText =  {errors.password ? "Please enter your password" : ""}
                />
              </Box>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color=""
                sx={{ py: 1.5, backgroundColor: '#e65100', color: 'white' }}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              
              <Box display="flex" justifyContent="center">
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Link 
                    component="button" 
                    variant="body2" 
                    onClick={handleRegisterRedirect}
                    underline="hover"
                  >
                    Register here
                  </Link>
                </Typography>
              </Box>
          </Box>

        </Container>
      </Container>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      
    </Box>
  );
};

export default Login;