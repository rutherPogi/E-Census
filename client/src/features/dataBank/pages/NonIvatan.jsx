import { Container, Paper, Tabs, Tab, Box, Typography, Button, Divider } from "@mui/material";
import { useState } from "react";
import { Hail } from "@mui/icons-material";

import NonIvatanTable from "../components/tables/NonIvatanTable";
import DatabankHeader from "../components/DatabankHeader";

import { exportMasterlistData } from '../utils/exportData';
import { get } from '../../../utils/api/apiService'; 



export default function NonIvatan() {

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleExport = async () => {
    try {
      const [staRosa, staMaria, staLucia, sanRafael, yawran, raele] = await Promise.all([
        get('/databank/non-ivatan/masterlist/Sta. Rosa'),
        get('/databank/non-ivatan/masterlist/Sta. Maria'),
        get('/databank/non-ivatan/masterlist/Sta. Lucia'),
        get('/databank/non-ivatan/masterlist/San Rafael'),
        get('/databank/non-ivatan/masterlist/Yawran'),
        get('/databank/non-ivatan/masterlist/Raele')
      ]);

      exportMasterlistData('NonIvatanMasterlist', staRosa, staMaria, staLucia, sanRafael, yawran, raele);

    } catch (err) {
      console.error("Export failed:", err);
      alert("Something went wrong during export!");
    }
  };

  return (
    <Container
      component={Paper}
      sx={{
        borderRadius: 2,
        backgroundColor: "#fff",
        p: 5,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <DatabankHeader title={'Masterlist of Non-Ivatan'} Icon={Hail} onExport={handleExport}/>
      
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="manage tabs">
        <Tab label="Sta. Rosa" />
        <Tab label="Sta. Maria" />
        <Tab label="Sta. Lucia" />
        <Tab label="San Rafael" />
        <Tab label="Yawran" />
        <Tab label="Raele" />
      </Tabs>

      <Box>
        {tabValue === 0 && <NonIvatanTable barangay={'Sta. Rosa'}/>}
        {tabValue === 1 && <NonIvatanTable barangay={'Sta. Maria'}/>}
        {tabValue === 2 && <NonIvatanTable barangay={'Sta. Lucia'}/>}
        {tabValue === 3 && <NonIvatanTable barangay={'San Rafael'}/>}
        {tabValue === 4 && <NonIvatanTable barangay={'Yawran'}/>}
        {tabValue === 5 && <NonIvatanTable barangay={'Raele'}/>} 
      </Box>
    </Container>
  );
}
