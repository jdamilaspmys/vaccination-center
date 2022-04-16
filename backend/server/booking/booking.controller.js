import bookingService from "./booking.service.js";
import httpResponse from "../../helpers/httpResponse.js";
import Joi from "joi";
import schemaValidator from '../../helpers/schemaValidate.js'

const list = [
    async (req, res, next) => {
        try{            
            const bookings = await bookingService.list(req, res, next);
            return httpResponse.successHttpResponse(res, bookings)
        }catch(error) {
            next(error)
        }
    }
]

const createSchema = {
    nric: Joi.string().required(),
    name: Joi.string().required(),
    centerId: Joi.string().required(),
    date: Joi.date().required()
}
const create = [
    schemaValidator.reqBodySchemaValidator(createSchema),
    async (req, res, next) => {
        try{
            const { body } = req
            const newBooking = await bookingService.create(body)
            return httpResponse.successHttpResponse(res, newBooking);
        }catch(error){
            next(error)
        }
    }
]

const updateByIdSchema = {
    nric: Joi.string().required(),
    name: Joi.string().required(),
    centerId: Joi.string().required(),
    date: Joi.date().required()
}
const updateById = [
    schemaValidator.reqBodySchemaValidator(updateByIdSchema),
    async (req, res, next) => {
        try{
            const { id } = req.params
            const { body } = req
            const newBooking = await bookingService.updateById(id,body)
            return httpResponse.successHttpResponse(res, newBooking);
        }catch(error){
            next(error)
        }
    }
]

const getById = async (req, res, next) => {
    try{
        const { id } = req.params
        const booking = await bookingService.getById(id)
        return httpResponse.successHttpResponse(res, booking);
    }catch(error){
        next(error)
    }
}

const deleteById = async (req, res, next) => {
    try{
        const { id } = req.params
        const booking = await bookingService.deleteById(id)
        return httpResponse.successHttpResponse(res, booking);
    }catch(error){
        next(error)
    }
}


export default { list, create, getById, deleteById, updateById }