import mongoose from "mongoose"

export const dbConnection = ()=>{
    
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"gym"
    }).then(()=>{
        console.log("connection successfull!!");
    }).catch(()=>{
        console.log(`connection failed ${process.env.MONGO_URL}`);
    })
}
