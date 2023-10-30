import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Image } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getItem, pickOne } from '../action/user';
import { useParams } from 'react-router-dom';

const Detail = () => {
    const {id} = useParams();
    console.log(id);
    const dispatch = useDispatch();
    const {PickOnePostItemResult} = useSelector((state) => state.list);
    useEffect(() => {
        dispatch(pickOne(id));
        if (PickOnePostItemResult) {
          console.log(PickOnePostItemResult);
        }
        // Ganti 'http://localhost:3001' dengan URL server Express Anda
        // const imageUrl = 'http://localhost:3400/pic'; // Sesuaikan dengan nama gambar yang sebenarnya
    
        // axios.get(imageUrl, { responseType: 'blob' })
        //   .then(response => {
        //     const blob = new Blob([response.data], { type: response.headers['content-type'] });
        //     const imageUrl = URL.createObjectURL(blob);
        //     setImageSource(imageUrl);
        //   })
        //   .catch(error => {
        //     console.error('Error:', error);
        //   });
        
      }, []);
      console.log(typeof(PickOnePostItemResult.createdat));
    return (
        <Container>
          <Card className="my-4">
        <Card.Header>
          <Image
            src={PickOnePostItemResult.path_prof}
            alt="Foto Profil"
            roundedCircle
            style={{ width: '40px', height: '40px' }}
          />
          <strong className="ml-2">&nbsp;&nbsp;&nbsp;{PickOnePostItemResult.username}</strong>
        </Card.Header>
        <br></br>
        <center>
        <Card.Img variant="top" src={PickOnePostItemResult.path_post} style={{ width: '400px' }} />
        </center>
        <Card.Body>
          <Card.Text>{PickOnePostItemResult.caption}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Tanggal Postingan: {
          PickOnePostItemResult.createdat}</small>
        </Card.Footer>
      </Card>  
        </Container>
    );
}

export default Detail;
