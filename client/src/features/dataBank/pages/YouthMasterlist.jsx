import { Container, Paper, Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import { Boy } from "@mui/icons-material";

import MasterlistYouthTable from "../components/tables/MasterlistYouthTable";
import DatabankHeader from "../components/DataBankHeader";

import { exportMasterlistData } from '../utils/exportData';
import { get } from '../../../utils/api/apiService'; 



export default function YouthMasterlist() {

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const handleExport = async () => {
    try {
      const [staRosa, staMaria, staLucia, sanRafael, yawran, raele] = await Promise.all([
        get('/databank/youth/masterlist/Sta. Rosa'),
        get('/databank/youth/masterlist/Sta. Maria'),
        get('/databank/youth/masterlist/Sta. Lucia'),
        get('/databank/youth/masterlist/San Rafael'),
        get('/databank/youth/masterlist/Yawran'),
        get('/databank/youth/masterlist/Raele')
      ]);

      exportMasterlistData('YouthMasterlist', staRosa, staMaria, staLucia, sanRafael, yawran, raele);

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
      <DatabankHeader title={'Masterlist of Youth (15-30 years old)'} Icon={Boy} onExport={handleExport}/>
      
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="manage tabs">
        <Tab label="Sta. Rosa" />
        <Tab label="Sta. Maria" />
        <Tab label="Sta. Lucia" />
        <Tab label="San Rafael" />
        <Tab label="Yawran" />
        <Tab label="Raele" />
      </Tabs>

      <Box>
        {tabValue === 0 && <MasterlistYouthTable barangay={'Sta. Rosa'}/>}
        {tabValue === 1 && <MasterlistYouthTable barangay={'Sta. Maria'}/>}
        {tabValue === 2 && <MasterlistYouthTable barangay={'Sta. Lucia'}/>}
        {tabValue === 3 && <MasterlistYouthTable barangay={'San Rafael'}/>}
        {tabValue === 4 && <MasterlistYouthTable barangay={'Yawran'}/>}
        {tabValue === 5 && <MasterlistYouthTable barangay={'Raele'}/>}  
      </Box>
    </Container>
  );
}
