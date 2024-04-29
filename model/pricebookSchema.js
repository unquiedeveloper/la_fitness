import mongoose from "mongoose"
import validator from "validator"

const pricebookSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        validate: [validator.isEmail, "Provide a valid email"]
    },
    phone:{
        type:String,
        required:true,
    },
    plan:{
        type:String,
        required:true,
        enum:["STANDARD-GYM+GX", "PREMIUM-GYM+PT", "NUTRITION-PLAN", "KNOCKOUT-FIGHTCLUB"]
    },

    address:{
        type:String,
        required:true
    }

    

})

export const Pricebook = mongoose.model("Pricebook", pricebookSchema)