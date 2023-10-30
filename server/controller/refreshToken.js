import models, { sequelize } from "../model3/init-models.js";
import  jwt  from "jsonwebtoken";
import { err } from "../helper/errorhandling.js";

const refresh = async (req, res) => {
    try {
        const refresh = req.cookies.refresh_token;
        if (refresh) {
            const user = await models.users.findOne({where:{tokens:refresh}});
            if (user) {
                const verify =  jwt.verify(refresh, process.env.SECR_KEY2);
                if (verify) {
                    const accsess_token = jwt.sign({username:user.username}, process.env.SECR_KEY, {expiresIn:'20s'});
                    res.send(err(accsess_token, 200, 'sukses'));
                }
                else{
                    res.send(err(400, 'Token Salah'));
                }
            }
            else{
                res.send(err(400, 'Token Tidak Sesuai'));    
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
    refresh
}