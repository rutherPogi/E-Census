import { useState, useEffect } from 'react';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { get, del } from '../../../utils/api/apiService';
import { Tooltip, Box, useMediaQuery, useTheme, Snackbar, Alert, 
         TableRow, TableCell } from '@mui/material';
import { SearchBar, ActionButton, DeleteDialog, ManageTable } from '../components/others';
import { MANAGE_TABLE_HEADERS } from '../utils/constants';
import dayjs from 'dayjs';


const ManageSurvey = () => {

  const [surveyData, setSurveyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    survey: null,
    isDeleting: false
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchSurveyData = async () => {
    setLoading(true);
    try {
      const response = await get('/surveys/manage-survey');
      setSurveyData(response);
      setFilteredData(response);
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      setNotification({
        open: true,
        message: err.response?.data?.error || 'Failed to load surveys. Please try again later.',
        severity: 'error'
      });
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

  const openDeleteDialog = (survey) => {
    setDeleteDialog({
      open: true,
      survey,
      isDeleting: false
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      survey: null,
      isDeleting: false
    });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const handlePagination = (event, newPage) => {
    setPage(newPage);
  };

  const deleteSurvey = async () => {
    const { survey } = deleteDialog;

    if (!survey) return;
    
    setDeleteDialog(prev => ({ ...prev, isDeleting: true }));
    
    try {
      const response = await del(`/surveys/delete-survey/${survey.surveyID}`);
      
      if (response.success) {
        // Remove the deleted survey from state
        const updatedData = surveyData.filter(s => s.surveyID !== survey.surveyID);
        setSurveyData(updatedData);
        setFilteredData(updatedData);
        
        setNotification({
          open: true,
          message: 'Survey deleted successfully',
          severity: 'success'
        });
      } else {
        throw new Error('Delete operation failed');
      }
    } catch (err) {
      setNotification({
        open: true,
        message: 'Error deleting survey. Please try again.',
        severity: 'error'
      });
    } finally {
      closeDeleteDialog();
    }
  };

  const renderSurveyRow = (survey, index) => (
    <TableRow key={survey.surveyID || index}>
      <TableCell>{survey.surveyID}</TableCell>
      <TableCell>{survey.respondent}</TableCell>
      <TableCell>{survey.interviewer}</TableCell>
      <TableCell>
        {survey.surveyDate ? dayjs(survey.surveyDate).format('MM/DD/YYYY') : 'N/A'}
      </TableCell>
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
                to={`view/${survey.surveyID}`}
              />
            </Box>
          </Tooltip>
          <Tooltip title="Edit Survey">
            <Box>
              <ActionButton 
                icon={<Edit />}
                label="Edit"
                color="#ff9800"
                to={`edit/${survey.surveyID}`}
              />
            </Box>
          </Tooltip>
          <Tooltip title="Delete Survey">
            <Box>
              <ActionButton 
                icon={<Delete />}
                label="Delete"
                color="#f44336"
                onClick={() => openDeleteDialog(survey)}
              />
            </Box>
          </Tooltip>
        </Box>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="responsive-container">
      <div className="responsive-header">SURVEYS</div>
      <div className='responsive-table'>
        <SearchBar 
          onSearch={updateSearchResults}
          placeholder="Search by respondent, interviewer or ID"
          label="Search surveys..." />
        <ManageTable
          headers={MANAGE_TABLE_HEADERS}
          data={filteredData}
          loading={loading}
          renderRow={renderSurveyRow}
          emptyMessage="No surveys found"
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePagination}
          count={filteredData.length}
        />
        <DeleteDialog 
          open={deleteDialog.open}
          item={deleteDialog.survey}
          onClose={closeDeleteDialog}
          onConfirm={deleteSurvey}
          isDeleting={deleteDialog.isDeleting}
          idField="surveyID"
          nameField="respondent"
          messageTemplate="Do you want to delete survey #{id} for {name}? This action cannot be undone."
        />
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={closeNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={closeNotification} severity={notification.severity} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default ManageSurvey;