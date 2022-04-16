import {
  Container,
  Box,
  Button,
  Typography,
  CssBaseline,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  Snackbar,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import React, { Component } from "react";

import axios from "axios";
import constants from "../../config/constants";

export class EditVaccineRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vaccinationCenters: [],
      booking: {
        nric: '',
        name: '',
        date: '',
        centerId: ''
      },
      customErrorMessage : ''
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  handleSelect(event) {
    const state = this.state;
    this.setState({...state, booking: {
      ...state.booking,
      centerId: event.target.value
    }
    });
  }
  handleDateChange(value) {
    const state = this.state;
    this.setState({...state, booking: {
      ...state.booking,
      date: value
    }
    });
  }


  handleOnClick(value) {      
      const { nric, centerId, name, _id } = value
      const date = new Date(value.date).toISOString().slice(0,10)
      if(name && nric && centerId && date){
    const toUpdateObj = { name, nric, centerId, date: new Date(date) }
    axios.put(`${constants.API_URL}/api/booking/${_id}`, toUpdateObj)
    .then(res => { 
      if(res.data?._id){
        // Redirect to All Booking Page
        window.location.href = '/bookings'
      }else{
        let message = constants.customErrorMessage.UNABLE_TO_MAKE_BOOKING
        alert(message)  
      }
    }).catch(err => {
      let message = constants.customErrorMessage.UNABLE_TO_MAKE_BOOKING
      if(err?.response?.data){          
          const { customMessage } = err?.response?.data          
          message = constants.customErrorMessage[customMessage] || constants.customErrorMessage.UNABLE_TO_MAKE_BOOKING          
      }
      const state = this.state
      this.setState({...state,
        customErrorMessage: message
      });
      alert(message)
    })
  }
  }

  onChangeNric(value) {
    const state = this.state;
    this.setState({...state, booking: {
      ...state.booking,
      nric: value
    }
    });
  }

  onChangeName(value) {
    const state = this.state;
    this.setState({...state, booking: {
      ...state.booking,
      name: value
    }
    });
  }

  componentDidMount() {
    const bookingId = this.props.match.params.bookingId
    axios.get(`${constants.API_URL}/api/booking/${bookingId}`)
      .then(res => {   
        this.setState({ 
          ...this.state, 
          booking : {
            ...this.state.booking,
            ...res.data,
            centerId: res.data?.centerId?._id
          }
        })  
      }).catch(err => {
        // Redirect to All Booking Page
        window.location.href = '/bookings'
      })

    axios.get(`${constants.API_URL}/api/vaccination-center`)
      .then(res => {
        this.setState({ ...this.state, vaccinationCenters: [ ...this.state.vaccinationCenters, ...res.data ]})
    })
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Box
            component="form"
            sx={{
              mt: 8,
            }}
          >
            <Typography component="h1" variant="h5">
              Book a slot
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nric"
              label="NRIC Number"
              name="NRIC"
              autoComplete="nric"
              value={this.state.booking?.nric}              
              sx={{mb: 2}}
              autoFocus
              onChange={e => this.onChangeNric(e.target.value)}    
            />
            <TextField
              required
              fullWidth
              id="name"
              label="Full Name"
              value={this.state.booking?.name}
              sx={{mb: 2}}
              name="name"
              autoComplete="name"
              onChange={e => this.onChangeName(e.target.value)}  
            />
            <InputLabel id="vaccineCenterLabel">Vaccine Center</InputLabel>
            <Select
              labelId="vaccineCenterLabel"
              label="Vaccine Center"
              required
              fullWidth
              id="vaccineCenter"
              value={this.state.booking?.centerId}
              onChange={this.handleSelect}
              sx={{mb: 2}}
            >
              {this.state.vaccinationCenters.map((v) => {
                return (
                  <MenuItem key={v._id} value={v._id}>
                    {v.name}
                  </MenuItem>
                );
              })}
            </Select>
            <DatePicker
              renderInput={(props) => <TextField {...props} />}
              label="Date"
              inputFormat="YYYY-MM-DD"   
              value={this.state.booking?.date}
              onChange={this.handleDateChange}
              required
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => { this.handleOnClick(this.state.booking) }}  
            >
              Update!
            </Button>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}
