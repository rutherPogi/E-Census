
export const getImageSource = (imageData) => {
  if (!imageData) {
    console.log('No image data received');
    return null;
  }
  
  // The imageData should already be a complete data URL from the backend
  if (typeof imageData === 'string') {
    return imageData;
  }
  
  console.error('Invalid image data format');
  return null;
};

export default getImageSource;