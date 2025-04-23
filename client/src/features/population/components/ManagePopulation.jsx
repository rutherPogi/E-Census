import { useState, useEffect } from 'react';
import { TableRow, TableCell } from '@mui/material';

import { get } from '../../../utils/api/apiService';
import { Notification } from '../../../components/common/Notification';
import { SearchBar, ManageTable } from '../../../components/common';
import { MANAGE_TABLE_HEADERS } from '../utils/constants';

import { useNotification } from '../hooks/useNotification';



const ManagePopulation = () => {
 
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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
      const response = await get('/population/get');
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

  const updateSearchResults = (searchTerm) => {

    if (!searchTerm) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter(survey => 
      survey['Population ID'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredData(filtered);
    setPage(0);
  };

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
        <TableCell>{item['Population ID']}</TableCell>
        <TableCell>{item.Name}</TableCell>
        <TableCell>{formatDate(item.Birthdate)}</TableCell>
        <TableCell>{item.Age}</TableCell>
        <TableCell>{item['Civil Status']}</TableCell>
        <TableCell>{item['Relationship to Family Head']}</TableCell>
        <TableCell>{item['Educational Attainment']}</TableCell>
        <TableCell>{item.Occupation || 'N/A'}</TableCell>
        <TableCell>{item.Skills || 'N/A'}</TableCell>
        <TableCell>{item['Employment Type'] || 'N/A'}</TableCell>
        <TableCell>{item['Philhealth Number'] || 'N/A'}</TableCell>
        <TableCell>{item['Monthly Income']}</TableCell>
        <TableCell>{item['Health Status'] || 'N/A'}</TableCell>
        <TableCell>{item.Remarks}</TableCell>
        <TableCell>{item['PWD ID']}</TableCell>
        <TableCell>{item['Solo Parent ID']}</TableCell>
        <TableCell>{item['Senior Citizen ID']}</TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <SearchBar 
        onSearch={updateSearchResults}
        placeholder="Search by Population ID or Name"
      />
      <ManageTable
        headers={MANAGE_TABLE_HEADERS}
        data={filteredData}
        loading={loading}
        renderRow={renderRow}
        emptyMessage="No person found"
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePagination}
        onRowsPerPageChange={handleChangeRowsPerPage}
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

export default ManagePopulation;