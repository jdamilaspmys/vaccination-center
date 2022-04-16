import vaccinationCenterService from "../server/vaccination-center/vaccination-center.service.js"

const vaccinationCenterArray = [
    { name: "Bukit Batok CC", capacity: 10 },
    { name: "Bukit Panjang CC", capacity: 30 },
    { name: "Bukit Timah CC", capacity:20 },
    { name: "Outram Park Polyclinic", capacity: 5 },
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