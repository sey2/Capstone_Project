import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import MainCarousel from './MainCarousel';
import CardList from './CardList';
import More from './page/More';
import MyPage from './page/MyPage';
import MapTest from './components/map/MapTest';
//import Login from './page/Login';
import NavDrop from './NavDrop';

// 채팅 관련 import
import { ChakraProvider, theme } from "@chakra-ui/react";
import Chatgpt from "./page/chatgpt/Chatgpt";

// 게시판 관련 import 
//import Header from './components/Header';
//import SignUp from "./page/sign-up/SignUp";
import Login from "./page/login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import BoardList from './page/board-list/BoardList';
import Board from './page/board/Board';
import MyBoardList from "./page/myboard-list/MyBoardList";
import AddBoard from "./page/add-board/AddBoard";
import EditBoard from "./page/edit-board/EditBoard";


function App() {
  // const isNavVisible = window.location.pathname !== '/index';

  const location = useLocation();


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
        <Route path="/board-list" element={<BoardList/>}/>
        <Route
          path="/add-board"
          element={
            <PrivateRoute path="/add-board" component={AddBoard}/>
          }
          />

          <Route
          path="/myboard-list"
          element={
            // 쿼리 파라미터가 존재하므로 전체 url을 PrivateRoute에 넘겨준다 `${location.pathname}`
            <PrivateRoute path={`${location.pathname}`} component={MyBoardList}/>
          }
        />
        <Route path="/board/:board_id" element={<Board/>}/>
        <Route
          path="/edit-board/:board_id"
          element={
            // URI 파라미터가 존재하므로 전체 url을 PrivateRoute에 넘겨준다
            <PrivateRoute path={`${location.pathname}`} component={EditBoard}/>
          }
        />

        <Route path="/chatgpt" element={<ChakraProvider theme={theme}>
        <Chatgpt />

       
         </ChakraProvider> }/>

      </Routes>
    </div>
  );
}

export default App;
