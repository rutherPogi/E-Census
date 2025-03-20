import { useNavigate } from "react-router-dom";
import { Box, Typography, Container } from "@mui/material";
import Banner from "./components/Banner";
import PostLists from "./PostLists";
import Features from "./components/Features";


export default function LandingPage() {
  const navigate = useNavigate();
  const today = new Date(2025, 2, 25)
    .toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });

  // Navigation handler
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', bgcolor: '#fff'}}>
      {/* Hero Banner Section */}
      <Banner onLogin={handleLogin} />
      
      <Container>
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
            borderBottom: '5px solid #FF5733',
            pb: 2,
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
      </Container>
      
    </Box>
  );
}