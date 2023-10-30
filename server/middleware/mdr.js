import { err } from "../helper/errorhandling.js";
import models, { sequelize } from "../model3/init-models.js";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";


const cektoken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        //console.log(req.body);
        if (token) {
            //console.log('umumumumu');
            const verify =  jwt.verify(token, process.env.SECR_KEY);
            //console.log('aaa'+verify);
           if (!verify) {
            res.send(err(400, 'Token Salah'));
           }
           else{
            //console.log('bababa');
            next();
           }
        }
        else{
            res.send(err(400, 'Tidak Terauthorisasi'));
        }
    } catch (e) {
        res.send(err(400, e.message));
    }
}

export default {
    cektoken
}