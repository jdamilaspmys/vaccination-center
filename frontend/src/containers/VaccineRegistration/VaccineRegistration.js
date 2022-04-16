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
} from "@mui/material";
import DatePicker from '@mui/lab/DatePicker';
import React, { Component } from "react";
import axios from 'axios';
import constants from './../../config/constants'

export class VaccineRegistration extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      vaccinationCenters: [],
      booking: {
        name: '',
        nric: '',
        date: new Date(),
        centerId: ''
      }
    };    
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);    
  }
  handleSelect(event) {
    const state = this.state;
    this.setState({...state, booking: {
      ...state.booking,
      centerId: event.target.value}
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
  handleSubmit(value) {  
    const { nric, centerId, name } = value
    const date = new Date(value.date).toISOString().slice(0,10)    
    if(name && nric && centerId && date){
    const booking = { name, nric, centerId, date: new Date(date) }  
    axios.post(`${constants.API_URL}/api/booking`, booking)
    .then(res => {           
      if(res.data?._id){
        // Redirect to All Booking Page
        window.location.href = '/bookings'
      }else{
        let message = constants.customErrorMessage.UNABLE_TO_MAKE_BOOKING
        alert(message)  
      }
    }).catch((err) => {
      let message = constants.customErrorMessage.UNABLE_TO_MAKE_BOOKING
      if(err?.response?.data){          
          const { customMessage } = err?.response?.data          
          message = constants.customErrorMessage[customMessage] || constants.customErrorMessage.UNABLE_TO_MAKE_BOOKING          
      }
      alert(message)
    })
  }
  }

  componentDidMount() {
    axios.get(`${constants.API_URL}/api/vaccination-center`)
      .then(res => {
        this.setState({ ...this.state, 
          vaccinationCenters: [ ...this.state.vaccinationCenters, ...res.data ],   
          booking: {
            ...this.state.booking,
          }          
        })        
      })
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

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container onSubmit={e => e.preventDefault()}>
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
              sx={{mb: 2}}
              autoFocus      
              value={this.state.booking.nric} 
              onChange={e => this.onChangeNric(e.target.value)}                 
            />
            <TextField
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              sx={{mb: 2}}
              value={this.state.booking.name} 
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
              {
              this.state.vaccinationCenters.map((v) => {
                return <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>;
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
              type="submit"         
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}    
              onClick={() => {this.handleSubmit(this.state.booking)}}            
            >
              Register!
            </Button>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}
