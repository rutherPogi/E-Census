// PostLists.jsx - With Multi-Select Delete Functionality
import { 
  Divider, Container, Paper, Box, IconButton, Typography,
  Tabs, Tab, Pagination, Stack, Checkbox, Button, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import Posts from "../components/Posts";
import { useState, useEffect, useRef } from "react";
import { get, del, post } from "../../../utils/api/apiService";
import { Add, Visibility, Edit, Delete, Newspaper, DeleteSweep } from "@mui/icons-material";
import { Notification } from "../../../components/common";
import { useNotification } from "../../survey/hooks/useNotification";
import { useNavigate } from "react-router-dom";

// Tab Panel component to display content based on selected tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Props for accessibility
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const POSTS_PER_PAGE = 5;

const PostLists = () => {

  const navigate = useNavigate();
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  
  // Pagination states
  const [newsPage, setNewsPage] = useState(1);
  const [servicesPage, setServicesPage] = useState(1);
  
  // Multi-select states
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Clear selections when changing tabs
    setSelectedPosts([]);
  };

  const handleNewsPageChange = (event, value) => {
    setNewsPage(value);
    // Clear selections when changing pages
    setSelectedPosts([]);
  };

  const handleServicesPageChange = (event, value) => {
    setServicesPage(value);
    // Clear selections when changing pages
    setSelectedPosts([]);
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await get('/posts/getPosts');
      const { posts } = response;
      setPosts(posts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Reset to first page when switching tabs
  useEffect(() => {
    if (tabValue === 0) {
      setNewsPage(1);
    } else {
      setServicesPage(1);
    }
  }, [tabValue]);

  const handleDeletePost = async (postID) => {
    try {
      await del(`/posts/delete/${postID}`);
      showNotification('Post Deleted Successfully!', 'success');
      fetchPosts();
      // Clear selection after deletion
      setSelectedPosts([]);
    } catch (err) {
      showNotification('Error deleting post. Please try again.', 'error');
    } 
  }

  const handleViewPost = async (postID) => {
    navigate(`/main/post/view/${postID}`);
  };

  const handleEditPost = async (postID) => {
    navigate(`/main/post/edit/${postID}`);
  };

  // Handle checkbox selection
  const handleSelectPost = (postID) => {
    
    setSelectedPosts(prev => {
      if (prev.includes(postID)) {
        return prev.filter(id => id !== postID);
      } else {
        return [...prev, postID];
      }
    });
    console.log('Post ID:', postID);
    console.log('Selected Posts:', selectedPosts);
  };

  // Opens confirmation dialog for bulk delete
  const openConfirmDeleteDialog = () => {
    setConfirmDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setConfirmDialogOpen(false);
  };

  // Handle multiple post deletion
  const handleMultipleDelete = async () => {
    

    handleCloseDialog();

    // Add a small delay to ensure dialog is fully closed before proceeding
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Track success and failure
    let successCount = 0;
    let failCount = 0;
    
    try {
      
      // Process deletions sequentially
      for (const postID of selectedPosts) {
        try {
          await post('/posts/delete-multiple', { ids: selectedPosts });
          successCount++;
        } catch (err) {
          console.error(`Error deleting post ID ${postID}:`, err);
          failCount++;
        }
      }
      console.log('Fail Count:', failCount);
      console.log('Success Count:', successCount);
      // Show appropriate message
      if (failCount === 0) {
        showNotification(`Successfully deleted ${successCount} posts!`, 'success');
      } else {
        showNotification(`Deleted ${successCount} posts, but ${failCount} deletions failed.`, 'warning');
      }
      
      // Refresh posts and clear selections
      await fetchPosts();
      setSelectedPosts([]);
    } catch (err) {
      showNotification('Error processing deletion. Please try again.', 'error');
    }
  };

 
  if (loading) return <Box>Loading posts...</Box>;
  if (error) return <Box>Error loading posts: {error}</Box>;

  // Filter posts by type
  const newsPosts = posts.filter(post => post.postType === 'news');
  const servicesPosts = posts.filter(post => post.postType === 'services');

  // Calculate pagination
  const newsPageCount = Math.ceil(newsPosts.length / POSTS_PER_PAGE);
  const servicesPageCount = Math.ceil(servicesPosts.length / POSTS_PER_PAGE);
  
  // Get current page posts
  const paginateData = (data, page) => {
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    return data.slice(startIndex, startIndex + POSTS_PER_PAGE);
  };

  const currentNewsPosts = paginateData(newsPosts, newsPage);
  const currentServicesPosts = paginateData(servicesPosts, servicesPage);

  // Determine current visible posts based on active tab
  const currentPosts = tabValue === 0 ? currentNewsPosts : currentServicesPosts;

  // Function to render posts list
  const renderPostsList = (postsList) => {
    if (postsList.length === 0) {
      return <Typography sx={{ py: 2 }}>No posts available.</Typography>;
    }
    
    return postsList.map((post, index) => (
      <Box key={post.postID || index}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          border: '1px solid #ccc', 
          borderRadius: 2, 
          padding: 2,
          mb: 2,
          backgroundColor: selectedPosts.includes(post.postID) ? 'rgba(25, 118, 210, 0.08)' : 'transparent'
        }}
      >
        {/* Checkbox for selection */}
        <Box sx={{ mr: 2 }}>
          <Checkbox 
            checked={selectedPosts.includes(post.postID)}
            onChange={() => handleSelectPost(post.postID)}
            color="primary"
          />
        </Box>

        {/* Post Content Area */}
        <Box sx={{ width: '100%' }}>
          <Posts 
            title={post.postTitle}
            description={post.postDescription}
            date={post.postDate}
            image={post.postImage}
          />
        </Box>

        {/* Buttons Area */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            flex: '1'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton 
              color="primary" 
              size="small"
              onClick={() => handleEditPost(post.postID)}
              aria-label="edit post"
            >
              <Edit />
            </IconButton>
            <Typography variant="caption" color='primary'>
              Edit
            </Typography>
          </Box>
        </Box>
      </Box>
    ));
  };

  return (
    <Container component={Paper} 
      sx = {{ 
        borderRadius: 2, 
        backgroundColor: "#fff", 
        p: 5, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 3 
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center'}}>
          <Newspaper/>
          <Typography variant='h5' fontWeight={'bold'}>NEWS AND SERVICES</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                endIcon={<Add />}
                onClick={() => navigate('/main/post/add')}
                sx={{ fontSize: '0.75rem' }} // smaller text
              >
                ADD POST
              </Button>
            </Box>
          
          {/* Bulk Delete Button */}
          {selectedPosts.length > 0 && (
            <Button 
              variant="contained" 
              color="error" 
              startIcon={<DeleteSweep />}
              onClick={openConfirmDeleteDialog}
              sx={{ height: 'fit-content' }}
            >
              Delete Selected ({selectedPosts.length})
            </Button>
          )}
        </Box> 
      </Box>

      <Divider/>

      {/* Tabs Section */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="post types tabs"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label={`News (${newsPosts.length})`} {...a11yProps(0)} />
            <Tab label={`Services (${servicesPosts.length})`} {...a11yProps(1)} />
          </Tabs>
        </Box>

        {/* News Tab Panel */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {selectedPosts.length > 0 && (
              <Typography variant="body2" sx={{ mb: 2 }}>
                {selectedPosts.length} post{selectedPosts.length > 1 ? 's' : ''} selected
              </Typography>
            )}
            
            {renderPostsList(currentNewsPosts)}
            
            {/* Pagination for News */}
            {newsPageCount > 1 && (
              <Stack spacing={2} sx={{ mt: 3 }}>
                <Pagination 
                  count={newsPageCount} 
                  page={newsPage}
                  onChange={handleNewsPageChange}
                  color="primary"
                  sx={{ alignSelf: 'center' }}
                />
                <Typography variant="body2" color="text.secondary" align="center">
                  Page {newsPage} of {newsPageCount} ({newsPosts.length} posts)
                </Typography>
              </Stack>
            )}
          </Box>
        </TabPanel>

        {/* Services Tab Panel */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {selectedPosts.length > 0 && (
              <Typography variant="body2" sx={{ mb: 2 }}>
                {selectedPosts.length} post{selectedPosts.length > 1 ? 's' : ''} selected
              </Typography>
            )}
            
            {renderPostsList(currentServicesPosts)}
            
            {/* Pagination for Services */}
            {servicesPageCount > 1 && (
              <Stack spacing={2} sx={{ mt: 3 }}>
                <Pagination 
                  count={servicesPageCount} 
                  page={servicesPage}
                  onChange={handleServicesPageChange}
                  color="primary"
                  sx={{ alignSelf: 'center' }}
                />
                <Typography variant="body2" color="text.secondary" align="center">
                  Page {servicesPage} of {servicesPageCount} ({servicesPosts.length} posts)
                </Typography>
              </Stack>
            )}
          </Box>
        </TabPanel>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        keepMounted={false}
        disableRestoreFocus
        disableEnforceFocus
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Multiple Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete {selectedPosts.length} selected post{selectedPosts.length > 1 ? 's' : ''}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleMultipleDelete} color="error" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      /> 
    </Container>
  );
};

export default PostLists;