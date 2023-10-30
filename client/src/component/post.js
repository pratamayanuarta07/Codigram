//import React from 'react';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addItem, addPost } from "../action/user";
const Post = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [id, setid] = useState(jwtDecode(localStorage.getItem('token')));
    const [item, setItem] = useState({
    caption:'',
    title:'',
    userid:id.id
  });

  console.log(jwtDecode(localStorage.getItem('token')));
  const [file, setFile] = useState(null);
  const change = (e) => {
        setItem({...item, [e.target.name]:e.target.value});
  }

  const handleFileChange = (e) => {
    //const a = jwt_decode();
    //console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  const {addPostItemResult, addPostItemError} = useSelector((state) => state.list);
  const posting = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', item.title);
    formData.append('caption', item.caption);
    formData.append('userid', item.userid);
    try {
        dispatch(addPost(formData, localStorage.getItem('token')));
    } catch (e) {
        console.log('aaaa');
    }
  }
  
  useEffect(() => {
    if (addPostItemResult) {
      if (addPostItemResult.status !== 200) {
          Swal.fire(
              `${addPostItemResult.status}`,
              'Terjadi Kesalahan Pada Saat Input Data',
              "warning"
            );
      }
      else{
        Swal.fire(
          `Berhasil Memposting`,
          'Postingan Telah di Upload',
          "success"
        );
      }
  }
  if (addPostItemError) {
      Swal.fire(
          "File Yang Diupload Salah!",
          'Ekstensi FIle salah Atau Ukuran File Melebihi 1 MB',
          "warning"
        );
  }

  }, [dispatch, addPostItemError, addPostItemResult]);


    return (
        <div>
            <Form encType="multipart/form-data" onSubmit={(e) => posting(e)}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Title
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Title" name="title" onChange={(e) => change(e)} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label className="text-center">Caption</Form.Label>
                        <Form.Control as="textarea" name="caption" placeholder="Caption"  onChange={(e) => change(e)} />
                      </Form.Group>

                                 
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Upload Profile Picture &nbsp;&nbsp;&nbsp;*(Ukuran File Maksimal 1 MB)</Form.Label>
                        <Form.Control type="file" placeholder="Upload File" onChange={(e) => handleFileChange(e)}/>
                      </Form.Group>

                      

                     <hr></hr>
                     
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </div>
                    </Form>
        </div>
    );
}

export default Post;
