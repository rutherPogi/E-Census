import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  useTheme
} from '@mui/material';
import { Person } from '@mui/icons-material';

import mswdoLogo from '../../../assets/MSWDO-Logo.png';




const Topbar = ({ onLogin }) => {
  
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2A2A3A'}}>
      <Toolbar>
        {/* Left side: Logo and Website Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {/* You can replace this with your actual logo */}
          <Box 
            component="img"
            src={mswdoLogo}
            sx={{ 
              height: 35, 
              marginRight: 2
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              fontWeight: 'bold',
              fontFamily: 'Prosto One',
              fontSize: '1rem',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            e-tbayat MSWDO
          </Typography>
        </Box>
        
        {/* Right side: Login Button */}
        <Button 
          onClick={onLogin}
          startIcon={<Person />}
          sx={{ 
            color: '#fff',
            borderRadius: 2,
            fontWeight: 'medium'
          }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;