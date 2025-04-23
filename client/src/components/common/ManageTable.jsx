import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TablePagination
} from '@mui/material';

const ManageTable = ({
  headers,           // Array of column headers
  data,              // Array of data objects
  loading,           // Boolean for loading state
  renderRow,         // Function to render each row
  emptyMessage,      // Message to show when no data
  page,              // Current page
  rowsPerPage,       // Rows per page
  onPageChange,      // Page change handler
  count,             // Total number of items
  customHeaderRow    // Optional custom header row renderer
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          {customHeaderRow ? (
            customHeaderRow()
          ) : (
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          )}
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={headers.length} align="center">Loading...</TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => renderRow(item, index))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length} align="center">{emptyMessage || 'No data found'}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5]}
      />
    </TableContainer>
  );
};

export default ManageTable;