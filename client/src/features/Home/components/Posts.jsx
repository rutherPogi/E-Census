import { Box, Card, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material";

const getImageSource = (imageData) => {
  if (!imageData) {
    return "/api/placeholder/400/200";
  }
  
  if (typeof imageData === 'string') {
    return imageData;
  }
  
  console.error('Invalid image data format');
  return "/api/placeholder/400/200";
};

const Posts = ({ title, description, date, image, onClick }) => {
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
    <Card sx={{ maxWidth: 345, height: '100%' }}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="140"
          image={imageSource}
          alt={title}
        />
        <CardContent>
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '1rem', sm: '1.25rem' },
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%'
            }}
          >
            {title}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mt: 1,
              mb: 2, 
              fontSize: { xs: '0.75rem', sm: '0.875rem' }, 
              fontWeight: 'bold'
            }}
          >
            {formattedDate}
          </Typography>

          {description && (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                mb: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical'
              }}
            >
              {description}
            </Typography>
          )}

          <Typography 
            variant="body2" 
            color="primary"
            sx={{ 
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              fontWeight: 'bold'
            }}
          >
            READ MORE
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Posts;