import mongoose from "mongoose"
import validator from "validator"
import bcrpyt from "bcryptjs"
import jwt from "jsonwebtoken"


const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Plz provide your name!1"],
        minLength:[3, "name must contain atleast 3char"],
        maxLength:[30 , "name cant exteed 30 char"],
    },
    email:{
        type:String,
        required:[true, "Plz provide your email"],
        unique:[true,"user already registered!1"],
        validate: [validator.isEmail, "PLx provide valid email"]
    },
    phone:{

        type:Number,
        required:[true, "Plz provide your phone"],
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:[true, "Plz provide your password"],
        minLength:[8, "password must contain atleast 8char"],
        // maxLength:[50 , "passwordcant exteed 33 char"],
        select:false
    },
   
   cpassword:{
    type:String,
    required:true,
    // maxLength:[50 , "passwordcant exteed 33 char"],
   },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]



})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrpyt.hash(this.password,10);
    this.cpassword = await bcrpyt.hash(this.cpassword, 10);
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrpyt.compare(enteredPassword, this.password);
}

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}


export const User = mongoose.model("User",userSchema);