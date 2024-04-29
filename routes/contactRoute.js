import express from "express"
import { sendContact } from "../controller/contactController.js"

const route = express.Router()

route.post("/send", sendContact)
export default route