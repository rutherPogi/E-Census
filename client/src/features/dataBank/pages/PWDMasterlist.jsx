import { Container, Paper, Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import { Accessible } from "@mui/icons-material";

import PWDMasterlistTable from "../components/tables/PWDMasterlistTable";
import DatabankHeader from "../components/DataBankHeader";

import { exportMasterlistData } from '../utils/exportData';
import { get } from '../../../utils/api/apiService'; 


export default function PWDMasterlist() {

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleExport = async () => {
    try {
      const [staRosa, staMaria, staLucia, sanRafael, yawran, raele] = await Promise.all([
        get('/databank/pwd/masterlist/Sta. Rosa'),
        get('/databank/pwd/masterlist/Sta. Maria'),
        get('/databank/pwd/masterlist/Sta. Lucia'),
        get('/databank/pwd/masterlist/San Rafael'),
        get('/databank/pwd/masterlist/Yawran'),
        get('/databank/pwd/masterlist/Raele')
      ]);

      exportMasterlistData('PWDMasterlist', staRosa, staMaria, staLucia, sanRafael, yawran, raele);

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
      <DatabankHeader title={'Persons with Disability (PWD)'} Icon={Accessible} onExport={handleExport}/>
      
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="manage tabs">
        <Tab label="Sta. Rosa" />
        <Tab label="Sta. Maria" />
        <Tab label="Sta. Lucia" />
        <Tab label="San Rafael" />
        <Tab label="Yawran" />
        <Tab label="Raele" />
      </Tabs>

      <Box>
        {tabValue === 0 && <PWDMasterlistTable barangay={'Sta. Rosa'}/>}
        {tabValue === 1 && <PWDMasterlistTable barangay={'Sta. Maria'}/>}
        {tabValue === 2 && <PWDMasterlistTable barangay={'Sta. Lucia'}/>}
        {tabValue === 3 && <PWDMasterlistTable barangay={'San Rafael'}/>}
        {tabValue === 4 && <PWDMasterlistTable barangay={'Yawran'}/>}
        {tabValue === 5 && <PWDMasterlistTable barangay={'Raele'}/>}
      </Box>
    </Container>
  );
}
