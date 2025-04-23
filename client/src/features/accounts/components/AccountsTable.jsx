// pages/admin/accounts/components/AccountsTable.jsx
import { Save, Delete } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

const AccountsTable = ({
  tempAccounts,
  handleRemoveAccount,
  handleSaveAllAccounts,
  handleClearAll,
}) => {
  return (
    <Box mt={5}>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">
          Accounts to Register ({tempAccounts.length})
        </Typography>

        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearAll}
            disabled={tempAccounts.length === 0}
          >
            Clear All
          </Button>

          <Button
            variant="contained"
            color="success"
            startIcon={<Save size={18} />}
            onClick={handleSaveAllAccounts}
            disabled={tempAccounts.length === 0}
          >
            Save All Accounts
          </Button>
        </Box>
      </Box>

      {tempAccounts.length > 0 ? (
        <TableContainer component={Paper} sx={{ boxShadow: 2, maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>
                  User ID
                </TableCell>
                <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>
                  Name
                </TableCell>
                <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>
                  Username
                </TableCell>
                <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>
                  Password
                </TableCell>
                <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>
                  Position
                </TableCell>
                <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>
                  Barangay
                </TableCell>
                <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tempAccounts.map((account) => (
                <TableRow key={account.id} hover>
                  <TableCell>{account.userID}</TableCell>
                  <TableCell>{account.accountName}</TableCell>
                  <TableCell>{account.username}</TableCell>
                  <TableCell>{account.password}</TableCell>
                  <TableCell>{account.position}</TableCell>
                  <TableCell>{account.barangay}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="error" 
                      onClick={() => handleRemoveAccount(account.id)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.100' }}>
          <Typography color="text.secondary">
            No accounts added yet. Use the form above to add or generate accounts.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default AccountsTable;
