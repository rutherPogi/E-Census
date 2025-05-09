import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import Banner from "../components/Banner";
import PostLists from "../components/PostLists";
import Features from "../components/Features";
import Topbar from "../components/Topbar";

export default function LandingPage() {

  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  const handleLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);


  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', bgcolor: '#fff' }}>

      <Topbar onLogin={handleLogin}/>      
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: {xs: 5, sm: 10}}}>
        <Banner />
        <Features/>
        <PostLists />
      </Box>
      

      {/* Install Button at Bottom */}
      {showInstallButton && (
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            zIndex: 1300, // above other content
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleInstallClick}
            sx={{ borderRadius: 8, px: 4, py: 1.5 }}
          >
            Install App
          </Button>
        </Box>
      )}
    </Box>
  );
}
