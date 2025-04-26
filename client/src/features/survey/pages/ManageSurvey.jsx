import { useState, useEffect } from 'react';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { Tooltip, Box, useMediaQuery, useTheme, TableRow, TableCell, Container,
         Paper, Typography, Button, Divider, Checkbox } from '@mui/material';
import { Add, People } from '@mui/icons-material';
import dayjs from 'dayjs';

import { SearchBar, ActionButton, DeleteDialog, ManageTable } from '../../../components/common';
import { MANAGE_TABLE_HEADERS } from '../utils/tableHeaders';
import { get, del } from '../../../utils/api/apiService';
import { Notification } from '../../../components/common/Notification'

import { useNotification } from '../hooks/useNotification';




const ManageSurvey = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const extendedHeaders = ['', ...MANAGE_TABLE_HEADERS];
  
  const [surveyData, setSurveyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [selectedSurveys, setSelectedSurveys] = useState([]);
  
  const [deleteDialog, setDeleteDialog] = useState({ 
    open: false, 
    survey: null, 
    isDeleting: false,
    isMultiDelete: false
  });

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();

  const fetchSurveyData = async () => {
    setLoading(true);
    try {
      const response = await get('/surveys/list');
      setSurveyData(response);
      setFilteredData(response);
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      showNotification(err.response?.data?.error || 'Failed to load surveys. Please try again later.', 'error' )
      setSurveyData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveyData();
  }, []);

  const updateSearchResults = (searchTerm) => {
    if (!searchTerm) {
      setFilteredData(surveyData);
      return;
    }

    const filtered = surveyData.filter(survey => 
      survey.respondent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.interviewer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.surveyID.toString().includes(searchTerm)
    );
    
    setFilteredData(filtered);
    setPage(0);
  };

  const openMultiDeleteDialog = () => {
    setDeleteDialog({
      open: true,
      survey: null,
      isDeleting: false,
      isMultiDelete: true
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      survey: null,
      isDeleting: false
    });
  };

  const handlePagination = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelectSurvey = (surveyID) => {
    setSelectedSurveys(prev => {
      if (prev.includes(surveyID)) {
        return prev.filter(id => id !== surveyID);
      } else {
        return [...prev, surveyID];
      }
    });
  };

  const handleSelectAllSurveys = () => {
    const displayedSurveys = filteredData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(survey => survey.surveyID);
      
    const allSelected = displayedSurveys.every(id => selectedSurveys.includes(id));
    
    if (allSelected) {
      // Deselect all displayed surveys
      setSelectedSurveys(prev => prev.filter(id => !displayedSurveys.includes(id)));
    } else {
      // Select all displayed surveys
      const newSelected = [...selectedSurveys];
      displayedSurveys.forEach(id => {
        if (!newSelected.includes(id)) {
          newSelected.push(id);
        }
      });
      setSelectedSurveys(newSelected);
    }
  };

  const currentPageSurveys = filteredData
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(survey => survey.surveyID);

  const areAllSelected = currentPageSurveys.length > 0 && 
    currentPageSurveys.every(id => selectedSurveys.includes(id));
  
  // Check if some but not all surveys on current page are selected
  const areSomeSelected = currentPageSurveys.some(id => selectedSurveys.includes(id)) && 
    !areAllSelected;
    
  const deleteMultipleSurveys = async () => {
  if (selectedSurveys.length === 0) return;

  setDeleteDialog(prev => ({ ...prev, isDeleting: true }));

  try {
    // Find the populationIDs for the selected surveys
    const surveysToDelete = surveyData.filter(survey => selectedSurveys.includes(survey.surveyID));
    
    // Process each deletion
    const deletePromises = surveysToDelete.map(survey => 
      del(`/surveys/delete/${survey.surveyID}`)
    );
    
    const results = await Promise.all(deletePromises);
    
    // Check if all deletions were successful
    const allSuccessful = results.every(result => result.success);
    
    if (allSuccessful) {
      // Update the data by removing the deleted surveys
      const updatedData = surveyData.filter(survey => !selectedSurveys.includes(survey.surveyID));
      setSurveyData(updatedData);
      setFilteredData(updatedData);
      showNotification(`${selectedSurveys.length} surveys deleted successfully`, 'success');
      setSelectedSurveys([]); // Clear selection after successful deletion
    } else {
      throw new Error('Some delete operations failed');
    }
  } catch (err) {
    showNotification('Error deleting surveys. Please try again.', 'error');
  } finally {
    closeDeleteDialog();
  }
};

  const renderSurveyRow = (survey, index) => (
    <TableRow key={survey.surveyID || index}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedSurveys.includes(survey.surveyID)}
          onChange={() => handleSelectSurvey(survey.surveyID)}
          color="primary"
        />
      </TableCell>
      <TableCell>{survey.surveyID}</TableCell>
      <TableCell>{survey.respondent}</TableCell>
      <TableCell>{survey.interviewer}</TableCell>
      <TableCell>
        {survey.surveyDate 
         ? dayjs(survey.surveyDate).format('MM/DD/YYYY') 
         : 'N/A'}
      </TableCell>
      <TableCell>{survey.barangay}</TableCell>
      <TableCell>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2
        }}>
          <Tooltip title="View Survey Details">
            <Box>
              <ActionButton 
                icon={<Visibility />}
                label="View"
                color="#0d47a1"
                to={`/main/view-survey/${survey.surveyID}`}
              />
            </Box>
          </Tooltip>
          <Tooltip title="Edit Survey Details">
            <Box>
              <ActionButton   
                icon={<Edit />}
                label="Edit"
                color="#ff9800"
                to={`/main/edit-survey/${survey.surveyID}`}
              />
            </Box>
          </Tooltip>
        </Box>
      </TableCell>
    </TableRow>
  );

  const renderTableHeader = () => (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={areSomeSelected}
          checked={areAllSelected}
          onChange={handleSelectAllSurveys}
          color="primary"
        />
      </TableCell>
      {MANAGE_TABLE_HEADERS.map((header, index) => (
        <TableCell key={index}>{header}</TableCell>
      ))}
    </TableRow>
  );

  return (
    <Container 
      component={Paper}
      sx={{ borderRadius: 2, backgroundColor: "#fff", p: 5, display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center'}}>
          <People/>
          <Typography variant='h5' fontWeight={'bold'}>SURVEYS</Typography>
        </Box>
      </Box>

      <Divider/>
      <Box mt={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <SearchBar 
            onSearch={updateSearchResults}
            placeholder="Search"
          />
          <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            onClick={openMultiDeleteDialog}
            disabled={selectedSurveys.length === 0}
            sx={{ fontSize: '0.75rem' }}
          >
            DELETE SURVEYS ({selectedSurveys.length})
          </Button>
        </Box>
        <ManageTable
          headers={extendedHeaders}
          data={filteredData}
          loading={loading}
          renderRow={renderSurveyRow}
          emptyMessage="No surveys found"
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePagination}
          count={filteredData.length}
          customHeaderRow={renderTableHeader}
        />
        <DeleteDialog 
          open={deleteDialog.open}
          item={deleteDialog.isMultiDelete ? selectedSurveys : deleteDialog.survey}
          onClose={closeDeleteDialog}
          onConfirm={deleteMultipleSurveys}
          isDeleting={deleteDialog.isDeleting}
          idField="surveyID"
          nameField="respondent"
          messageTemplate={
            deleteDialog.isMultiDelete 
              ? `Do you want to delete the selected ${selectedSurveys.length} survey(s)? This action cannot be undone.`
              : "Do you want to delete the survey? This action cannot be undone."
          }
        />
        <Notification
          snackbarMessage={snackbarMessage} 
          snackbarOpen={snackbarOpen} 
          setSnackbarOpen={setSnackbarOpen} 
          severity={severity}
        />
      </Box>
    </Container>
  );
};

export default ManageSurvey;