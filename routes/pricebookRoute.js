import express from "express"

// import Authenticate from "../middleware/auth.js";
import { pricebook } from "../controller/pricebookController.js";
const route = express.Router()

route.post("/price", pricebook)
export default route