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


function App() {
  // let [shoes] = useState(data);
  // console.log(shoes);
  // let [shoes] = useState(data);

  const [travelArr, setTravelArr] = useState([])
  
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
                <NavDropdown.Item href="">로그인</NavDropdown.Item>
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
          <div className='container'>
            <div className='row'>
            {/* <Card style={{ width: '23rem' }}>
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Title>
                {
                  <Menu shoes={shoes[0]} im={1}/>
                } </Card.Title>
              <Card.Text>
                num1
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
          </Card> */}
           {/* --------------------------------- */}
          {/* <Card style={{ width: '23rem' }}>
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Title>
                {
                  <Menu shoes={shoes[1]} im={2}/>
                } </Card.Title>
              <Card.Text>
                num2
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
          </Card> */}
             {/* --------------------------------- */}
          {/* <Card style={{ width: '23rem' }}>
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Title>
                {
                  <Menu shoes={shoes[2]} im={3}/>
                } </Card.Title>
              <Card.Text>
                num3
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
          </Card> */}
          </div>
        </div>

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


          {/* <div className="container">
          <div className="row">
            {
              shoes.map(function(data, i){
                return (
                    <Menu shoes={shoes[i]} img={i+1}/>
                )
              })
            }
        </div>
        </div> */}
        </div>}/>
        {/* <Route path="/" element={<ProductAll/>}/> */}
        {/* <Route path='/detail' element={<Detail/>}/> */}
        <Route path="/more" element={<More/>}/>
        <Route path='/MyPage' element={<MyPage/>}/>
        <Route path='/MapTest' element={<MapTest/>}/>
      </Routes>

    {/* <Container>
      <Row>
        <Col sm>상품1</Col>
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="80%"/>
          <h4>상품명</h4>
          <p>상품 설명</p>
        <Col sm>상품2</Col>
          <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="80%"/>
          <h4>상품명</h4>
          <p>상품 설명</p>
        <Col sm>상품3</Col>
          <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="80%"/>
          <h4>상품명</h4>
          <p>상품 설명</p>
      </Row>
    </Container> */}



    </div>
  );
}



function Menu(props) {
  return (
    <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes" + props.im + ".jpg"} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  )
}

export default App;

