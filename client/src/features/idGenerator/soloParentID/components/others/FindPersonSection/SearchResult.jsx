// In SearchResultsTable.jsx
import React from 'react';
import { 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Radio, 
  Box, useTheme, useMediaQuery, Chip
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
              <TableCell>Name</TableCell>
              <TableCell>Solo Parent ID</TableCell>
              <TableCell>Population ID</TableCell>
              <TableCell>Birthdate</TableCell>
              <TableCell>Sex</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map((person, index) => {

              const uniqueKey = person.personalInfoID || `person-${index}`;

              console.log('PERSON', person);
              
              return (
                <TableRow 
                  key={uniqueKey}
                  selected={selectedPerson === uniqueKey}
                  onClick={() => handleSelectPerson(person, uniqueKey)}
                  hover
                  sx={{ 
                    cursor: 'pointer',
                    bgcolor: selectedPerson === uniqueKey ? 
                      `${theme.palette.primary.light}20` : 'inherit'
                  }}
                >
                  <TableCell padding="checkbox">
                    <Radio
                      checked={selectedPerson === uniqueKey}
                      onChange={() => handleSelectPerson(person, uniqueKey)}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>
                    {[
                      person.firstName,
                      person.middleName !== 'N/A' ? person.middleName : '',
                      person.lastName,
                      person.suffix !== 'N/A' ? person.suffix : ''
                    ].filter(Boolean).join(' ')}
                  </TableCell>
                  <TableCell>
                    {person.soloParentIDNumber || person.spApplicationID 
                      ? ( person.soloParentIDNumber || person.spApplicationID ) 
                      : (<Chip label="Not Yet Applied" color="error" size="small" />)
                    }
                  </TableCell>
                  <TableCell>
                    {person.populationID 
                      ? ( person.populationID )  
                      : (<Chip label="Not a Resident" color="error" size="small" />)
                    }
                  </TableCell>
                  <TableCell>
                    {person.birthdate ? new Date(person.birthdate).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>{person.sex}</TableCell> 
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SearchResultsTable;