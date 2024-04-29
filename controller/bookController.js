import ErrorHandler from "../middleware/error.js"
import {Book} from "../model/bookSchema.js"


export const bookNow = async(req,res,next)=>{
    const  {name  ,phone , address , age } = req.body;
    if(!name  || !phone  ||!address ||!age){
        return next(new ErrorHandler("plz fill full contact  form!", 400));

    }
    try {
        await Book.create({name,phone, address , age });
        res.status(200).json({
            success:true,
            message:"congratulation your slot booked successfully!!"
        })
        
    } catch (error) {
        if(error.name === "ValidationError"){
            const ValidationError = object.values(error.errors).map((err)=>err.message);
            return next(new ErrorHandler(ValidationError.join(","),400))
        }
        return next(error);
        
    }
}