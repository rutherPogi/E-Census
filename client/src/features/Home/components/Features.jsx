import { Typography, Box, useTheme } from "@mui/material";

import digitalSurvey from '../../../assets/digitalSurvey.png';
import idGenerator from '../../../assets/idGenerator.png';
import hazzardMap from '../../../assets/hazzardMap.png';



const FeatureBox = ({ image, title, description }) => {

  const theme = useTheme();
  
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        p: { xs: 1, sm: 2 },
        maxWidth: { xs: 250, sm: 300 },
        width: '100%',
        borderRadius: 2
      }}
    >
      <Box 
        className="image-container"
        sx={{
          border: {xs: '3px solid #DC623C', sm: '5px solid #DC623C'},
          borderRadius: '50%',
          width: { xs: 40, sm: 100 },
          height: { xs: 40, sm: 100 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          mb: 2,
          padding: { xs: 2, sm: 3 }
        }}
      >
        <Box 
          component="img"
          src={image} 
          alt={title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      
      <Typography 
        className="feature-title"
        sx={{
          color: '#DC623C',
          fontSize: { xs: 16, sm: 20, md: 24 }, 
          fontWeight: 'bold'
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};


const Features = () => {

  // Feature data
  const features = [
    {
      image: digitalSurvey,
      title: "Digital Census"
    },
    {
      image: idGenerator,
      title: "ID Generator"
    },
    {
      image: hazzardMap,
      title: "Hazard Map"
    }
  ];

  return (
    <Box 
      sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: { xs: .5, md: 5 },
        width: '100%'
      }}
    >
      {features.map((feature, index) => (
        <FeatureBox key={index} {...feature} />
      ))}
    </Box>
  );
};

export default Features;