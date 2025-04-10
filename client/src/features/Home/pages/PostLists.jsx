// PostLists.jsx - Updated version
import { Box, Grid } from "@mui/material";
import Posts from "../components/Posts";
import { useState, useEffect } from "react";
import { get } from "../../../utils/api/apiService";

const PostLists = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await get('/posts/getPosts');
        setPosts(response);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  
  if (loading) return <Box>Loading posts...</Box>;
  if (error) return <Box>Error loading posts: {error}</Box>;

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <Grid item key={post.id || index} xs={12} sm={6} md={4}>
            <Posts 
              title = {post.postTitle}
              description = {post.postDescription}
              date = {post.postDate}
              image = {post.postImage}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PostLists;