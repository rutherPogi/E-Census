import React from 'react';
import { 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Radio, 
  Box, useTheme, useMediaQuery
} from '@mui/material';

const SearchResultsTable = ({ searchResults, selectedPerson, handleSelectPerson }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  if (searchResults.length === 0) {
    return null;
  }
  
  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ 
        bgcolor: theme.palette.primary.main, 
        color: 'white',
        p: 2
      }}>
        <Typography variant="h6">
          Search Results
          <Typography component="span" variant="body2" sx={{ ml: 1, color: 'rgba(255,255,255,0.8)' }}>
            ({searchResults.length} {searchResults.length === 1 ? 'record' : 'records'} found)
          </Typography>
        </Typography>
      </Box>
      
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>First Name</TableCell>
              {!isMobile && <TableCell>Middle Name</TableCell>}
              <TableCell>Last Name</TableCell>
              {!isMobile && <TableCell>Suffix</TableCell>}
              <TableCell>Birthdate</TableCell>
              <TableCell>Sex</TableCell>
              {!isMobile && <TableCell>PWD</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map((person) => (
              <TableRow 
                key={person.populationID}
                selected={selectedPerson === person.populationID}
                onClick={() => handleSelectPerson(person)}
                hover
                sx={{ 
                  cursor: 'pointer',
                  bgcolor: selectedPerson === person.populationID ? 
                    `${theme.palette.primary.light}20` : 'inherit'
                }}
              >
                <TableCell padding="checkbox">
                  <Radio
                    checked={selectedPerson === person.populationID}
                    onChange={() => handleSelectPerson(person)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>{person.firstName}</TableCell>
                {!isMobile && <TableCell>{person.middleName || '-'}</TableCell>}
                <TableCell>{person.lastName}</TableCell>
                {!isMobile && <TableCell>{person.suffix || '-'}</TableCell>}
                <TableCell>{new Date(person.birthdate).toLocaleDateString()}</TableCell>
                <TableCell>{person.sex}</TableCell>
                {!isMobile && <TableCell>{person.isPWD ? 'Yes' : 'No'}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};


export default SearchResultsTable;