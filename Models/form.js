const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FormSchema= new Schema({
    companyGovernate:{
        type:String,
        required:true
    },
    companyCity:{
        type:String,
        required:true
    },
    companyAddress:{
        type:String,
        required:true
    },
    companyTelephone:{
        type:String
    },
    companyFax:{
        type:String
    },
    companyName:{
        type:String,
        required:true
    },
    companyNameInEnglish:{
        type:String
    },
    currency:{
        type:String,
        required:true
    },
    equityCapital:{
        type:Number,
        required:true
    },
    SSCManagers:{
        type:[SSCManager]
        },
    type:
        {
            type:String,
            required:true
        },
    status:{
            type: String,
            required:true 
    
        } 
})
const SSCManager= new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    nationality: {
        type:String,
        required: true
    },

     identificationType: {
        type: String,
        required: true
    },
     identificationNumber:{
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
     typeOfManagers: {
        type: String,
        required: true
    }
    
   
})

module.exports = Form = mongoose.model('forms', FormSchema)