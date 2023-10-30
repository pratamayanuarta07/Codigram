//import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.js";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import {
//   MDBContainer,
//   MDBCol,
//   MDBRow,
//   MDBBtn,
//   MDBIcon,
//   MDBInput,
//   MDBCheckbox
// }
// from 'mdb-react-ui-kit';
import Login from './component/login';
import Register from './component/register';
import Layout from './component/layout';
import Home from './component/home';
import Post from './component/post';
import Logout from './component/logout';
import Profile from './component/profile';
import Update from './component/update';
import Search from './component/search';
import Detail from './component/detail';
import Updateuser from './component/updateuser';

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='dashboard' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='home' element={<Home/>}/>
            <Route path='posting' element={<Post/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='profile/update/:id/:image' element={<Update/>}/>
            <Route path='profile/updateusr/:id/:image' element={<Updateuser/>}/>
            <Route path='search' element={<Search/>}/>
            <Route path='search/detail/:id' element={<Detail/>}/>
            <Route path='logout' element={<Logout/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
