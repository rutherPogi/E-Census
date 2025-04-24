// src/features/posts/components/AddPost.jsx
import { useState } from "react";
import { INITIAL_VALUES, INITIAL_ERRORS } from "../utils/constants";
import { useAuth } from '../../../utils/auth/authContext';
import { post } from "../../../utils/api/apiService";
import { useNotification } from "../hooks/useNotification";
import PostForm from "../components/PostForm";

export default function AddPost() {
  const { userData } = useAuth();
  const userID = userData.userID;

  const [values, setValues] = useState(INITIAL_VALUES(userID));
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [imagePreviews, setImagePreviews] = useState([]);
  
  const notificationState = useNotification();
  const { showNotification } = notificationState;

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

    if (values.images.length === 0) {
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

      formData.append('userID', values.userID);
      formData.append('postTitle', values.postTitle);
      formData.append('postDescription', values.postDescription);
      formData.append('postType', values.postType);
      
      // Append each image to formData
      values.images.forEach((image) => {
        formData.append('image', image);
      });


      console.log("Sending form data:", Object.fromEntries(formData));
      const response = await post('/posts/add', formData, true);
      console.log("Post created:", response);
      showNotification('Post created successfully!', 'success');
      setValues(INITIAL_VALUES(userID));
      if (setImagePreviews) {setImagePreviews([]);}
    } catch (error) {
      console.error("Error creating post:", error);
      showNotification('Error creating post. Please try again.', 'error');
    }
  };

  return (
    <PostForm
      title="ADD NEWS"
      initialValues={null}
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