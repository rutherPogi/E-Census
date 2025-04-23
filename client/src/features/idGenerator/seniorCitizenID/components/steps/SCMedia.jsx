import { useState, useEffect } from "react";
import { FormControl, FormLabel } from '@mui/material';

import { Notification, FormButtons } from "../../../../../components/common";

import { useFormContext } from "../others/FormContext";
import { useNotification } from '../../hooks/useNotification';

import MediaUpload from "../others/SCMediaSection/MediaUpload";
import SignatureCapture from "../others/SCMediaSection/SignaturePad";




export default function SCMedia({ handleBack, handleNext }) {
  
  const { formData, updateFormData } = useFormContext();
  
  const [values, setValues] = useState({ 
    photoID: null, 
    signature: null 
  });
  const [errors, setErrors] = useState({ 
    photoID: false, 
    signature: false 
  });
  const [photoIDPreview, setPhotoIDPreview] = useState('');

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();

  useEffect(() => {
    // Load existing data if available
    if (formData.scMedia) {
      // Handle Photo ID
      if (formData.scMedia.photoID) {
        setValues(prev => ({ ...prev, photoID: formData.scMedia.photoID }));
        if (formData.scMedia.photoID instanceof File) {
          setPhotoIDPreview(URL.createObjectURL(formData.scMedia.photoID));
        } else if (formData.scMedia.photoIDPreview) {
          setPhotoIDPreview(formData.scMedia.photoIDPreview);
        }
      }
      
      // Handle Signature
      if (formData.scMedia.signature) {
        setValues(prev => ({ ...prev, signature: formData.scMedia.signature }));
      }
    }
  }, [formData.scMedia]);

  // Handle photo ID upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Validate file type
    if (!file.type.match('image.*')) {
      setErrors(prev => ({ ...prev, photoID: true }));
      showNotification('Please select an image file for Photo ID', 'error');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, photoID: true }));
      showNotification('Image size should be less than 5MB for Photo ID', 'error');
      return;
    }
    
    // Create URL for preview
    const previewUrl = URL.createObjectURL(file);
    setPhotoIDPreview(previewUrl);
    
    // Update values state with the file
    setValues(prev => ({ ...prev, photoID: file }));
    setErrors(prev => ({ ...prev, photoID: false }));
    showNotification('Photo ID uploaded successfully', 'success');
  };
  
  // Handle signature change
  const handleSignatureChange = (signatureDataURL) => {
    if (signatureDataURL) {
      setValues(prev => ({ ...prev, signature: signatureDataURL }));
      setErrors(prev => ({ ...prev, signature: false }));
      showNotification('Signature saved successfully', 'success');
    } else {
      setValues(prev => ({ ...prev, signature: null }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if both photo ID and signature are provided
    let hasErrors = false;
    
    if (!values.photoID) {
      setErrors(prev => ({ ...prev, photoID: true }));
      hasErrors = true;
    }
    
    if (!values.signature) {
      setErrors(prev => ({ ...prev, signature: true }));
      hasErrors = true;
    }
    
    if (hasErrors) {
      showNotification("Please provide both Photo ID and Signature", 'error');
      return;
    }

    // Update form context with both images
    updateFormData('scMedia', { 
      photoID: values.photoID,
      signature: values.signature,
      photoIDPreview: photoIDPreview
    });
    
    console.log("Photo ID and Signature uploaded!", values);
    handleNext();
  };

  return (
    <div className='responsive-container'>
      <div className='responsive-header'>PHOTO ID AND SIGNATURE</div>
      <div className='responsive-form details'>
        {/* Photo ID Upload */}
        <FormControl fullWidth margin="normal">
          <FormLabel component="legend">Photo ID</FormLabel>
          <MediaUpload
            type="photoID"
            title="Photo ID"
            preview={photoIDPreview}
            error={errors.photoID}
            onChange={handlePhotoUpload}
          />
        </FormControl>

        {/* Signature Pad */}
        <FormControl fullWidth margin="normal">
          <FormLabel component="legend">Signature</FormLabel>
          <SignatureCapture
            onSignatureChange={handleSignatureChange}
            error={errors.signature}
            initialSignature={formData.scMedia?.signature}
          />
        </FormControl>
      </div>
      <FormButtons
        onBack={handleBack} 
        onNext={handleSubmit} 
        backLabel='Back' 
        nextLabel='Next' 
      />
      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />
    </div>
  );
}