import { useState, useEffect } from 'react';
import { TableRow, TableCell } from '@mui/material';

import { get } from '../../../../utils/api/apiService';
import { Notification } from '../../../../components/common/Notification';
import { SearchBar, ManageTable } from '../../../../components/common';
import { SEGREGATION_TABLE_HEADERS } from '../../utils/constants';

import { useNotification } from '../../hooks/useNotification';




const SegregationTable = ({ sex }) => {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await get(`/databank/segregation/${sex}`);
      setData(response);
      setFilteredData(response);
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      showNotification('Failed to load data. Please try again later.', 'error');
      setData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePagination = (event, newPage) => {
    setPage(newPage);
  };

  const renderRow = (item, index) => {
    // Highlight the total row with a different style
    const isTotal = item['Age Bracket'] === 'Total';
    
    return (
      <TableRow 
        key={item['Age Bracket']} 
        sx={{ 
          fontWeight: isTotal ? 'bold' : 'normal',
          backgroundColor: isTotal ? '#f5f5f5' : 'inherit'
        }}
      >
        <TableCell sx={{ fontWeight: isTotal ? 'bold' : 'normal' }}>
          {item['Age Bracket']}
        </TableCell>
        <TableCell sx={{ fontWeight: isTotal ? 'bold' : 'normal' }}>
          {item['Sta. Rosa']}
        </TableCell>
        <TableCell sx={{ fontWeight: isTotal ? 'bold' : 'normal' }}>
          {item['Sta. Maria']}
        </TableCell>
        <TableCell sx={{ fontWeight: isTotal ? 'bold' : 'normal' }}>
          {item['Sta. Lucia']}
        </TableCell>
        <TableCell sx={{ fontWeight: isTotal ? 'bold' : 'normal' }}>
          {item['San Rafael']}
        </TableCell>
        <TableCell sx={{ fontWeight: isTotal ? 'bold' : 'normal' }}>
          {item['Yawran']}
        </TableCell>
        <TableCell sx={{ fontWeight: isTotal ? 'bold' : 'normal' }}>
          {item['Raele']}
        </TableCell>
        <TableCell sx={{ fontWeight: isTotal ? 'bold' : 'normal' }}>
          {item.Total}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <ManageTable
        headers={SEGREGATION_TABLE_HEADERS}
        data={filteredData}
        loading={loading}
        renderRow={renderRow}
        emptyMessage="No data found"
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePagination}
        count={filteredData.length}
      />
      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />
    </>
  );
};

export default SegregationTable;