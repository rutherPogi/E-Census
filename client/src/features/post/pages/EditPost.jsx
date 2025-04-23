// src/features/posts/components/EditPost.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { INITIAL_VALUES, INITIAL_ERRORS } from "../utils/constants";
import { useAuth } from '../../../utils/auth/authContext';
import { get, put } from "../../../utils/api/apiService";
import { useNotification } from "../hooks/useNotification";
import PostForm from "../components/PostForm";
import { CircularProgress, Box } from "@mui/material";

export default function EditPost() {
  const { postID } = useParams();
  const { userData } = useAuth();
  const userID = userData.userID;

  const [values, setValues] = useState(INITIAL_VALUES(userID));
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const notificationState = useNotification();
  const { showNotification } = notificationState;

  // Fetch post data when component mounts
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // Fetch main post data
        const postResponse = await get(`/posts/get/${postID}`);
        const postData = postResponse;
        console.log('POST DATA:', postData);
        
        // Fetch post images
        const imagesResponse = await get(`/posts/get/${postID}/images`);
        const postImages = imagesResponse.data || [];
        console.log('POST IMAGES:', postImages);
        
        // Set form values from fetched data
        setValues({
          userID: userID,
          postID: postData.postID,
          postTitle: postData.postTitle,
          postDescription: postData.postDescription,
          postType: postData.postType,
          images: [] // Will hold any new images uploaded during edit
        });
        
        // Create image previews from existing images
        if (postImages && postImages.length > 0) {
          const previews = postImages.map((img, index) => ({
            url: img.postImage, // Assuming this is already a data URL
            id: img.postImagesID,
            isExisting: true
          }));
          setImagePreviews(previews);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post data:", error);
        showNotification('Failed to load post data. Please try again.', 'error');
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postID, userID]);

  const validateForm = () => {
    const newErrors = { ...INITIAL_ERRORS };
    let isValid = true;

    if (!values.postTitle.trim()) {
      newErrors.postTitle = "Title is required";
      isValid = false;
    }

    if (!values.postDescription.trim()) {
      newErrors.postDescription = "Description is required";
      isValid = false;
    }

    if (!values.postType) {
      newErrors.postType = "Please select a post type";
      isValid = false;
    }

    // For edit, we need to check if there are either existing images or new images
    if (imagePreviews.length === 0) {
      newErrors.images = "Please upload at least one image";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {

    if (!validateForm()) {
      return showNotification('Please fill in all required fields', 'error');
    }

    try {
      const formData = new FormData();

      console.log('POST ID:', values.postID)
      formData.append('userID', values.userID);
      formData.append('postTitle', values.postTitle);
      formData.append('postDescription', values.postDescription);
      formData.append('postType', values.postType);
      
      // Add information about existing images to keep or delete
      values.images.forEach((image) => {
        formData.append('image', image);
      });


      console.log("Sending update form data:", Object.fromEntries(formData));
      console.log('POST ID:', values.postID);
      const response = await put(`/posts/update/${values.postID}`, formData, true);
      if (response.success) return showNotification('Post updated successfully!', 'success');
      fetchPostData();
    } catch (error) {
      console.error("Error updating post:", error);
      showNotification('Error updating post. Please try again.', 'error');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PostForm
      title="EDIT NEWS"
      initialValues={values}
      errors={errors}
      setErrors={setErrors}
      values={values}
      setValues={setValues}
      imagePreviews={imagePreviews}
      setImagePreviews={setImagePreviews}
      handleSubmit={handleSubmit}
      notificationState={notificationState}
    />
  );
}