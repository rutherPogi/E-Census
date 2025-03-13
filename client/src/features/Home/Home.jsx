import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Banner from "./components/Banner";
import PostLists from "./PostLists";
import Features from "./components/Features";

/**
 * Main Home component that serves as the landing page
 * for the eCensus application
 */
export default function Home() {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString();

  // Navigation handler
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Hero Banner Section */}
      <Banner onLogin={handleLogin} />
      
      {/* Features Section */}
      <Box sx={{ 
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 }
      }}>
        <Features />
      </Box>
      
      {/* News Section Header */}
      <Box 
        sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '4px solid #FF5733',
          px: { xs: 2, md: 4 },
          mb: 3
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' } 
          }}
        >
          News and Updates
        </Typography>
        <Typography 
          variant="subtitle1"
          sx={{ 
            fontSize: { xs: '0.8rem', sm: '1rem' } 
          }}
        >
          {today}
        </Typography>
      </Box>
      
      {/* News Content */}
      <Box sx={{ px: { xs: 2, md: 4 }, mb: 4 }}>
        <PostLists />
      </Box>
    </Box>
  );
}