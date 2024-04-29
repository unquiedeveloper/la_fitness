import mongoose from "mongoose";
import validator from "validator";

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3, "First name must contain at least 3 characters"],
        maxLength:[30, "First name can't exceed 30 characters"]
    },
    email:{
        type:String,
        required:true,
        validate: [validator.isEmail, "Provide a valid email"]
    },
    subject:{
        type:String,
        required:true,
        minLength:[5, "subject must contain exactly 5 characters"],
     
    },
    message:{
        type:String,
        required:true

    }
});

export const Contact = mongoose.model("Contact", contactSchema);
