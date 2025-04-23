// pages/admin/accounts/AddAccount.jsx
import { Container, Grid, Box } from '@mui/material';
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { Notification } from "../../../components/common/Notification";
import { useAccountGeneration } from "../hooks/useAccountGeneration";
import { useNotification } from "../hooks/useNotification";

import AccountGenerationForm from "../components/AccountGenerationForm";
import AccountsTable from "../components/AccountsTable";
import PageHeader from "../components/PageHeader";

const AddMultipleAccounts = () => {
  const navigate = useNavigate();

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    setSnackbarOpen,
    showNotification 
  } = useNotification();
  
  const { 
    tempAccounts,
    bulkGeneration,
    errors,
    handleBulkInputChange,
    handleGenerateAccounts,
    handleRemoveAccount,
    handleSaveAllAccounts,
    handleClearAll
  } = useAccountGeneration(showNotification);


  const goBack = () => navigate(-1);

  return (
    <div className="responsive-container"> 
      <PageHeader 
        title="ADD MULTIPLE ACCOUNTS" 
        onBack={goBack}
        icon={<ArrowBack />}
      />
      <Box className='responsive-form details'>
        <AccountGenerationForm
          bulkGeneration={bulkGeneration}
          handleBulkInputChange={handleBulkInputChange}
          handleGenerateAccounts={handleGenerateAccounts}
          errors={errors}
        />
        <AccountsTable 
          tempAccounts={tempAccounts}
          handleRemoveAccount={handleRemoveAccount}
          handleSaveAllAccounts={handleSaveAllAccounts}
          handleClearAll={handleClearAll}
        />
      </Box>
      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />
    </div>
  );
};

export default AddMultipleAccounts;