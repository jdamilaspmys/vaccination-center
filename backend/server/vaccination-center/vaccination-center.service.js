import VaccinationCenter from './vaccination-center.model.js'
import ReservationService from '../booking/booking.service.js';
import APIError from '../../helpers/APIError.js';
import httpStatus from 'http-status';

const list = async () => {
    try{      
        return await VaccinationCenter.find().sort({ createdAt: -1 }).exec();
       }catch(error) {
        throw error
     }
}

const getById = async (id) => {
   try{
      const vaccinationCenter = await VaccinationCenter.findById(id)
      if(vaccinationCenter){
         return vaccinationCenter
      }
      throw new APIError(httpStatus[404], httpStatus.NOT_FOUND)
   }catch(error){
      throw error
   }
}

const create = async (data) => {
   try{
      const vaccinationCenter = new VaccinationCenter({
         ...data
      })
      return await vaccinationCenter.save()
   }catch(error){
      throw error
   }
}

export default { list, getById, create }