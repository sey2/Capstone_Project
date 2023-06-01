//App.js
import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import { data } from './data.js';
import { Routes, Route, Link } from 'react-router-dom'
import Detail from './Detail.js';
import MainCarousel from './MainCarousel';
import { NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import CardList from './CardList';
import { useNavigate } from 'react-router-dom'
import More from './page/More';
import NavSearch from './NavSearch';
import ImageCard from './ImageCard';
import MyPage from './page/MyPage';
import axios from 'axios';
import MapTest from './components/map/MapTest'
import { useEffect } from 'react';
import Login from './page/Login';


function App() {
  // let [shoes] = useState(data);
  // console.log(shoes);
  // let [shoes] = useState(data);

  
  const navigate = useNavigate()

  const goToMyPage = ()=> {
      navigate("/MyPage")
  }
  const goToMore = ()=> {
    navigate("/more")
  }

  const goToMapTest =()=>{
    navigate("/MapTest")
  }

  const goToLogin =()=>{
    navigate("/Login")
  }

  return (
    <div className="App">

{/* <div className='navbar-color'>
        <Navbar variant="white">
          <Container>
            <Navbar.Brand href="#home">Shop</Navbar.Brand>
            <Nav className="me-auto">
            <Link to='/' className='link-home'>홈</Link>
            <Link to='/detail' className='link-detail'>상세 페이지</Link>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link> 
            </Nav>
          </Container>
        </Navbar>
      </div> */}

      {/* ------------Navbar------------- */}
      <Navbar variant="white" expand="lg" bg="white" className='navbar-color'>
      <Container fluid className='navbar-color'>
        <div className='navbar-color'><Navbar.Brand className='match-margin navbar-color'><Link to='/' className='link-home'>떠나 Match</Link></Navbar.Brand></div>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">

          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title=""
              menuVariant="dark"
            >
              <NavDropdown.Item href="" onClick={goToMore}>여행지 보기</NavDropdown.Item>
              <NavDropdown.Item href="">
                여행 후기
              </NavDropdown.Item>
              <NavDropdown.Item href="">실시간 채팅</NavDropdown.Item>
              <NavDropdown.Item  onClick={goToMapTest}>주변 여행지 추천</NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item href="" onClick={goToMyPage}>
                마이페이지
              </NavDropdown.Item>
              <NavDropdown.Divider />
                <NavDropdown.Item onClick={goToLogin}>로그인</NavDropdown.Item>
                <NavDropdown.Item href="">로그아웃</NavDropdown.Item>
            </NavDropdown>

            {/* -------검색창------ */}
            <Routes>
            <Route path='/' element={<NavSearch/>} />
            </Routes>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      {/* ------------------------------------------ */}

      <Routes>
        <Route 
        path='/' element={<div>
            <>
              <div className='main-bg'><MainCarousel/></div>
            </>  
          {/* ------------------------------------------ */}

        {/* -------카드리스트 세개와 더보기 -------------- */}
          <CardList/>

          <>
                <div className='container'>
                  <div className='row'>
                    {
                      
                    }
                  </div>
                </div>
          </>


        </div>}/>
        <Route path="/more" element={<More/>}/>
        <Route path='/MyPage' element={<MyPage/>}/>
        <Route path='/MapTest' element={<MapTest/>}/>
        <Route path='/Login' element={<Login/>}/>
      </Routes>




    </div>
  );
}

// function Menu(props) {
//   return (
//     <div className="col-md-4">
//       <img src={"" + props.im + ".jpg"} width="80%" />
//       <h4>{props.shoes.title}</h4>
//       <p>{props.shoes.content}</p>
//       <p>{props.shoes.price}</p>
//     </div>
//   )
// }

export default App;

