import { Container, Paper, Box, Typography, IconButton } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { get } from "../../../utils/api/apiService";
import Banner from '../components/Banner';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from '@mui/material/CircularProgress';



export default function ViewPost () {

  const { postID } = useParams();

  const [post, setPost] = useState({});
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
  }, []);

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

  if (loading) return <Box>Loading posts...</Box>;



  return (
    <>
    <Banner  />


    <Container component={Paper}
      sx={{ borderRadius: 2, backgroundColor: "#fff", p: 5, display: 'flex', flexDirection: 'column', gap: 5 }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <IconButton 
          //onClick={onBack}
          size="medium"
          sx={{ mr: 1 }}
        >
          <ArrowBack/>
        </IconButton>
        <Typography variant='h7' color='text.secondary'>
          Back
        </Typography>
      </Box>
      
      <Box sx={{ position: 'relative', minHeight: '300px', borderRadius: 2 }}>
        {imagesLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <CircularProgress />
          </Box>
        ) : images.length > 0 ? (
          <Box sx={{ position: 'relative' }}>
            <Box 
              component="img" 
              src={images[currentImageIndex]?.postImage}
              alt={`Post Image ${currentImageIndex + 1}`}
              sx={{ 
                width: '100%', 
                height: '400px',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto',
                borderRadius: 2
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
                    left: 0, 
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
                    right: 0, 
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
          </Box>
        ) : (
          <Typography align="center">No images available.</Typography>
        )}
      </Box>


    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant='h4' fontWeight={'bold'}>
        {post.postTitle}
      </Typography>
      <Typography variant='h7' color='text.secondary'>
        {new Date(post.postDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Typography>
    </Box>
    
    <Typography variant='h7'>
      {post.postDescription}
    </Typography>


      
    </Container>
    </>
    

  )
}