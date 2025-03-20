import { Box, Card, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material";

const getImageSource = (imageData) => {
  if (!imageData) {
    console.log('No image data received');
    return null;
  }
  
  // The imageData should already be a complete data URL from the backend
  if (typeof imageData === 'string') {
    return imageData;
  }
  
  console.error('Invalid image data format');
  return null;
};


const Posts = ({ title, description, date, image }) => {
  // Format date for display
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
        }
      }}
    >
      <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <CardMedia
          component="img"
          height="160"
          image={getImageSource(image)}
          alt={title}
          sx={{
            objectFit: 'cover'
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography 
            variant="h6" 
            component="div" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          >
            {formattedDate}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.primary"
            sx={{ 
              fontSize: { xs: '0.8rem', sm: '0.9rem' } 
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Posts;