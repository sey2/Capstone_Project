import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import NavSearch from './NavSearch';

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
                                <NavDropdown.Item onClick={() => navigate("/more")}>
                                    여행지 보기
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/board-list')}>
                                    여행 후기
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={()=> navigate("/Chatgpt")}>
                                    챗봇 여행지 추천
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate("/MapTest")}>
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
                                    <NavDropdown.Item onClick={() => navigate('/Login')}>
                                        로그인
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => navigate('/Login')}>
                                        로그아웃
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => navigate('/Login')}>
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