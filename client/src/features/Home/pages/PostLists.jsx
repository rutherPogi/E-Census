import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Container, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, BusinessCenterOutlined, InfoOutlined } from "@mui/icons-material";

import { get } from "../../../utils/api/apiService";
import Posts from "../components/Posts";

const PostLists = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [postImages, setPostImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Add state for carousel navigation
  const [newsCurrentPage, setNewsCurrentPage] = useState(0);
  const [servicesCurrentPage, setServicesCurrentPage] = useState(0);
  const postsPerPage = 4; // Number of posts to show per page

  const philippineDate = new Date().toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both posts and images
        const postsResponse = await get('/posts/getPosts');
        const imagesResponse = await get('/posts/getPostImages');
        
        setPosts(postsResponse.posts);
        setPostImages(imagesResponse.postImages);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const viewPost = (postID) => {
    console.log('NAVIGATING...')
    navigate(`/post/view/${postID}`);
  };

  // Helper function to find the first image for a post
  const getFirstImageForPost = (postID) => {
    const postImage = postImages.find(img => img.postID === postID);
    return postImage ? postImage.postImage : null;
  };
  
  // Filter posts by type
  const newsPosts = posts.filter(post => post.postType === "news");
  const servicesPosts = posts.filter(post => post.postType === "services");
  
  // Navigation handlers for carousel
  const handleNewsNext = () => {
    if ((newsCurrentPage + 1) * postsPerPage < newsPosts.length) {
      setNewsCurrentPage(newsCurrentPage + 1);
    }
  };
  
  const handleNewsPrev = () => {
    if (newsCurrentPage > 0) {
      setNewsCurrentPage(newsCurrentPage - 1);
    }
  };
  
  const handleServicesNext = () => {
    if ((servicesCurrentPage + 1) * postsPerPage < servicesPosts.length) {
      setServicesCurrentPage(servicesCurrentPage + 1);
    }
  };
  
  const handleServicesPrev = () => {
    if (servicesCurrentPage > 0) {
      setServicesCurrentPage(servicesCurrentPage - 1);
    }
  };
  
  // Get current posts for display
  const currentNewsPosts = newsPosts.slice(
    newsCurrentPage * postsPerPage, 
    (newsCurrentPage + 1) * postsPerPage
  );
  
  const currentServicesPosts = servicesPosts.slice(
    servicesCurrentPage * postsPerPage, 
    (servicesCurrentPage + 1) * postsPerPage
  );
 
  if (loading) return <Box>Loading posts...</Box>;
  if (error) return <Box>Error loading posts: {error}</Box>;

  return (
    <Container>    
      {/* NEWS and UPDATES */}
      <Box>
        <Box 
          sx={{
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: '5px solid #FF5733',
            pb: 2,
            mb: 3
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
              fontWeight: 'bold'
            }}
          >
            NEWS AND UPDATES
          </Typography>

          <Box sx={{ textAlign: 'right' }}>
            <Typography 
              variant="subtitle1"
              sx={{ 
                fontSize: { xs: '0.8rem', sm: '1rem' },
                fontWeight: 'bold'
              }}
            >
              Philippine Standard Time
            </Typography>
            <Typography 
              variant="subtitle1"
              sx={{ 
                fontSize: { xs: '0.8rem', sm: '1rem' }
              }}
            >
              {philippineDate}
            </Typography>
          </Box>
        </Box>

        <Box 
          sx={{ 
            px: { xs: 4, md: 6 }, 
            mb: 4, 
            position: 'relative'
          }}
        >
          {newsPosts.length > 0 ? (
            <>
              {/* Navigation arrows for NEWS - positioned outside content */}
              <IconButton 
                onClick={handleNewsPrev}
                disabled={newsCurrentPage === 0}
                sx={{ 
                  position: 'absolute', 
                  left: -20, 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
                }}
              >
                <ArrowBackIos />
              </IconButton>
              
              <Grid container spacing={3}>
                {currentNewsPosts.map((post, index) => (
                  <Grid item xs={12} sm={6} md={3} key={post.postID || index}>
                    <Posts 
                      title={post.postTitle}
                      description={post.postDescription}
                      date={post.postDate}
                      image={getFirstImageForPost(post.postID)}
                      onClick={() => viewPost(post.postID)}
                    />
                  </Grid>
                ))}
              </Grid>
              
              <IconButton 
                onClick={handleNewsNext}
                disabled={(newsCurrentPage + 1) * postsPerPage >= newsPosts.length}
                sx={{ 
                  position: 'absolute', 
                  right: -20, 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
                }}
              >
                <ArrowForwardIos />
              </IconButton>
            </>
          ) : (
            <Box 
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 6,
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                textAlign: 'center'
              }}
            >
              <InfoOutlined sx={{ fontSize: 60, color: '#aaa', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#555', mb: 1 }}>
                No News Available
              </Typography>
              <Typography variant="body1" sx={{ color: '#777', maxWidth: 500 }}>
                There are currently no news or updates to display. Please check back later for the latest information.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>   

      {/* SERVICES */}
      <Box>
        <Box 
          sx={{
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: '5px solid #FF5733',
            pb: 2,
            mb: 3
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
              fontWeight: 'bold'
            }}
          >
            SERVICES
          </Typography>
        </Box>

        <Box 
          sx={{ 
            px: { xs: 4, md: 6 }, 
            mb: 4,
            position: 'relative' 
          }}
        >
          {servicesPosts.length > 0 ? (
            <>
              {/* Navigation arrows for SERVICES - positioned outside content */}
              <IconButton 
                onClick={handleServicesPrev}
                disabled={servicesCurrentPage === 0}
                sx={{ 
                  position: 'absolute', 
                  left: -20, 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
                }}
              >
                <ArrowBackIos />
              </IconButton>
              
              <Grid container spacing={3}>
                {currentServicesPosts.map((post, index) => (
                  <Grid item xs={12} sm={6} md={3} key={post.postID || index}>
                    <Posts 
                      title={post.postTitle}
                      description={post.postDescription}
                      date={post.postDate}
                      image={getFirstImageForPost(post.postID)}
                      onClick={() => viewPost(post.postID)}
                    />
                  </Grid>
                ))}
              </Grid>
              
              <IconButton 
                onClick={handleServicesNext}
                disabled={(servicesCurrentPage + 1) * postsPerPage >= servicesPosts.length}
                sx={{ 
                  position: 'absolute', 
                  right: -20, 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
                }}
              >
                <ArrowForwardIos />
              </IconButton>
            </>
          ) : (
            <Box 
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 6,
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                textAlign: 'center'
              }}
            >
              <BusinessCenterOutlined sx={{ fontSize: 60, color: '#aaa', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#555', mb: 1 }}>
                No Services Available
              </Typography>
              <Typography variant="body1" sx={{ color: '#777', maxWidth: 500 }}>
                There are currently no services to display. Please check back later for available services.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default PostLists;