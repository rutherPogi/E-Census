import { AppBar, Toolbar, Typography, Button, Tooltip, Box } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

const Topbar = ({ onLogin }) => {
  return (
    <Box   // Ensures the topbar stays at the top and does not scroll
      sx={{
        width: '100%',
        position: "absolute", // Makes it go behind the Topbar
        top: 0,
        zIndex: 2// Ensures it stays above other elements
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LOGO on the left */}
        <Typography variant="h6" sx={{ fontWeight: "bold", color: '#fff'}}>
          LOGO
        </Typography>

        {/* Logout button on the right */}
        <Tooltip title='Login'>
          <Button
            startIcon={<PersonIcon />}
            onClick={onLogin}
            sx = {{ color: '#fff'}}
          >
            Login
          </Button>
        </Tooltip>
      </Toolbar>
    </Box>
  );
};

export default Topbar;
