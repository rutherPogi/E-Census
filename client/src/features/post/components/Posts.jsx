import { Box, Button, Card, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material";
import { Edit } from "@mui/icons-material";

const getImageSource = (imageData) => {
  if (!imageData) {
    
    // Return a default/placeholder image instead of null
    return '/path/to/placeholder-image.jpg'; // Replace with your placeholder image path
  }
  
  // The imageData should already be a complete data URL from the backend
  if (typeof imageData === 'string') {
    return imageData;
  }
  
  console.error('Invalid image data format');
  return '/path/to/placeholder-image.jpg'; // Return placeholder for invalid format too
};

const Posts = ({ title, description, date, image }) => {
  let formattedDate;

  try {
    formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : 'No date';
  } catch (error) {
    console.error('Error formatting date:', error);
    formattedDate = 'Invalid date';
  }

  // Safely get image source
  const imageSource = getImageSource(image);

  return (
    <Box 
      sx={{ 
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
      }}
    >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          flex: 1
        }}>
          <Typography variant="h6" component="div"
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '1rem', sm: '1.25rem' },
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '200px'
            }}
          >
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary"
            sx={{ 
              mb: 2, 
              fontSize: { xs: '0.75rem', sm: '0.875rem' }, 
              fontWeight: 'bold'
            }}
          >
            {formattedDate}
          </Typography>
        </Box>
    </Box>
  );
};

export default Posts;