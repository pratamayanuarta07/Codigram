import { Router } from "express";
import user from "../controller/user.js";
import mdr from "../middleware/mdr.js";
import refreshToken from "../controller/refreshToken.js";
import postingan from "../controller/postingan.js";
import multer from 'multer';
import { err } from "../helper/errorhandling.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/posting'); // Direktori tempat file akan disimpan
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        const new_name = Math.round(Math.random()*1E9)+'.'+ext; 
        cb(null, new_name);
    },
  });

  const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/profile'); // Direktori tempat file akan disimpan
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        const new_name = Math.round(Math.random()*1E9)+'.'+ext; 
        cb(null, new_name);
    },
  });

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      // Terima file dengan tipe MIME 'image/jpeg' atau 'image/png'
      console.log(req.headers['content-length']);
      if (req.headers['content-length'] < 190000) {
        cb(null, true);  
      }
      else{
        cb('Ukuran terlalu besar', false);
      }
      
    } else {
      console.log(file.originalname);
      const error = new Error('File type is not supported');
      error.status = 400;
      
      cb(error);
      // Tolak file dengan tipe MIME lainnya
      //cb('Ekstensi File Bukan Gambar', false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter, });
const upload2 = multer({ storage: storage2, fileFilter: fileFilter, });

const route = Router();
// route.use((err, req, res, next) => {
//   if (err) {
//     res.status(err.status || 500).json({ error: err.message });
//   } else {
//     next(err);
//   }
// });
//route.get('/user', login.checktoken, user.listuser);
route.get('/pic', user.get_pic);
route.post('/user', upload2.single('file'), user.insert_dt);
route.get('/testing', postingan.test);
route.get('/testing3/:id', postingan.test);
route.get('/testing2/:id', postingan.test2);
route.get('/user/:id', user.get_usr);
//route.post('/testing', upload2.single('file'), postingan.test);
route.get('/self/:id', postingan.get_content_self);
route.patch('/update/:id', upload2.single('file'), user.profile_pic);
route.patch('/updatebio/:id', upload2.single('file'), user.update_bio);
route.post('/login', user.login);
route.delete('/delusr/:id', user.del_usr);
route.get('/search/:key', postingan.search_content);
//route.post('/user', user.find1);
//route.get('/user', mdr.cektoken, user.find1);
//route.get('/test/:id', refreshToken.refresh);
//route.post('/posting', mdr.cektoken, upload.single('file'), postingan.insert_content);
route.post('/posting', upload.single('file'), postingan.insert_content);
route.get('/posting/:id', postingan.get_content);
//route.get('/posting3', mdr.cektoken, postingan.get_content);
//route.get('/posting2/:id', mdr.cektoken, postingan.update_content1);
//route.post('/posting2', postingan.update_content1);
route.delete('/delete/:id/:image', postingan.delete_post);
route.patch('/posting/:id', upload.single('file'),  postingan.update_content);
//route.patch('/posting/:id', mdr.cektoken, upload.single('file'),  postingan.update_content);
//route.patch('/posting2/:id', postingan.update_content2);
//route.delete('/logout', user.logout);
//route.get('/test', user.find1);
export default route;