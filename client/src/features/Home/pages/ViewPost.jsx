import { Container, Paper, Box, Typography, IconButton, Chip, Button } from "@mui/material";
import { ArrowBack, CalendarMonth, PersonOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { get } from "../../../utils/api/apiService";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import Topbar from "../components/Topbar";
import Banner from "../components/Banner";

export default function ViewPost() {

  const navigate = useNavigate();
  const { postID } = useParams();

  const [post, setPost] = useState({});
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  const [imagesLoading, setImagesLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const postResponse = await get(`/posts/get/${postID}`);
      const imagesResponse = await get(`/posts/get/${postID}/images`);
      setPost(postResponse);
      setImages(imagesResponse.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setImagesLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0);
  }, [postID]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Topbar/>
        <Banner />
        <Container sx={{ my: 4 }}>
          <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={400} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="100%" height={30} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="100%" height={30} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="100%" height={30} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="80%" height={30} />
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Topbar onLogin={handleLogin}/>
        <Banner />
        <Container sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            Error loading content
          </Typography>
          <Typography variant="body1" gutterBottom>
            {error}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleGoBack}
            startIcon={<ArrowBack />}
            sx={{ mt: 2 }}
          >
            Go Back
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Topbar onLogin={handleLogin}/>
      <Banner />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>

        {/* Back Button */}
        <Button 
          variant="outlined" 
          startIcon={<ArrowBack />} 
          onClick={handleGoBack}
          sx={{ mb: 3 }}
        >
          Back
        </Button>

        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 2, 
            overflow: 'hidden',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Post Header */}
          <Box 
            sx={{ 
              p: { xs: 2, sm: 3, md: 4 }, 
              borderBottom: '1px solid #eee',
              background: 'linear-gradient(to right, #FF5733, #FF7448)',
              color: 'white'
            }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              fontWeight="bold" 
              gutterBottom
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
            >
              {post.postTitle}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mt: 2 }}>
              <Chip 
                icon={<CalendarMonth fontSize="small" />} 
                label={formatDate(post.postDate)} 
                variant="outlined" 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  color: 'white',
                  borderColor: 'transparent' 
                }}
              />
              
              {post.category && (
                <Chip 
                  label={post.category || "News"} 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    borderColor: 'transparent' 
                  }}
                />
              )}
              
              {post.author && (
                <Chip 
                  icon={<PersonOutline fontSize="small" />}
                  label={post.author || "MSWDO Admin"} 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    borderColor: 'transparent' 
                  }}
                />
              )}
            </Box>
          </Box>
          
          {/* Image Gallery */}
          <Box sx={{ position: 'relative', bgcolor: '#000' }}>
            {imagesLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <CircularProgress sx={{ color: '#FF5733' }} />
              </Box>
            ) : images.length > 0 ? (
              <Box sx={{ position: 'relative' }}>
                <Box 
                  component="img" 
                  src={images[currentImageIndex]?.postImage}
                  alt={`Post Image ${currentImageIndex + 1}`}
                  sx={{ 
                    width: '100%', 
                    height: { xs: '250px', sm: '350px', md: '500px' },
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto',
                    backgroundColor: '#000'
                  }}
                  onError={(e) => {
                    console.error('Image failed to load');
                    e.target.onerror = null; 
                    e.target.src = 'path/to/fallback/image.jpg';
                  }}
                />
                
                {images.length > 1 && (
                  <>
                    <IconButton 
                      onClick={handlePrevImage}
                      sx={{ 
                        position: 'absolute', 
                        left: 16, 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                      }}
                    >
                      <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton 
                      onClick={handleNextImage}
                      sx={{ 
                        position: 'absolute', 
                        right: 16, 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                      }}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </>
                )}
                
                {/* Image Counter */}
                {images.length > 1 && (
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      bottom: 16, 
                      left: '50%', 
                      transform: 'translateX(-50%)', 
                      bgcolor: 'rgba(0,0,0,0.6)', 
                      px: 2, 
                      py: 0.5, 
                      borderRadius: 10,
                      color: 'white',
                      fontSize: '0.875rem'
                    }}
                  >
                    {currentImageIndex + 1} / {images.length}
                  </Box>
                )}
              </Box>
            ) : (
              <Box 
                sx={{ 
                  height: '200px', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  bgcolor: '#f5f5f5'
                }}
              >
                <Typography align="center" color="text.secondary">
                  No images available for this announcement.
                </Typography>
              </Box>
            )}
          </Box>
          
          {/* Post Content */}
          <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            {/* Post Description */}
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4, 
                lineHeight: 1.8,
                fontSize: { xs: '1rem', md: '1.1rem' },
                whiteSpace: 'pre-line' // Preserves line breaks in the text
              }}
            >
              {post.postDescription}
            </Typography>

          </Box>
        </Paper>
        
        {/* Related Posts section could be added here */}
      </Container>
    </Box>
  );
}