import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import MainCarousel from './MainCarousel';
import { NavDropdown } from 'react-bootstrap';
import CardList from './CardList';
import More from './page/More';
import NavSearch from './NavSearch';
import MyPage from './page/MyPage';
import MapTest from './components/map/MapTest';
import Login from './page/Login';

function App() {
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

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const showDropdown = () => {
    setDropdownVisible(true);
  };

  const hideDropdown = () => {
    setDropdownVisible(false);
  };

  return (
      <div className="App">
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
                  <NavDropdown.Item onClick={() => window.location.href = '/more'}>
                    여행지 보기
                  </NavDropdown.Item>
                  <NavDropdown.Item>여행 후기</NavDropdown.Item>
                  <NavDropdown.Item>실시간 채팅</NavDropdown.Item>
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
                    <NavDropdown.Item onClick={() => window.location.href = '/Login'}>
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
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <>
                  <div className="main-bg">
                    <MainCarousel />
                  </div>
                </>
                <CardList />
              </div>
            }
          />
          <Route path="/more" element={<More />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/MapTest" element={<MapTest />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    );
}

export default App;
