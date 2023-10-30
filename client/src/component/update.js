import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { updatePosting } from '../action/user';
import Swal from "sweetalert2";
const Update = () => {
    const dispatch = useDispatch();
    const {id, image} = useParams();
    const [item, setItem] = useState({
        caption:'',
        title:'',
      });
    const [file, setFile] = useState(null);
    const change = (e) => {
        setItem({...item, [e.target.name]:e.target.value});
    }
    console.log(image);
    const handleFileChange = (e) => {
    //const a = jwt_decode();
    //console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    };

    const updte = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', item.title);
        formData.append('caption', item.caption);
        formData.append('image', image);
        try {
            dispatch(updatePosting(id, formData, localStorage.getItem('token')));
            Swal.fire(
                `Berhasil Memposting`,
                'Postingan Telah di Upload',
                "success"
              );
        } catch (e) {
            console.log('aaaa');
        }
      }


    return (
        <div>
            <Form encType="multipart/form-data" onSubmit={(e) => updte(e)}>
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
                        <Form.Control as="textarea" name="caption" placeholder="Enter Caption"  onChange={(e) => change(e)} />
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

export default Update;
