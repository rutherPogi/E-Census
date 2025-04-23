import { useState, useEffect } from "react";
import { Container, Paper, Tabs, Tab, Box } from "@mui/material";
import { Wc } from "@mui/icons-material";

import SegregationTable from "../components/tables/SegregationTable";
import SegregationTotalTable from "../components/tables/SegregationTotalTable";
import DatabankHeader from "../components/DataBankHeader";

import { exportSegregationData } from '../utils/exportData';
import { get } from '../../../utils/api/apiService'; 




export default function Segregation() {

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const handleExport = async () => {
    try {
      const [female, femaleTotal, male, maleTotal] = await Promise.all([
        get('/databank/segregation/Female'),
        get('/databank/segregation/total/Female'),
        get('/databank/segregation/Male'),
        get('/databank/segregation/total/Male')
      ]);

      exportSegregationData(female, femaleTotal, male, maleTotal);

    } catch (err) {
      console.error("Export failed:", err);
      alert("Something went wrong during export!");
    }
  };

  return (
    <Container component={Paper} sx={{ borderRadius: 2, backgroundColor: "#fff", p: 5, display: "flex", flexDirection: "column", gap: 3 }}>
      <DatabankHeader title={'Male & Female Segregation'} Icon={Wc} onExport={handleExport} />

      <Tabs value={tabValue} onChange={handleTabChange} aria-label="manage tabs">
        <Tab label="Female" />
        <Tab label="Female Total" />
        <Tab label="Male" />
        <Tab label="Male Total" />
      </Tabs>

      <Box>
        {tabValue === 0 && <SegregationTable sex={'Female'} />}
        {tabValue === 1 && <SegregationTotalTable sex={'Female'} />}
        {tabValue === 2 && <SegregationTable sex={'Male'} />}
        {tabValue === 3 && <SegregationTotalTable sex={'Male'} />}
      </Box>
    </Container>
  );
}
