import React, {Component} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from "@mui/material/Alert";


class LeadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: ''
    };
  }

  componentDidMount() {
    const requestOptions = {
        headers: { 'Accept': 'application/json' },
    };

    fetch("api/lead/", requestOptions)
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { error: 'Request status: ' + response.status + ' - ' + response.statusText };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data
          };
        });
      });
  }

  render() {
    return (
      <>
      {this.state.error == '' ?
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
              {this.state.data.map((contact) => (
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
        <Alert severity="error">{this.state.error}</Alert>
      }
      </>
    );
  }
}

export default LeadList;