import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Topbar from './components/Topbar';
import Banner from "./components/Banner";
import PostLists from "./PostLists";

export default function Home() {
  
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login')
  };


  return (
    <Box>
      <Topbar onLogin={handleLogin} />
      <Banner/>
      <Container
        sx = {{
          height: '100%', 
          width: '100%', 
          display: 'flex',
          flexDirection: 'column',
          marginTop: { xs: "40vh", md: "60vh" }
        }}
      >
        <PostLists/>
      </Container>
    </Box>
  );
}