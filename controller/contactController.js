import ErrorHandler from "../middleware/error.js"
import {Contact} from "../model/contactSchema.js"


export const sendContact = async(req,res,next)=>{
    const  {name,  email,subject, message} = req.body;
    if(!name || !email || !subject ||!message){
        return next(new ErrorHandler("plz fill full contact  form!", 400));

    }
    try {
        await Contact.create({name,  email,subject, message});
        res.status(200).json({
            success:true,
            message:"Contact  send successfylly"
        })
        
    } catch (error) {
        if(error.name === "ValidationError"){
            const ValidationError = object.values(error.errors).map((err)=>err.message);
            return next(new ErrorHandler(ValidationError.join(","),400))
        }
        return next(error);
        
    }
}