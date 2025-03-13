import { Card, CardActionArea, CardContent, CardMedia, Button, Typography } from "@mui/material";


const Posts = ({ title, description, date, image }) => {

  return (
    <Card elevation={3} sx={{ mt: '5em' }}>
      <CardActionArea>
        {image && <CardMedia component="img" height="250" image={image} alt="news image" />}
        <CardContent>
          <Typography gutterBottom variant="h5" >
            {title} 
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
              {new Date(date).toDateString()}
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Posts; 