import vaccinationCenterService from "../server/vaccination-center/vaccination-center.service.js"

const vaccinationCenterArray = [
    { name: "Bukit Batok CC", capacity: 1 },
    { name: "Bukit Panjang CC", capacity: 2 },
    { name: "Bukit Timah CC", capacity:1 },
    { name: "Outram Park Polyclinic", capacity: 1 },
]

const seedVaccinationCenter = async () => {    
    const vaccinationCenters = await vaccinationCenterService.list()
    vaccinationCenterArray.forEach( async (item) => {                
        const vaccinationCenter = vaccinationCenters.find((i) => i?.name === item.name)
        if(!vaccinationCenter){
            await vaccinationCenterService.create(item)
        }
    })
}

export default { 
    seedVaccinationCenter
}