const mongoose = require('mongoose');

const locationSchema=mongoose.Schema({
    city: {
        type: String,
        require:true,
    },
    boardIndex:{
        type:Number,
        require:true,
    },
    basePrice:{
        type:Number,
        require:true,
    },
    commonRatio:{
        type:Number
    },
    redemptionRatio:{
        type:Number
    },
    type:{
        type:String
    }

})


module.exports = mongoose.model("Location",locationSchema)