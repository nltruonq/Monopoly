const Location= require("../models/location.model") 

const locationController={
    getLocations: async(req,res)=>{
        try {
            const list = await Location.find()
            res.json({
                list,
                status:200,
            })
        } catch (error) {
            console.log(error)
        }
    },
    postLocations:async(req,res)=>{
        try {
            const {list}=req.body
            list.forEach(async(value,index)=>{
                const location= new Location(value)
                await location.save()
            })
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports =locationController