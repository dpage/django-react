import React, {Component, useContext, useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import {AppContext} from "./AppContext";


function LeadList(props) {
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);

  const appContext = useContext(AppContext);

  useEffect(()=>{
    const requestOptions = {
        headers: { 'Accept': 'application/json' },
    };

    if (appContext.user.isAuthenticated) {
      fetch("api/lead/", requestOptions)
        .then(response => {
          if (response.status > 400) {
            return setError('Request status: ' + response.status + ' - ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          setData(data);
        });
    }
    else
    {
      setError('');
    }

  },[appContext.user.isAuthenticated])

  return (
    <>
      {!appContext.user.isAuthenticated ?
        <>
          <h1>Login</h1>
          <Alert variant="outlined" severity="error">Please login to see the lead list.</Alert>
        </>
      :
        <>
        <h1>Lead List</h1>
          {error == '' ?
            <TableContainer component={Paper}>
              <Table size="small" aria-label="Lead List">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Message</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((contact) => (
                    <TableRow
                      key={contact.name}
                      sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                      <TableCell component="th" scope="row">
                        {contact.name}
                      </TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          :
            <Alert variant="outlined" severity="error">{error}</Alert>
          }
        </>
      }
    </>
  );
}

export default LeadList;