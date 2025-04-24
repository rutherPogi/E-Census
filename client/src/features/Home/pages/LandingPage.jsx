import { useNavigate } from "react-router-dom";
import { Box, Typography, Container } from "@mui/material";
import Banner from "../components/Banner";
import PostLists from "./PostLists";
import Features from "../components/Features";


export default function LandingPage() {
  const navigate = useNavigate();
  
  const today = new Date(2025, 2, 25)
    .toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });


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
          px: { xs: 2, md: 4 },
          mb: { xs: 4, md: 6 },
        }}>
          <Features />
        </Box>
        <PostLists/>
      </Container>    
    </Box>
  );
}