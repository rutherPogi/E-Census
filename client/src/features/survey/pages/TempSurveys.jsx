import { useState, useEffect } from 'react';
import { Delete, UploadFile, Pending } from '@mui/icons-material';
import { Box, useMediaQuery, useTheme, TableRow, TableCell, Container,
         Paper, Typography, Button, Divider, Checkbox } from '@mui/material';
import dayjs from 'dayjs';

import { getAllSurveysFromDB, deleteSurveyFromDB } from '../../../utils/surveyStorage';
import { DeleteDialog, ManageTable } from '../../../components/common';
import { TEMP_TABLE_HEADERS } from '../utils/tableHeaders';
import { get, del, post } from '../../../utils/api/apiService';
import { Notification } from '../../../components/common/Notification'

import { useNotification } from '../hooks/useNotification';




const TempSurvey = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const extendedHeaders = ['', ...TEMP_TABLE_HEADERS];
  
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

  const loadLocalSurveys = async () => {
    const localSurveys = await getAllSurveysFromDB();

    setSurveyData(localSurveys);
    setFilteredData(localSurveys);
    setLoading(false);
  };
  

  useEffect(() => {
    loadLocalSurveys();
  }, []);

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
      // Delete from IndexedDB
      await Promise.all(selectedSurveys.map(id => deleteSurveyFromDB(id)));

      // Update the table state
      const updatedData = surveyData.filter(survey => !selectedSurveys.includes(survey.surveyID));
      setSurveyData(updatedData);
      setFilteredData(updatedData);
      showNotification(`${selectedSurveys.length} survey(s) deleted successfully`, 'success');
      setSelectedSurveys([]);
      loadLocalSurveys();
    } catch (err) {
      console.error('Error deleting surveys from local DB:', err);
      showNotification('Error deleting surveys. Please try again.', 'error');
    } finally {
      closeDeleteDialog();
    }
  };

  const handleSubmitSurveys = async () => {

    const localSurveys = await getAllSurveysFromDB();

    for (const survey of localSurveys) {
      try {

        const formDataToSend = new FormData();
        
        // Reconstruct images if needed
        if (survey.data?.houseInfo?.houseImages) {
          survey.data.houseInfo.houseImages.forEach(img => {
            if (img.file) {
              formDataToSend.append('houseImages', img.file);
            }
          });
        }
  
        formDataToSend.append('surveyData', JSON.stringify(survey.data));
  
        // Send to server
        await post('/surveys/submit', formDataToSend, true);
  
        // On success, delete local copy
        await deleteSurveyFromDB(survey.id);
        showNotification(`Synced survey ${survey.id}`, 'success');
        loadLocalSurveys();
      } catch (err) {
        console.error(`Failed to sync ${survey.id}`, err);
        showNotification(`Failed to sync ${survey.id}`, 'error');
      }
    }

  }

  const renderSurveyRow = (survey, index) => (
    <TableRow key={survey.id || index}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedSurveys.includes(survey.id)}
          onChange={() => handleSelectSurvey(survey.id)}
          color="primary"
        />
      </TableCell>
      <TableCell>{survey.id}</TableCell>
      <TableCell>{survey.data.surveyData.respondent}</TableCell>
      <TableCell>{survey.data.surveyData.barangay}</TableCell>
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
      {TEMP_TABLE_HEADERS.map((header, index) => (
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
          <Pending/>
          <Typography variant='h5' fontWeight={'bold'}>PENDING SURVEYS</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            endIcon={<UploadFile />}
            onClick={handleSubmitSurveys}
            sx={{ fontSize: '0.75rem' }}
          >
            SUBMIT
          </Button>
        </Box>
      </Box>

      <Divider/>
      <Box mt={2}>
        <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
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

export default TempSurvey;