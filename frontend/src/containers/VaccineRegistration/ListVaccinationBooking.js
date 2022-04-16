import {
  Table,
  Box,
  Button,
  CssBaseline,
  Typography,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Container,
} from "@mui/material";
import { Link } from 'react-router-dom';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { Component } from "react";
import axios from 'axios';
import constants from "../../config/constants";

export class VaccineRegistrationListing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vaccinationCenters: []
    };    
  }

  handleDelete(value) {
    axios.delete(`${constants.API_URL}/api/booking/${value._id}`)
    .then(res => {
      if(res.data === 'OK'){
        this.loadReservation()
      }
    })
  }

  loadReservation() {
    axios.get(`${constants.API_URL}/api/booking`)
    .then(res => {
      this.setState({ ...this.state, vaccinationCenters: [ ...res.data ]})
    })
  }

  componentDidMount() {
    this.loadReservation()
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Box sx={{mt: 8}}>
            <Typography component="h1" variant="h5">
              Active Booking
            </Typography>
            <TableContainer component={Box}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>NRIC Number</TableCell>
                    <TableCell align="left">Full Name</TableCell>
                    <TableCell align="left">Vaccine Center</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.vaccinationCenters.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.nric}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row?.centerId.name}</TableCell>
                      <TableCell align="left">
                        {row?.date ? new Date(row?.date).toLocaleDateString() : ''}
                      </TableCell>
                      <TableCell align="left">
                        <Button component={Link} to={`/bookings/${row._id}`} >
                          <ModeEditIcon />
                        </Button>
                        <Button onClick={() => {
                          this.handleDelete(row)
                        }}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}
