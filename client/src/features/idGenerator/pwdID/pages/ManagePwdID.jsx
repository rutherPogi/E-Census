import { useState, useEffect } from 'react';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { 
  Tooltip, 
  Box, 
  useMediaQuery, 
  useTheme, 
  TableRow, 
  TableCell 
} from '@mui/material';
import dayjs from 'dayjs';

import { Notification } from '../../../../components/common'
import { get, del } from '../../../../utils/api/apiService';
import { MANAGE_TABLE_HEADERS } from '../utils/constants';
import { SearchBar, ActionButton, DeleteDialog, ManageTable } from '../../../../components/common';

import { useNotification } from '../hooks/useNotification'; 



const ManagePwdID = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [applicationData, setApplicationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);

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
    isDeleting: false
  });

  const fetchApplicationData = async () => {
    setLoading(true);
    try {
      const response = await get('/pwdID/list');
      setApplicationData(response);
      setFilteredData(response);
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      showNotification(err.response?.data?.error || 'Failed to load surveys. Please try again later.', 'error');
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
      application.pwdApplicationID.toString().includes(searchTerm)
    );
    
    setFilteredData(filtered);
    setPage(0);
  };

  const openDeleteDialog = (application) => {
    setDeleteDialog({
      open: true,
      application,
      isDeleting: false
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      application: null,
      isDeleting: false
    });
  };

  const handlePagination = (event, newPage) => {
    setPage(newPage);
  };

  const deleteApplication = async () => {

    const { application } = deleteDialog;

    if (!application) return;
    
    setDeleteDialog(prev => ({ ...prev, isDeleting: true }));
    
    try {
      const response = await del(`/pwdID/delete/${application.pwdApplicationID}`);
      
      if (response.success) {
        const updatedData = applicationData.filter(s => s.pwdApplicationID !== application.pwdApplicationID);
        setApplicationData(updatedData);
        setFilteredData(updatedData);
        showNotification('Application deleted successfully', 'success');
      } else {
        throw new Error('Delete operation failed');
      }
    } catch (err) {
      showNotification('Error deleting application. Please try again.', 'error');
    } finally {
      closeDeleteDialog();
    }
  };

  const renderApplicationRow = (application, index) => (
    <TableRow key={application.pwdApplicationID || index}>
      <TableCell>{application.pwdApplicationID}</TableCell>
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
                to={`view/${application.pwdApplicationID}/`}
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
                    ? `/main/generate-id/pwd/resident/${application.pwdApplicationID}/${application.populationID}` 
                    : `/main/generate-id/pwd/renewal/${application.pwdApplicationID}`
                }
              />
            </Box>
          </Tooltip>
          <Tooltip title="Delete Application">
            <Box>
              <ActionButton 
                icon={<Delete />}
                label="Delete"
                color="#f44336"
                onClick={() => openDeleteDialog(application)}
              />
            </Box>
          </Tooltip>
        </Box>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="responsive-container">
      <div className="responsive-header">PWD ID Applications</div>
      <div className='responsive-form details'>
        <SearchBar 
          onSearch={updateSearchResults}
          placeholder="Search by name or ID"
          label="Search PWD Applications..." />
        <ManageTable
          headers={MANAGE_TABLE_HEADERS}
          data={filteredData}
          loading={loading}
          renderRow={renderApplicationRow}
          emptyMessage="No application found"
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePagination}
          count={filteredData.length}
        />
        <DeleteDialog 
          open={deleteDialog.open}
          item={deleteDialog.application}
          onClose={closeDeleteDialog}
          onConfirm={deleteApplication}
          isDeleting={deleteDialog.isDeleting}
          idField="pwdApplicationID"
          nameField="respondent"
          messageTemplate="Do you want to delete survey #{id} for {name}? This action cannot be undone."
        />
        <Notification
          snackbarMessage={snackbarMessage} 
          snackbarOpen={snackbarOpen} 
          setSnackbarOpen={setSnackbarOpen} 
          severity={severity}
        />
      </div>
    </div>
  );
};

export default ManagePwdID;