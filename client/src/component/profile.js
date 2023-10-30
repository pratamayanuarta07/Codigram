import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faMapMarker, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, getPosting, getSelf } from '../action/user';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
const Profile = () => {
    
    const {getPostItemResult} = useSelector((state) => state.list);
    const {getSelfItemResult} = useSelector((state) => state.list);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deletedt, setudelete] = useState(false);
    const redirect = async (id, image) => {
        navigate(`update/${id}/${image}`);
    }
    const redirect2 = async (id, image) => {
      navigate(`updateusr/${id}/${image}`);
  }
    const deletee = async (id, image) => {
        Swal.fire({
            title: "Input Data Berhasil",
            text: "Apakah Anda Ingin Kembali Ke Halaman Login",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Kembali Ke Halaman Login",
          }).then( (result) => {
            if (result.isConfirmed) {
                setudelete(!deletedt);
                dispatch(deleteItem(id, image));
                //setupdate(!updatedt);
                Swal.fire(
                    "Good Job!",
                    "This is button handler",
                    "success"
                    )    
              }
            
          });
    }
    useEffect(() => {
        const a = jwtDecode(localStorage.getItem('token'));
        dispatch(getPosting(a.id, localStorage.getItem('token')));
        dispatch(getSelf(a.id));
        //console.log(a);
    }, [deletedt]);
    console.log(getPostItemResult);
    return (
        
        <div className="container mt-4">
        <div className="card">
          <div className="card-header bg-primary text-white text-center">
            <h2>Profile Page</h2>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 text-center">
                <img
                  src={getPostItemResult.path} // Ganti dengan URL foto profil Anda
                  alt="Profile"
                  className="img-fluid rounded-circle shadow-lg mb-3"
                  style={{ maxWidth: "200px" }}
                />
                <h2>{getPostItemResult.username}</h2>
                
              </div>
              <div className="col-md-8">
                <h4>Bio</h4>
                <p>
                  {getPostItemResult.bio}
                </p>
  
                <h4>Details</h4>
                <ul className="list-unstyled">
                  <li>
                    <FontAwesomeIcon icon={faUser} /> {getPostItemResult.gender}
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faMapMarker} /> {getPostItemResult.tempat}
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faEnvelope} /> {getPostItemResult.email}
                  </li>
                  <li>
                    <br></br>
                  <button className="btn btn-success btn-sm" onClick={()=>redirect2(getPostItemResult.id, getPostItemResult.picture)}>Update Profil</button>
                  </li>
                </ul>
              </div>
            </div>
            <hr></hr>
            <div className="container">
      <div className="row">
          {getSelfItemResult ? getSelfItemResult.length > 0 ? getSelfItemResult.map((item) => (
            <div  className="col-md-4 mb-4">
            <div className="card border-primary" style={{ width: '18rem', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}>
              <img
                src={item.path}
                className="card-img-top"
                alt={`Post Image `}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <hr></hr>
                <p className="card-text">{item.caption}</p>
                <hr></hr>
                <div className="d-flex justify-content-between align-items-center">
                  <button className="btn btn-primary btn-sm" onClick={()=>deletee(item.id, item.image)}>Delete</button>
                  <button className="btn btn-success btn-sm" onClick={()=>redirect(item.id, item.image)}>Update</button>
                </div>
              </div>
            </div>
          </div>
          )) : <p>Data Kosong</p> : <p>Belum Ada Data</p>}
    
      </div>
     
    </div>
          </div>
          
        </div>
        
      </div>
    );
}

export default Profile;
