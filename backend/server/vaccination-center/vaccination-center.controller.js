import vaccinationCenterService from "./vaccination-center.service.js";
import httpResponse from "../../helpers/httpResponse.js";

const list = async (req, res, next) => {
    try{            
        const vaccinationCenters = await vaccinationCenterService.list();
        return httpResponse.successHttpResponse(res, vaccinationCenters)
    }catch(error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try{
        const { id } = req.params;
        const reservation = await vaccinationCenterService.getById(id)
        return httpResponse.successHttpResponse(res, reservation);
    }catch(error){
        next(error)
    }
}

export default { list, getById }