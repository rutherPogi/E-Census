// components/common/PageHeader.jsx
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';

const PageHeader = ({ title, onBack, icon }) => {
  return (
    <Box className="responsive-header" sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {onBack && (
          <IconButton 
            onClick={onBack}
            size="medium"
            sx={{ mr: 1 }}
          >
            {icon}
          </IconButton>
        )}
        <Typography variant="h5" component="h1" fontWeight="bold">
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default PageHeader;