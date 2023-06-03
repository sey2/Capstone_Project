import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import MainCarousel from './MainCarousel';
import CardList from './CardList';
import More from './page/More';
import MyPage from './page/MyPage';
import MapTest from './components/map/MapTest';
import Login from './page/Login';
import NavDrop from './NavDrop';

function App() {
  // const isNavVisible = window.location.pathname !== '/index';

  return (
    <div className="App">
      {/* {isNavVisible && <NavDrop />} */}
      <NavDrop/>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="main-bg">
                <MainCarousel />
              </div>
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
