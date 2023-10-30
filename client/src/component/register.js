import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../action/user";
export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [item, setItem] = useState({
    usr:'',
    pswd:'',
    cnfrm:'',
    bio:'',
    gender:'Male'
  });
  const {addListItemResult, addListItemError} = useSelector((state) => state.list); 
  const [file, setFile] = useState(null);
  const change = (e) => {
        setItem({...item, [e.target.name]:e.target.value});
  }

  const handleFileChange = (e) => {
    //console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  //console.log(formData);
  const auth2 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('usr', item.usr);
    formData.append('pswd', item.pswd);
    formData.append('cnfrm', item.cnfrm);
    formData.append('bio', item.bio);
    formData.append('gender', item.gender);
    console.log('aaa');
    try {
        dispatch(addItem(formData));
    } catch (e) {
        console.log('aaaa');
    }
  }


  const auth = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('usr', item.usr);
    formData.append('pswd', item.pswd);
    formData.append('cnfrm', item.cnfrm);
    formData.append('bio', item.bio);
    formData.append('gender', item.gender);
    try {
        const result = await axios({
            method: "POST",
            url: "http://localhost:3400/user",
            data:formData,
            headers:{'Content-Type': 'multipart/form-data'}
             });
        console.log(result); 
        Swal.fire({
            title: "Input Data Berhasil",
            text: "Apakah Anda Ingin Kembali Ke Halaman Login",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Kembali Ke Halaman Login",
          }).then(async (result) => {
            if (result.isConfirmed) {
                navigate(`/`);
            }
          });
    } catch (e) {
        Swal.fire(
            "File Yang Diupload Salah!",
            'Ekstensi FIle salah Atau Ukuran File Melebihi 1 MB',
            "warning"
          );
    }
  }

  useEffect(() => {
    if (addListItemResult) {
        if (addListItemResult.status !== 200) {
            Swal.fire(
                `${addListItemResult.status}`,
                'Terjadi Kesalahan Pada Saat Input Data',
                "warning"
              );
        }
        else{
            Swal.fire({
                title: "Input Data Berhasil",
                text: "Apakah Anda Ingin Kembali Ke Halaman Login",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, Kembali Ke Halaman Login",
              }).then(async (result) => {
                if (result.isConfirmed) {
                    navigate(`/`);
                }
              });
        }
    }
    if (addListItemError) {
        Swal.fire(
            "File Yang Diupload Salah!",
            'Ekstensi FIle salah Atau Ukuran File Melebihi 1 MB',
            "warning"
          );
    }
  }, [dispatch, addListItemError, addListItemResult]);

  //console.log(file);
    return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Register</h2>
                  <p className=" mb-5">Please enter your login and password!</p>
                  <div className="mb-3">
                    <Form encType="multipart/form-data" onSubmit={(e) => auth2(e)}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" name="usr" onChange={(e) => change(e)} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="pswd" placeholder="Password"  onChange={(e) => change(e)} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="cnfrm" placeholder="Confirm Password" onChange={(e) => change(e)} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Bio</Form.Label>
                        <Form.Control type="text" name="bio" placeholder="Bio" onChange={(e) => change(e)} />
                      </Form.Group>
                     
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Upload Profile Picture &nbsp;&nbsp;&nbsp;*(Ukuran File Maksimal 1 MB)</Form.Label>
                        <Form.Control type="file" placeholder="Upload File" onChange={(e) => handleFileChange(e)}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" name="gender" onChange={(e) => change(e)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        </Form.Control>
                      </Form.Group>

                     <hr></hr>
                     
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Register
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}