import mongoose from "mongoose"
import validator from "validator"

const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    }
    

})

export const Book = mongoose.model("Book", bookSchema)