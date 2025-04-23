import { Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import digitalSurvey from '../../../assets/digitalSurvey.png';
import idGenerator from '../../../assets/idGenerator.png';
import hazzardMap from '../../../assets/hazzardMap.png';



const FeatureBox = ({ image, title, description }) => (
  <Box 
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      p: 2,
      maxWidth: 300,
      width: '100%',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)'
      }
    }}
  >
    <Box 
      component="img"
      src={image} 
      alt={title}
      sx={{
        width: 100,
        height: 100,
        mb: 2
      }}
    />
    <Typography 
      sx={{ 
        fontSize: { xs: 20, sm: 24 }, 
        fontWeight: 'bold',
        mb: 1
      }}
    >
      {title}
    </Typography>
  </Box>
);

/**
 * Features section component showing key app functionalities
 */
const Features = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        gap: { xs: 3, md: 5 },
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