import { useState, useEffect } from 'react';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { Tooltip, Box, useMediaQuery, useTheme, Typography, Button, Checkbox, Divider,
        TableRow, TableCell , Container, Paper } from '@mui/material';
import dayjs from 'dayjs';

import { People } from '@mui/icons-material';
import { Notification } from '../../../../components/common'
import { get, del } from '../../../../utils/api/apiService';
import { MANAGE_TABLE_HEADERS } from '../utils/constants';
import { SearchBar, ActionButton, DeleteDialog, ManageTable } from '../../../../components/common';

import { useNotification } from '../hooks/useNotification'; 



const ManageSeniorCitizenID = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const extendedHeaders = ['', ...MANAGE_TABLE_HEADERS];

  const [applicationData, setApplicationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [selectedApplication, setSelectedApplication] = useState([]);

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();
  
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    application: null,
    isDeleting: false,
    isMultiDelete: false
  });
  

  const fetchApplicationData = async () => {
    setLoading(true);
    try {
      const response = await get('/seniorCitizenID/list');
      setApplicationData(response);
      setFilteredData(response);
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      showNotification(err.response?.data?.error || 'Failed to load application. Please try again later.', 'error');
      setApplicationData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicationData();
  }, []);

  const updateSearchResults = (searchTerm) => {
    if (!searchTerm) {
      setFilteredData(applicationData);
      return;
    }

    const filtered = applicationData.filter(application => 
      application.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.middleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.scApplicationID.toString().includes(searchTerm)
    );
    
    setFilteredData(filtered);
    setPage(0);
  };

  const openMultiDeleteDialog = () => {
    setDeleteDialog({
      open: true,
      application: null,
      isDeleting: false,
      isMultiDelete: true
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      application: null,
      isDeleting: false
    });
  };

  const handleSelectApplication = (scApplicationID) => {
    setSelectedApplication(prev => {
      if (prev.includes(scApplicationID)) {
        return prev.filter(id => id !== scApplicationID);
      } else {
        return [...prev, scApplicationID];
      }
    });
  };

  const handleSelectAllApplication = () => {
    const displayedApplications = filteredData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(application => application.scApplicationID);
      
    const allSelected = displayedApplications.every(id => selectedApplication.includes(id));
    
    if (allSelected) {
      // Deselect all displayed applications
      setSelectedApplication(prev => prev.filter(id => !displayedApplications.includes(id)));
    } else {
      // Select all displayed applications
      const newSelected = [...selectedApplication];
      displayedApplications.forEach(id => {
        if (!newSelected.includes(id)) {
          newSelected.push(id);
        }
      });
      setSelectedApplication(newSelected);
    }
  };

  const handlePagination = (event, newPage) => { setPage(newPage); };

  const currentPageApplication = filteredData
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(survey => survey.scApplicationID);

  const areAllSelected = currentPageApplication.length > 0 && 
    currentPageApplication.every(id => selectedApplication.includes(id));
  
  // Check if some but not all applications on current page are selected
  const areSomeSelected = currentPageApplication.some(id => selectedApplication.includes(id)) && 
    !areAllSelected;
    
  const deleteMultipleApplications = async () => {
    if (selectedApplication.length === 0) return;
  
    setDeleteDialog(prev => ({ ...prev, isDeleting: true }));
  
    try {
      // Find the applications to delete
      const applicationsToDelete = applicationData.filter(application => 
        selectedApplication.includes(application.scApplicationID)
      );
      
      // Track successful and failed deletions
      let successCount = 0;
      let failCount = 0;
      
      // Process each deletion one by one to better handle errors
      for (const application of applicationsToDelete) {
        try {
          const result = await del(`/seniorCitizenID/delete/${application.scApplicationID}`);
          // Check if response has the expected structure
          if (result && result.success) {
            successCount++;
          } else {
            failCount++;
            console.error('Delete operation failed:', result);
          }
        } catch (error) {
          failCount++;
          console.error('Delete operation error:', error);
        }
      }
      
      // Update the data regardless of partial success
      if (successCount > 0) {
        // Update the data by removing the deleted applications
        const updatedData = applicationData.filter(application => 
          !selectedApplication.includes(application.scApplicationID)
        );
        setApplicationData(updatedData);
        setFilteredData(updatedData);
        
        if (failCount > 0) {
          showNotification(`${successCount} applications deleted successfully, ${failCount} failed`, 'warning');
        } else {
          showNotification(`${successCount} applications deleted successfully`, 'success');
        }
        
        setSelectedApplication([]); // Clear selection after deletion
      } else {
        throw new Error('All delete operations failed');
      }
    } catch (err) {
      console.error('Delete error:', err);
      showNotification('Error deleting applications. Please try again.', 'error');
    } finally {
      closeDeleteDialog();
    }
  };

  const renderApplicationRow = (application, index) => (
    <TableRow key={application.scApplicationID || index}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedApplication.includes(application.scApplicationID)}
          onChange={() => handleSelectApplication(application.scApplicationID)}
          color="primary"
        />
      </TableCell>
      <TableCell>{application.scApplicationID}</TableCell>
      <TableCell>
        {`${application.firstName || ''} 
          ${application.middleName || ''} 
          ${application.lastName || ''} 
          ${application.suffix || ''}`}
      </TableCell>
      <TableCell>{application.populationID ? 'YES' : 'NO'}</TableCell>
      <TableCell>
        {application.dateApplied ? dayjs(application.dateApplied).format('MM/DD/YYYY') : 'N/A'}
      </TableCell>
      <TableCell>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2
        }}>
          <Tooltip title="View Application Details">
            <Box>
              <ActionButton 
                icon={<Visibility />}
                label="View"
                color="#0d47a1"
                to={`/main/generate-id/senior-citizen/view/${application.scApplicationID}/`}
              />
            </Box>
          </Tooltip>
          <Tooltip title="Edit Application">
            <Box>
              <ActionButton 
                icon={<Edit />}
                label="Edit"
                color="#ff9800"
                to={
                  application.populationID 
                    ? `/main/generate-id/senior-citizen/resident/${application.scApplicationID}/${application.populationID}` 
                    : `/main/generate-id/senior-citizen/renewal/${application.scApplicationID}`
                }
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
          onChange={handleSelectAllApplication}
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
          <Typography variant='h5' fontWeight={'bold'}>SENIOR CITIZEN ID APPLICATIONS</Typography>
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
            disabled={selectedApplication.length === 0}
            sx={{ fontSize: '0.75rem' }}
          >
            DELETE APPLICATIONS ({selectedApplication.length})
          </Button>
        </Box>
        <ManageTable
          headers={extendedHeaders}
          data={filteredData}
          loading={loading}
          renderRow={renderApplicationRow}
          emptyMessage="No application found"
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePagination}
          count={filteredData.length}
          customHeaderRow={renderTableHeader}
        />
        <DeleteDialog 
          open={deleteDialog.open}
          item={selectedApplication}
          onClose={closeDeleteDialog}
          onConfirm={deleteMultipleApplications}
          isDeleting={deleteDialog.isDeleting}
          idField="scApplicationID"
          nameField="respondent"
          messageTemplate="Do you want to delete these applications? This action cannot be undone."
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

export default ManageSeniorCitizenID;