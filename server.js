import app from "./app.js";


app.listen(process.env.PORT,()=>{
    console.log(`connetion is running on the port ${process.env.PORT}`);
})