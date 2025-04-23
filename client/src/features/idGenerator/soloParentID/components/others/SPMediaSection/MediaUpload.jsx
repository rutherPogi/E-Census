import { Box, FormHelperText, Button } from '@mui/material';
import { Image } from "@mui/icons-material";

export default function MediaUpload({ 
  type, 
  preview, 
  error, 
  onChange,
  title
}) {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px dashed #ccc',
        borderRadius: 1,
        padding: 2
      }}
    >
      {preview ? (
        <Box sx={{ mb: 2 }}>
          <img 
            src={preview} 
            alt={`${title} Preview`} 
            style={{ maxWidth: '100%', maxHeight: '200px' }} 
          />
        </Box>
      ) : (
        <Image sx={{ fontSize: 60, color: '#ccc', mb: 1 }} />
      )}
      
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id={`${type}-upload`}
        type="file"
        onChange={onChange}
      />
      <label htmlFor={`${type}-upload`}>
        <Button 
          variant="outlined" 
          component="span" 
          startIcon={<Image />}
        >
          {preview ? `Change ${title}` : `Upload ${title}`}
        </Button>
      </label>
      
      {error && (
        <FormHelperText error>Please upload a valid image for {title}</FormHelperText>
      )}
    </Box>
  );
}
