import React, { useEffect, useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getOne } from '../action/user';
import {Link, Outlet} from "react-router-dom";
const Search = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [issearch, setis] = useState(false);
    const {getOnePostItemResult} = useSelector((state) => state.list); 
    const change = (e) => {
        setSearch(e.target.value);
    }
    //console.log(search);
    const posting = async (e) => {
        e.preventDefault();
        setis(!issearch);
        dispatch(getOne(search));    
    }
    useEffect(() => {
        if (getOnePostItemResult) {
            console.log(getOnePostItemResult);
        }
    }, [dispatch, issearch]);
    console.log(getOnePostItemResult);
    return (
        <div>
            <Form encType="multipart/form-data" onSubmit={(e) => posting(e)}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Title
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Title" name="search" onChange={(e) => change(e)} />
                      </Form.Group>
                     <hr></hr>
                     
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Cari
                        </Button>
                      </div>
                    </Form>
            <hr></hr>      
            <br></br>
            <div className="container">
      <div className="row">
          
          {getOnePostItemResult ? getOnePostItemResult.data.length > 0 ? getOnePostItemResult.data.map((item) => (
        <div  className="col-md-4 mb-4">
        <div className="card border-primary" style={{ width: '18rem', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}>
          <img
            src={item.path}
            className="card-img-top"
            alt={`Post Image `}
          />
          <div className="card-body">
            <Link to={`detail/${item.id}`}><h5 className="card-title">{item.title}</h5></Link>
            <hr></hr>
            <p className="card-text">{item.caption}</p>
            <hr></hr>
          </div>
        </div>
      </div>
      )) : <p>data tidak ditemukan</p> : <p></p>}    
      </div>
      
     
    </div>  
        </div>
    );
}

export default Search;
