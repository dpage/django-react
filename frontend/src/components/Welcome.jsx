import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function DescriptionAlerts() {
  return (
    <>
    <h1>Welcome</h1>
      <Alert variant="outlined" severity="success">
        <AlertTitle>Welcome</AlertTitle>
          <strong>Welcome to the Leads App!</strong> Click the Leads option on the menu above to view leads.
      </Alert>
    </>
  );
}