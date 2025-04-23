import { useState, useEffect } from 'react';
import { TableRow, TableCell } from '@mui/material';

import { get } from '../../../../utils/api/apiService';
import { Notification } from '../../../../components/common/Notification';
import { ManageTable } from '../../../../components/common';
import { WOMEN_MASTERLIST_HEADERS } from '../../utils/constants';

import { useNotification } from '../../hooks/useNotification';



const WomenMasterlistTable = ({ barangay }) => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
      const response = await get(`/databank/women/masterlist/${barangay}`);
      setData(response);
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      showNotification('Failed to load data. Please try again later.', 'error');
      setData([]);
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderRow = (item) => {
    return (
      <TableRow key={item.ID}>
        <TableCell>{item.ID}</TableCell>
        <TableCell>{item.Name}</TableCell>
        <TableCell>{formatDate(item['Date of Birth'])}</TableCell>
        <TableCell>{item.Age}</TableCell>
        <TableCell>{item['Educational Attainment']}</TableCell>
        <TableCell>{item.Skills}</TableCell>
        <TableCell>{item.Occupation}</TableCell>
        <TableCell>{item.Remarks}</TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <ManageTable
        headers={WOMEN_MASTERLIST_HEADERS}
        data={data}
        loading={loading}
        renderRow={renderRow}
        emptyMessage="No women masterlist data found"
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePagination}
        onRowsPerPageChange={handleChangeRowsPerPage}
        count={data.length}
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

export default WomenMasterlistTable;