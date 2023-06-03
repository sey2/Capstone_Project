import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import NavSearch from './NavSearch';

import Header from './components/Header';
import SignUp from "./page/sign-up/SignUp";

function NavDrop() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const goToMyPage = () => {
        navigate('/MyPage');
    };

    const goToMore = () => {
        navigate('/more');
    };

    const goToMapTest = () => {
        navigate('/MapTest');
    };

    const goToLogin = () => {
        navigate('/Login');
    };

    const goToBoard =()=> {
        navigate("/board-list") 
      }

      const goToChat =()=>{
        navigate("/chatgpt")
      }






    const showDropdown = () => {
        setDropdownVisible(true);
    };

    const hideDropdown = () => {
        setDropdownVisible(false);
    };

    return (
    <>
        <Navbar variant="white" expand="lg" bg="white" className="navbar-color">
        <Container fluid className="navbar-color">
            <div className="navbar-color">
            <Navbar.Brand className="match-margin navbar-color">
                <Link to="/" className="link-home">
                떠나 Match
                </Link>
            </Navbar.Brand>

            <Header/>

            </div>
            <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="navbar-dark-example">
            <Nav>
                <NavDropdown
                id="nav-dropdown-dark-example"
                title=""
                menuVariant="dark"
                // show={dropdownVisible}
                // onMouseEnter={showDropdown}
                // onMouseLeave={hideDropdown}
                >
                <NavDropdown.Item onClick={() => window.location.href = '/more'}>
                    여행지 보기
                </NavDropdown.Item>
                
                <NavDropdown.Item onClick={() => window.location.href = '/board-list'}>
                여행 후기 게시판
              </NavDropdown.Item>

                <NavDropdown.Item>여행 후기</NavDropdown.Item>
                <NavDropdown.Item onClick={() => window.location.href = '/chatgpt'}>
                챗봇 여행지 추천</NavDropdown.Item>
               
                <NavDropdown.Item onClick={() => window.location.href = '/MapTest'}>
                    주변 여행지 추천
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown onClick={goToMyPage}
                    id="nav-dropdown-white-example"
                    title={<span className="dropdown-text">마이페이지</span>}
                    menuVariant="dark"
                    show={dropdownVisible}
                    onMouseEnter={showDropdown}
                    onMouseLeave={hideDropdown}
                >
                    <NavDropdown.Item onClick={() => window.location.href = '/Login'}>
                    로그인
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => window.location.href = '/Login'}>
                    로그아웃
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => window.location.href = '/sign-up'}>
                    회원가입
                    </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown.Divider />
                </NavDropdown>
                <Routes>
                <Route path="/" element={<NavSearch />} />
                </Routes>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </>
    )
}

export default NavDrop;