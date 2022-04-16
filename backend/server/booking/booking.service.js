import httpStatus from 'http-status';
import constant from '../../config/constant.js';
import APIError from '../../helpers/APIError.js';
import vaccinationCenterService from '../vaccination-center/vaccination-center.service.js';
import Booking from './booking.model.js'

 const list = async (req, res, next) => {
    try{
        const { limit = 100, skip = 0 } = req.query || {};
        return await Booking.find()
                        .sort({ createdAt: -1 })
                        .populate('centerId')
                        .skip(+skip)
                        .limit(+limit)
                        .exec();
       }catch(error) {
        throw error
     }
}

const create = async (body) => {
   try{        
      const { centerId, nric, date } = body;
      const foundDuplicateBooking = await Booking.findOne({ nric })              
      if(foundDuplicateBooking){
         const message = constant.customErrorMessage.duplicateBooking
         throw new APIError(message, httpStatus.BAD_REQUEST, false)
      }
      const vaccinationCenter = await vaccinationCenterService.getById(centerId)  
      if(!vaccinationCenter){
         const message = constant.customErrorMessage.invalidVaccinationCenter
         throw new APIError(message, httpStatus.BAD_REQUEST, false)
      }         
      const { capacity } = vaccinationCenter      
      const bookings = await Booking.find({ centerId, date })
      const totalBooking = bookings.length;          
      if(capacity > totalBooking){
         const booking = new Booking({
            ...body,
         })
         return await booking.save()
      }else{
         const message = constant.customErrorMessage.vaccinationCenterAlreadyBooked;
         throw new APIError(message, httpStatus.BAD_REQUEST, false)
      }      
   }catch(error){
      throw error
   }
}

const updateById = async (id, body) => {
   try{            
      const booking = await Booking.findById(id).exec()
      if(!booking){
         throw new APIError(httpStatus[404], httpStatus.NOT_FOUND)
      }
      const { centerId, date, nric } = body;
      const foundDuplicateBooking = await Booking.findOne({ nric })          
      if(foundDuplicateBooking && String(foundDuplicateBooking?._id) !== id){         
         const message = constant.customErrorMessage.duplicateBooking
         throw new APIError(message, httpStatus.BAD_REQUEST, false)
      }
      const vaccinationCenter = await vaccinationCenterService.getById(centerId)  
      if(!vaccinationCenter){
         const message = constant.customErrorMessage.invalidVaccinationCenter
         throw new APIError(message, httpStatus.BAD_REQUEST, false)
      }      
      const { capacity } = vaccinationCenter      
      const bookings = await Booking.find({ centerId, date })   
      const totalBooking = bookings.length;   
      const foundBooking = bookings.find((r) => String(r._id) === id)      
      const finalBookingCount = !foundBooking ? totalBooking + 1 : totalBooking
      if(capacity >= finalBookingCount){         
         const { name, nric, date, centerId } = body;
         return await Booking.findByIdAndUpdate(id, { name, nric, date, centerId }, { new : true })         
      }else{
         const message = constant.customErrorMessage.vaccinationCenterAlreadyBooked;
         throw new APIError(message, httpStatus.BAD_REQUEST, false)
      }      
   }catch(error){
      throw error
   }
}

const getById = async (id) => {
   try{      
      const booking = await Booking.findById(id).populate('centerId')
      if(booking){
         return booking
      } 
      throw new APIError(httpStatus[404], httpStatus.NOT_FOUND)
   }catch(error){
      throw error
   }
}

const deleteById = async (_id) => {
   try{       
      const { deletedCount } = await Booking.deleteOne({ _id })      
      if(!deletedCount) {
         throw new APIError(httpStatus[404], httpStatus.NOT_FOUND)
      }
   }catch(error){
      throw error
   }
}

export default { list, create, getById, deleteById, updateById }