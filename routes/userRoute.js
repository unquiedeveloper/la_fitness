import express from"express";
import { login, getData , logout, register } from "../controller/userController.js";
import Authenticate from "../middleware/auth.js";




const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/logout", logout);
route.get("/getdata" , Authenticate , getData )

export default route 