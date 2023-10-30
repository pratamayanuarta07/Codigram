import { err } from "../helper/errorhandling.js";
import models, { sequelize } from "../model/init-models.js";
import { Op } from 'sequelize';
import fs from 'fs';
const insert_content = async (req, res) => {
    try {
        //console.log(req.file);
        const {caption, userid, title} = req.body;
        const url = `${req.protocol}://${req.get('host')}/posting/${req.file.filename}`;
        const result = await models.posting.create(
            {caption:caption,
            userid:userid,
            title:title,
            image:req.file.filename,
            path:url
        },
        {returning:true}
        );
        res.send(err(result, 200, 'sukses'));
    } catch (e) {
        res.send(err(400, e.message));       
    }
}

const test = async (req, res) => {
    try {
        //const id = req.params.id;
        const query = `select * from get_it()`;
        const result = await sequelize.query(query);
        console.log(result[0]);
        res.send(err(result[0], 200, 'sukses'));
    } catch (e) {
        res.send(err(400, e.message));
    }
}

const test2 = async (req, res) => {
    try {
        const id = req.params.id;
        const query = `select * from get_one(${id})`;
        const result = await sequelize.query(query);
        console.log(result[0]);
        res.send(err(result[0], 200, 'sukses'));
    } catch (e) {
        res.send(err(400, e.message));
    }
}


const get_content = async (req, res) => {
    try {
        //console.log('amamamama');
        const result = await models.posting.findAll({where:{userid:{[Op.not]:req.params.id}}});
        res.send(err(result, 200, 'sukses'));
    } catch (e) {
        res.send(err(400, e.message));
    }
}

const get_content_self = async (req, res) => {
    try {
        //console.log('amamamama');
        const result = await models.posting.findAll({where:{userid:req.params.id}});
        res.send(err(result, 200, 'sukses'));
    } catch (e) {
        res.send(err(400, e.message));
    }
}

const update_content = async (req, res) => {
    try {
        if (req.file) {
            const id = req.params.id;
            const path = `./public/posting/${req.body.image}`;
            //console.log(path);
            fs.unlinkSync(path);
            const url = `${req.protocol}://${req.get('host')}/posting/${req.file.filename}`;
            const result = await models.posting.update({caption:req.body.caption, path: url, image:req.file.filename, title:req.body.title}, {where:{id:id}, returning:true});
            res.send(err(result, 200, 'sukses'));    
        }
        else{
            const id = req.params.id;
            console.log(req.body);
            const result = await models.posting.update({caption:req.body.caption, title:req.body.title}, {where:{id:id}, returning:true});     
            res.send(err(result, 200, 'sukses'));       
        }
        
    } catch (e) {
        res.send(err(400, e.message));
    }
}

const delete_post = async (req, res) => {
    try {
        const id = req.params.id;
        const path = `./public/posting/${req.params.image}`;
        //const new_path = './'+path.replace(/\\/g, '/');
        fs.unlinkSync(path);
        const result = await models.posting.destroy({where:{id:id}});
        res.send(err(result, 200, 'sukses'));
    } catch (e) {
        res.send(err(400, e.message));
    }
}

const update_content2 = async (req, res) => {
    try {
        const result = await models.postingan.update({title:req.body.title, content:req.body.content,
        linkedin:req.body.linkedin, email:req.body.email, telpon:req.body.telpon},
          {where:{id:req.params.id}}  );
        res.send(err(result, 200, 'sukses'));
    } catch (e) {
        res.send(err(400, e.message));
    }
}

const search_content = async (req, res) => {
    try {
        const search = req.params.key;
        console.log(req.params.key);
        const result = await models.posting.findAll({where:{title:{[Op.iLike]:`%${search}%`}}});
        res.send(err(result, 200, 'sukses'));
    } catch (e) {
        res.send(err(400, e.message));
    }
}



export default {
    insert_content,
    get_content,
    update_content,
    delete_post,
    update_content2,
    test,
    test2,
    get_content_self,
    search_content
}