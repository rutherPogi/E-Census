import { Box, Typography } from "@mui/material";
import bannerImage from "../../../assets/image2.jpg"

const Banner = () => {

  return (
    <Box 
      sx={{
        position: "absolute", // Makes it go behind the Topbar
        top: 0, // Start at the top of the pageposition: "relative",
        width: "100%",
        height: { xs: "40vh", md: "60vh" }, // Adjust height for mobile and desktop
        backgroundImage: `url(${bannerImage})`, // Use public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white"
      }}
    >
      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.1)"
        }}
      />

      {/* Text Content */}
      <Box>
        <Typography
          variant="h3"
          sx={{
            position: "relative",
            zIndex: 1,
            fontWeight: "bold",
          }}
        >
          Welcome to the Website!
        </Typography>

        <Typography
          variant="h6"
          sx={{
            position: "relative",
            zIndex: 1,
            fontWeight: "bold",
          }}
        >
          Hatdog na malaki!
        </Typography>
      </Box>
      

      <Box
        sx = {{
          height: 100,
          width: 100,
          backgroundColor: '#fff',
          borderRadius: 50,
          zIndex: 1
        }}
      />
    </Box>
  );
};

export default Banner;