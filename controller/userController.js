import {catchAsyncErrors} from "../middleware/catchAsyncErrors.js"
import ErrorHandler from "../middleware/error.js"
import Authenticate from "../middleware/auth.js"
import  {User} from "../model/userSchema.js"; 


export const register = catchAsyncErrors(async(req,res,next)=>{
   

    const {name,email,phone,work,password, cpassword} = req.body
    if(!name || !email || !phone || !password || !work || !password || !cpassword){
        return next(new ErrorHandler("Plz fill full form",400))
    }

    const isEmail = await User.findOne({email});
    if(isEmail){
        return next(new ErrorHandler("User already exsists",400))
    }else if(password !== cpassword){
        return next(new ErrorHandler("password not match ",400))


    }

   
   const  user = await User.create({
        name,
        email,
        phone,
        password,
        work,
        cpassword,
      
    })
     
    res.status(201).json({ message: "user registered successfuly" });


})


export const login =  catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please fill in all details", 400));
    }
    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid email and password", 400));
        }
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email and password", 400));
        }
        const token = await user.generateAuthToken(); // Declare token here
        console.log(token);

        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true,
            secure:true,
        });

        res.json({ message: "User Signin Successfully" });
    } catch (error) {
        next(error);
    }
});

    
export const getData = catchAsyncErrors((req,res,next)=>{
    console.log(`Hello my About`);
    res.send(req.rootUser);
})
   
export const logout = catchAsyncErrors((req,res,next)=>{
    
        console.log(`Hello my Logout Page`);
        res.clearCookie('jwtoken', { path: '/' });
        res.status(200).send('User lOgout');
    
})









