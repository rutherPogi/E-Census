import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Delete, Add, People } from '@mui/icons-material';
import { Container, Paper, Typography, Tooltip, Box, Button, Divider, Checkbox, TableRow, TableCell } from '@mui/material';

import { get, del } from '../../../utils/api/apiService';
import { SearchBar, ActionButton, DeleteDialog, ManageTable } from '../../../components/common';
import { ACCOUNT_TABLE_HEADERS, POSITION_MAP } from '../utils/constants';
import { Notification } from '../../../components/common/Notification';
import { useNotification } from '../hooks/useNotification';




const ManageAccounts = () => {
  
  const navigate = useNavigate();

  const [accountsData, setAccountsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    account: null,
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

  const fetchAccountsData = async () => {
    setLoading(true);
    try {
      const response = await get('/auth/manage-accounts');
      setAccountsData(response);
      setFilteredData(response);
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      showNotification(
        err.response?.data?.error || 'Failed to load accounts. Please try again later.',
        'error'
      );
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
    // Clear selections when search results change
    setSelectedAccounts([]);
  };

  const openDeleteDialog = (account) => {
    setDeleteDialog({
      open: true,
      account,
      isDeleting: false,
      isMultiDelete: false
    });
  };

  const openMultiDeleteDialog = () => {
    setDeleteDialog({
      open: true,
      account: null,
      isDeleting: false,
      isMultiDelete: true
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      account: null,
      isDeleting: false,
      isMultiDelete: false
    });
  };

  const handlePagination = (event, newPage) => {
    setPage(newPage);
  };

  const deleteAccount = async () => {
    const { account, isMultiDelete } = deleteDialog;
    
    setDeleteDialog(prev => ({ ...prev, isDeleting: true }));
    
    try {
      if (isMultiDelete) {
        // Delete multiple accounts
        const results = await Promise.allSettled(
          selectedAccounts.map(id => del(`/auth/delete-account/${id}`))
        );
        
        const successCount = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
        const failCount = selectedAccounts.length - successCount;
        
        // Remove the deleted accounts from state
        const remainingAccounts = accountsData.filter(a => !selectedAccounts.includes(a.userID));
        setAccountsData(remainingAccounts);
        setFilteredData(remainingAccounts);
        
        let message = '';
        if (failCount === 0) {
          message = `Successfully deleted ${successCount} account${successCount !== 1 ? 's' : ''}`;
        } else {
          message = `Deleted ${successCount} account${successCount !== 1 ? 's' : ''}, but failed to delete ${failCount}`;
        }
        
        showNotification(message, failCount === 0 ? 'success' : 'warning');
        setSelectedAccounts([]);
      } else {
        // Delete single account
        const response = await del(`/auth/delete-account/${account.userID}`);
        
        if (response.success) {
          // Remove the deleted account from state
          const updatedData = accountsData.filter(a => a.userID !== account.userID);
          setAccountsData(updatedData);
          setFilteredData(updatedData);
          
          showNotification('Account deleted successfully', 'success');
        } else {
          throw new Error('Delete operation failed');
        }
      }
    } catch (err) {
      showNotification('Error deleting account(s). Please try again.', 'error');
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

  const handleSelectAccount = (userID) => {
    setSelectedAccounts(prev => {
      if (prev.includes(userID)) {
        return prev.filter(id => id !== userID);
      } else {
        return [...prev, userID];
      }
    });
  };

  const handleSelectAllAccounts = () => {
    const displayedAccounts = filteredData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(account => account.userID);
      
    const allSelected = displayedAccounts.every(id => selectedAccounts.includes(id));
    
    if (allSelected) {
      // Deselect all displayed accounts
      setSelectedAccounts(prev => prev.filter(id => !displayedAccounts.includes(id)));
    } else {
      // Select all displayed accounts
      const newSelected = [...selectedAccounts];
      displayedAccounts.forEach(id => {
        if (!newSelected.includes(id)) {
          newSelected.push(id);
        }
      });
      setSelectedAccounts(newSelected);
    }
  };

  // Get accounts on current page
  const currentPageAccounts = filteredData
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(account => account.userID);
    
  // Check if all accounts on current page are selected
  const areAllSelected = currentPageAccounts.length > 0 && 
    currentPageAccounts.every(id => selectedAccounts.includes(id));
  
  // Check if some but not all accounts on current page are selected
  const areSomeSelected = currentPageAccounts.some(id => selectedAccounts.includes(id)) && 
    !areAllSelected;

  // Extend table headers to include checkbox column
  const extendedHeaders = ['', ...ACCOUNT_TABLE_HEADERS];

  const renderAccountRow = (account, index) => (
    <TableRow key={account.userID || index}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedAccounts.includes(account.userID)}
          onChange={() => handleSelectAccount(account.userID)}
          color="primary"
        />
      </TableCell>
      <TableCell>{account.userID}</TableCell>
      <TableCell>{account.accountName}</TableCell>
      <TableCell>{account.username}</TableCell>
      <TableCell>
        <div 
          style={{ 
            backgroundColor: getPositionColor(account.position),
            color: 'white',
            fontWeight: 'bold',
            padding: '2px 8px',
            borderRadius: '16px',
            display: 'inline-block',
            fontSize: '0.75rem'
          }}
        >
          {account.position}
        </div>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', gap: 2}}>
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

  // Custom header renderer to add checkbox for select all
  const renderTableHeader = () => (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={areSomeSelected}
          checked={areAllSelected}
          onChange={handleSelectAllAccounts}
          color="primary"
        />
      </TableCell>
      {ACCOUNT_TABLE_HEADERS.map((header, index) => (
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
          <Typography variant='h5' fontWeight={'bold'}>USER ACCOUNTS</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            endIcon={<Add />}
            onClick={() => navigate('/main/accounts/addAccount')}
            sx={{ fontSize: '0.75rem' }}
          >
            ADD ACCOUNT
          </Button>
          <Button 
            variant="contained" 
            endIcon={<Add />}
            onClick={() => navigate('/main/accounts/addMultipleAccounts')}
            sx={{ fontSize: '0.75rem' }}
          >
            ADD MULTIPLE ACCOUNTS
          </Button>
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
            disabled={selectedAccounts.length === 0}
            sx={{ fontSize: '0.75rem' }}
          >
            DELETE ACCOUNTS ({selectedAccounts.length})
          </Button>
        </Box>
        
        <ManageTable
          headers={extendedHeaders}
          data={filteredData}
          loading={loading}
          renderRow={renderAccountRow}
          emptyMessage="No accounts found"
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePagination}
          count={filteredData.length}
          customHeaderRow={renderTableHeader}
        />
        
        <DeleteDialog 
          open={deleteDialog.open}
          item={deleteDialog.isMultiDelete ? selectedAccounts : deleteDialog.account}
          onClose={closeDeleteDialog}
          onConfirm={deleteAccount}
          isDeleting={deleteDialog.isDeleting}
          idField="id"
          nameField="username"
          messageTemplate={
            deleteDialog.isMultiDelete 
              ? `Do you want to delete the selected ${selectedAccounts.length} account(s)? This action cannot be undone.`
              : "Do you want to delete the account for {name}? This action cannot be undone."
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

export default ManageAccounts;