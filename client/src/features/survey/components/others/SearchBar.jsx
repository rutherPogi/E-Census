import { useState } from 'react';
import { Box, TextField } from '@mui/material';

const SearchBar = ({ onSearch, label, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        size="small"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={placeholder}
      />
    </Box>
  );
};

export default SearchBar;