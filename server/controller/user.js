import { err } from "../helper/errorhandling.js";
import models, { sequelize } from "../model/init-models.js";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const del_usr = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await models.users.destroy({where:{id:id}, returning:true});
        res.send(err(result, 200, 'sukses'));
    } catch (e) {
        res.send(err(400, e.message));
    }
}

const get_usr = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await models.users.findOne({where:{id:id}});
        res.send(err(result, 200, 'sukses'));
    } catch (e) {
        res.send(err(400, e.message));
    }
}

const profile_pic = async (req, res) => {
    try {
        const id = req.params.id;
        const path = `./public/profile/${req.body.path}`;
        //const new_path = './'+path.replace(/\\/g, '/');
        fs.unlinkSync(path);
        const url = `${req.protocol}://${req.get('host')}/profile/${req.file.filename}`;
        const result = await models.users.update({picture:req.file.filename, path:url}, {where:{id:id}});
        res.send(err(result, 200, 'sukses'));
    } catch (e) {
        res.send(err(400, e.message));
    }
}

const update_bio = async (req, res) => {
    try {
        // const id = req.params.id;
        // const find = await models.users.findOne({where:{username:req.body.usr}});
        // if (find) {
        //     res.send(err(400, 'Username Sudah Digunakan'));
        // }
        // else{
        //     const result = await models.users.update({bio:req.body.bio,
        //     gender:req.body.gender,
        //     username:req.body.usr},
        //     {where:{id:id}});
        //     res.send(err(result, 200, 'sukses'));
        // }

        if (req.file) {
            console.log(req.file)
            const id = req.params.id;
            const path = `./public/profile/${req.body.image}`;
            //console.log(path);
            fs.unlinkSync(path);
            const url = `${req.protocol}://${req.get('host')}/profile/${req.file.filename}`;
            const result = await models.users.update({bio:req.body.bio, gender:req.body.gender, email:req.body.email, tempat:req.body.tempat, path: url, picture:req.file.filename}, {where:{id:id}, returning:true});
            res.send(err(result, 200, 'sukses'));    
        }
        else{
            console.log(req.body);
            const id = req.params.id;
            const result = await models.users.update({bio:req.body.bio, gender:req.body.gender, email:req.body.email, tempat:req.body.tempat}, {where:{id:id}, returning:true});     
            res.send(err(result, 200, 'sukses'));       
        }
        
    } catch (e) {
        res.send(err(400, e.message));
    }
}

const get_pic = async (req, res) => {
    try {
        //console.log(__dirname+'/aaaaaa');
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const path1 = path.join(__dirname, '..');
        const path2 = path.join(path1, 'image/profile/827565952.png');
        //res.send(path2);
        res.sendFile(path2);
    } catch (e) {
        res.send(e.message);
    }
}

const insert_dt = async (req, res) => {
    try {
        const {usr, pswd, cnfrm, bio, gender} = req.body;
        const check = await models.users.findOne({where:{username:usr}}); 
        console.log(req.file);
        if (check) {
            const path = req.file.path;
            const new_path = './'+path.replace(/\\/g, '/');
            fs.unlinkSync(new_path);
            res.send(err(400, 'Username Sudah Ada'));
        }
        else{
            if (pswd.length > 8) {
                if (pswd === cnfrm) {
                    const salt = bcrypt.genSaltSync(10);
                    const passhash = bcrypt.hashSync(pswd, salt);
                    const url = `${req.protocol}://${req.get('host')}/profile/${req.file.filename}`;
                    console.log(url);
                    const result = await models.users.create(
                        {username:usr,
                        password:passhash,
                        bio:bio,
                        gender:gender,
                        picture:req.file.filename,
                        path:url},
                        {returning:true}
                    )
                    res.send(err(result, 200, 'Sukses'));    
                }
                else{
                    console.log(req.file);
                    const path = req.file.path;
                    const new_path = './'+path.replace(/\\/g, '/');
                    fs.unlinkSync(new_path);
                    res.send(err(400, 'Konfirmasi Password Salah'));
                }   
            }
            else{
                const path = req.file.path;
                const new_path = './'+path.replace(/\\/g, '/');
                fs.unlinkSync(new_path);
                res.send(err(400, 'Jumlah Karakter Terlalu Pendek'));    
            }
        }
    } catch (e) {
        res.send(err(400, e.message));
    }
}

const find1 = async (req, res) =>{
    try {
        res.send(req.body);
    } catch (e) {
        res.send(err(400, e));
    }
}

const login = async (req, res) => {
    try {
        
        const user = await models.users.findOne({where:{username:req.body.usr}});
        if (user) {
            const match = await bcrypt.compare(req.body.pswd, user.password);
            //console.log(match);
            if (match) {
                //console.log(user.username);
                const accsess_token = jwt.sign({id:user.id, username:user.username}, process.env.SECR_KEY, {expiresIn:'3h'});
                const refresh_token1 = jwt.sign({username:user.username}, process.env.SECR_KEY2, {expiresIn:'1d'});
                await models.users.update(
                    {tokens:'true'},
                    {where:{username:req.body.usr}}
                );
                res.cookie('refresh_token', refresh_token1, 
                {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                });
                res.send(err({token:accsess_token, id:user.id, role:user.role}, 200, 'sukses'))
            }
            else{
                res.send(err(401, 'Password Tidak Ada'));    
            }   
        }
        else{
            res.send(err(401, 'Username Tidak Ada'));
        }
    } catch (e) {
        res.send(err(400, e.message));
    }
}


const logout = async (req, res) => {
    try {
        const refresh = req.cookies.refresh_token;
        if (refresh) {
            const user = await models.users.findOne({where:{tokens:refresh}});
            if (user) {
            //console.log(user.id);
            await models.users.update({
                tokens:null
            }, {where:{id:user.id}});
            res.clearCookie('refresh_token');
            res.send(err(200, 'sukses'));
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
    insert_dt,
    find1,
    login,
    logout,
    del_usr,
    get_pic,
    profile_pic,
    update_bio,
    get_usr
}