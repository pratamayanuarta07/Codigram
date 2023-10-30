import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Image } from 'react-bootstrap';
import axios from 'axios';
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from '../action/user';
const Post = (props) => {
    
    return (
      <Card className="my-4">
        <Card.Header>
          <Image
            src={props.profilePic}
            alt="Foto Profil"
            roundedCircle
            style={{ width: '40px', height: '40px' }}
          />
          <strong className="ml-2">&nbsp;&nbsp;&nbsp;{props.username}</strong>
        </Card.Header>
        <br></br>
        <h4>&nbsp;&nbsp;{props.title}</h4>
        <center>
        <br></br>
        <Card.Img variant="top" src={props.image} style={{ width: '400px' }} />
        </center>
        <Card.Body>
          <Card.Text>{props.caption}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Tanggal Postingan: {props.date.substr(0,10)}&nbsp;{props.date.substr(11, 13)}</small>
        </Card.Footer>
      </Card>
    );
  };

const Home = () => {
    const [imageSource, setImageSource] = useState('');
    const dispatch = useDispatch();
    const {getListItemResult} = useSelector((state) => state.list);
    useEffect(() => {
        dispatch(getItem());
        if (getListItemResult) {
          console.log(getListItemResult);
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

    //console.log(getListItemResult.data);
    
    return (
      
      
        <Container>
          {getListItemResult && getListItemResult.data.map((item) => (
              <Post
              profilePic={item.path_prof}
              username={item.username}
              image={item.path_post}
              caption={item.caption}
              date={item.createdat}
              title={item.title}
            />
          ))}
      
      {/* <Post
        profilePic="https://testmiles.com/wp-content/uploads/2020/11/Lamborghini-Huracan-STO5.jpg"
        username="Si_Pemosting"
        image="http://localhost:3400/profile/331611171.png"
        caption="Ini adalah caption dari postingan ini."
        date="27 Oktober 2023"
      />
      <Post
        profilePic="https://testmiles.com/wp-content/uploads/2020/11/Lamborghini-Huracan-STO5.jpg"
        username="Si_Pemosting"
        image="http://localhost:3400/profile/483678616.png"
        caption="Ini adalah caption dari postingan ini."
        date="27 Oktober 2023"
      /> */}
      <br></br>
      {/* Tambahkan postingan lainnya dengan menggunakan komponen Post */}
    </Container>
    
    );
    
}

export default Home;
