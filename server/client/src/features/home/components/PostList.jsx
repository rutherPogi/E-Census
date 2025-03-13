// File: src/components/PostList.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button,
  Box 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Typography>Loading posts...</Typography>;
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Latest News
        </Typography>
        <Button 
          component={Link} 
          to="/create" 
          variant="contained" 
          color="primary"
          startIcon={<AddIcon />}
        >
          Create Post
        </Button>
      </Box>
      <Grid container spacing={4}>
        {posts.map(post => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:5000/uploads/${post.image}`}
                alt={post.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.description.substring(0, 100)}...
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button 
                    component={Link} 
                    to={`/post/${post._id}`} 
                    variant="outlined" 
                    size="small"
                  >
                    Read More
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PostList;