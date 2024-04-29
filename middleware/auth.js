
import jwt from "jsonwebtoken"
import { User } from "../model/userSchema.js";


const Authenticate = async (req, res, next) => {
    try {

        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootUser) { throw new Error('User not Found') }
        
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
        
    } catch (err) {
        console.error('Authentication error:', err.message);
        res.status(401).send('Unauthorized: ' + err.message);
    }
}


export default Authenticate