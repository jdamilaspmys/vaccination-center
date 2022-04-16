# Vaccine Booking Web Application 

[Demo](http://localhost:3000)

## About The Project 

Covid Vaccine Booking Web Application 

## Build With 

- Nodejs / ExpressJs 
- Reactjs 
- MongoDB

## Getting Start 

## Pre Requirement 

- NodeJs / Npm or Yarn 
- Mongodb 

### Start : Backend 

Install lib 
```
cd backend 
npm i 
```
Create .env using .env.example 
```
NODE_ENV=development
PORT=4000
MONGO_HOST=mongodb://localhost:27017/vaccination-center
```
Start Backend Application 
```
npm run start 
```
Health Check 

[Link](http://localhost:4000/api/health-check)

Note : When Start Application Automatically Seed All Vaccination Centers 
`backend/seed/seed.js` -> `vaccinationCenterArray` 
```
[
    { name: "Bukit Batok CC", capacity: 10 },
    { name: "Bukit Panjang CC", capacity: 30 }
] 
```

### Start : Frontend  
Install Lib 
```
cd frontend
yarn
```
Start Frontend Application 
```
npm run start
```
Application Start 

[Link](http://localhost:3000)

## Backend - Available Routes 

Base URL `{{HOST}}/api`

### Vaccination Center 
```
{
    "_id": "62596e77e079e3de7007b614",
    "name": "Bukit Batok CC",
    "capacity": 10,
    "createdAt": "2022-04-15T13:09:11.735Z",
    "updatedAt": "2022-04-15T13:09:11.735Z",
}
```
- `GET: /vaccination-center` - List All Vacination-Center 
- `GET: /vaccination-center/:id` - Get Vaccination-Center By Id 

### Booking 
```
{
  "_id": "625a71a2d5d9fd12bb56dfc4",
  "nric": "F82332",
  "name": "F Nura",
  "date": "2022-04-16T00:00:00.000Z",
  "centerId": {
    "_id": "62596e77e079e3de7007b614",
    "name": "Bukit Batok CC",
    "capacity": 2,
    "createdAt": "2022-04-15T13:09:11.735Z",
    "updatedAt": "2022-04-15T13:09:11.735Z"
  },
  "createdAt": "2022-04-16T07:34:58.501Z",
  "updatedAt": "2022-04-16T07:35:49.707Z",
}
```
- `GET: /booking` - List all the booking in a table
- `POST: /booking` - Create a new Booking
- `PUT: /booking/:id` - Update Booking By Id
- `GET: /booking/:id` - Get Booking By Id
- `DELETE: /booking/:id` - Delete Booking By Id

## Frontend - Containers

### VaccineRegistration
-  UI to accept data from the users to make new booking
-  List All Vaccination-Center

### VaccineRegistrationListing
- UI to list all bookings
- Each booking include Update/Delete 
- When Click Update -> Redirect Edit UI
- When Cleck Delete -> Delete Records and Refresh Booking List 

### EditVaccineRegistration
- UI to update selected booking 
- When Click Update -> Update Registration and Redirect to Booking List 


## Contact and Support 
- Name : Amila Sampath 
- Email : jdamilaspmys@gmail.com 

