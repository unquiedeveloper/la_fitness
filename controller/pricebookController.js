import ErrorHandler from "../middleware/error.js"
import { Pricebook } from "../model/pricebookSchema.js";


export const pricebook = async(req,res,next)=>{
    const  {name  ,phone , address , plan , email } = req.body;
    if(!name  || !phone  ||!address ||!plan || !email){
        return next(new ErrorHandler("plz fill full contact  form!", 400));

    }
    try {
        await Pricebook.create({name , email  , address , plan , phone })
        res.status(200).json({
            success:true,
            message:"your request sent successfully!! sortly our agent will call you!!!!"
        })
        
    } catch (error) {
        console.log(error);
        // if(error.name === "ValidationError"){
        //     // const ValidationError = object.values(error.errors).map((err)=>err.message);
        //     return next(new ErrorHandler(ValidationError.join(","),400))
        // }
        return next(error);
        
    }
}