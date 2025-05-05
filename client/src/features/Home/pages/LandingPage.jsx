import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import Banner from "../components/Banner";
import PostLists from "./PostLists";
import Features from "../components/Features";

export default function LandingPage() {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  const today = new Date(2025, 2, 25).toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });

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

        <PostLists />
      </Container>

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
