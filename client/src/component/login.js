import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { login } from "../action/user";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [item, setItem] = useState({
    usr:'',
    pswd:''
  });
  var {loginListItemResult} = useSelector((state) => state.list);
  const change = (e) => {
        setItem({...item, [e.target.name]:e.target.value});
  }

  // const auth = async (e) => {
  //   e.preventDefault();
  //   dispatch(login(item));
  // }

  const auth2 = async (e) => {
    e.preventDefault();
    const result = await axios({
      method: "POST",
      url: "http://localhost:3400/login",
      data:item
       });
    if (result.data.status === 200) {
      localStorage.setItem('token', result.data.data.token);
      Swal.fire(
        "Username dan Password Benar!",
        'Berhasil Login',
        "success"
      );
      navigate('/dashboard'); 
    }
    else{
      Swal.fire(
              "Username Atau Password Eror!",
              result.data.status,
              "warning"
      );
    }
}

  // useEffect(() => {
  //   if (loginListItemResult) {
  //       if (loginListItemResult.status !== 200) {
  //           Swal.fire(
  //               "Username Atau Password Salah!",
  //               loginListItemResult.status,
  //               "warning"
  //             );
  //       }
  //       else{
  //           console.log('aaaa');
  //           localStorage.setItem('token', loginListItemResult.data.token);
  //           loginListItemResult = null;
  //           navigate('dashboard');
  //       }
  //   }
  //   else{
  //     console.log('cccccc');
  //   }
  // }, [dispatch, loginListItemResult]);
  
  //console.log(localStorage.getItem('token'));
    return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">CODIGRAM</h2>
                  <p className=" mb-5">Please enter your login and password!</p>
                  <div className="mb-3">
                    <Form onSubmit={(e) => auth2(e)}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter email" name="usr" onChange={(e) => change(e)} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="pswd" placeholder="Password" onChange={(e) => change(e)} />
                      </Form.Group>
                     
                     <hr></hr>
                     
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <Link to={'register'}>Register</Link>
                      </p>
                    </div>
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