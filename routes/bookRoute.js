import express from "express"
import {bookNow} from "../controller/bookController.js"
import Authenticate from "../middleware/auth.js";
const route = express.Router()

route.post("/booknow",   bookNow)
export default route