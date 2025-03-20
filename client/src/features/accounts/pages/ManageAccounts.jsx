import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Delete, Lock, Add } from '@mui/icons-material';
import { Tooltip, Box, Snackbar, Alert, TableRow, TableCell, Chip, Button} from '@mui/material';

import { get, del } from '../../../utils/api/apiService';
import { SearchBar, ActionButton, DeleteDialog, ManageTable } from '../../../components/common';
import { ACCOUNT_TABLE_HEADERS, POSITION_MAP } from '../utils/constants';



const ManageAccounts = () => {

  const navigate = useNavigate();

  const [accountsData, setAccountsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    account: null,
    isDeleting: false
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const fetchAccountsData = async () => {
    setLoading(true);
    try {
      const response = await get('/auth/manage-accounts');
      setAccountsData(response);
      setFilteredData(response);
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      setNotification({
        open: true,
        message: err.response?.data?.error || 'Failed to load accounts. Please try again later.',
        severity: 'error'
      });
      setAccountsData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountsData();
  }, []);

  const updateSearchResults = (searchTerm) => {
    if (!searchTerm) {
      setFilteredData(accountsData);
      return;
    }

    const filtered = accountsData.filter(account => 
      account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.userID.toString().includes(searchTerm)
    );
    
    setFilteredData(filtered);
    setPage(0);
  };

  const openDeleteDialog = (account) => {
    setDeleteDialog({
      open: true,
      account,
      isDeleting: false
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      account: null,
      isDeleting: false
    });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const handlePagination = (event, newPage) => {
    setPage(newPage);
  };

  const deleteAccount = async () => {
    const { account } = deleteDialog;

    if (!account) return;
    
    setDeleteDialog(prev => ({ ...prev, isDeleting: true }));
    
    try {
      const response = await del(`/auth/delete-account/${account.userID}`);
      
      if (response.success) {
        // Remove the deleted account from state
        const updatedData = accountsData.filter(a => a.userID !== account.userID);
        setAccountsData(updatedData);
        setFilteredData(updatedData);
        
        setNotification({
          open: true,
          message: 'Account deleted successfully',
          severity: 'success'
        });
      } else {
        throw new Error('Delete operation failed');
      }
    } catch (err) {
      setNotification({
        open: true,
        message: 'Error deleting account. Please try again.',
        severity: 'error'
      });
    } finally {
      closeDeleteDialog();
    }
  };

  const getPositionColor = (position) => {
    // Convert position to lowercase for case-insensitive matching
    const lowerPosition = position.toLowerCase();
    
    // Return mapped color or default gray
    return POSITION_MAP[lowerPosition] || '#757575';
  };

  const renderAccountRow = (account, index) => (
    <TableRow key={account.userID || index}>
      <TableCell>{account.userID}</TableCell>
      <TableCell>{account.accountName}</TableCell>
      <TableCell>{account.username}</TableCell>
      <TableCell>
        <Chip 
          label={account.position}
          sx={{ 
            backgroundColor: getPositionColor(account.position),
            color: 'white',
            fontWeight: 'bold'
          }}
          size="small"
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', gap: 2}}>
          <Tooltip title="Reset Password">
            <Box>
              <ActionButton 
                icon={<Lock />}
                label="Reset"
                color="#9c27b0"
                to={`reset-password/${account.id}`}
              />
            </Box>
          </Tooltip>
          <Tooltip title="Delete Account">
            <Box>
              <ActionButton 
                icon={<Delete />}
                label="Delete"
                color="#f44336"
                onClick={() => openDeleteDialog(account)}
              />
            </Box>
          </Tooltip>
        </Box>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="responsive-container">
      <Box className="responsive-header" sx={{ display: 'flex', justifyContent: 'space-between' }}>
        USER ACCOUNTS 
        <Button 
          variant='contained' 
          endIcon={<Add/>}
          onClick={() => navigate('/main/accounts/addAccount')}
        >
            ADD ACCOUNT
        </Button></Box>
      <div className='responsive-table'>
        <SearchBar 
          onSearch={updateSearchResults}
          placeholder="Search by name, username, position or ID"
          label="Search accounts..." />
        <ManageTable
          headers={ACCOUNT_TABLE_HEADERS}
          data={filteredData}
          loading={loading}
          renderRow={renderAccountRow}
          emptyMessage="No accounts found"
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePagination}
          count={filteredData.length}
        />
        <DeleteDialog 
          open={deleteDialog.open}
          item={deleteDialog.account}
          onClose={closeDeleteDialog}
          onConfirm={deleteAccount}
          isDeleting={deleteDialog.isDeleting}
          idField="id"
          nameField="username"
          messageTemplate="Do you want to delete the account for {name}? This action cannot be undone."
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

export default ManageAccounts;