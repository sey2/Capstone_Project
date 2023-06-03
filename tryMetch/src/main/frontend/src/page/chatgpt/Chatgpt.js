import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios"; 
// import Divider from "../components/Divider";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import Messages from "../components/Messages";

import Divider from "../../components/Divider/Divider";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Messages from "../../components/Messages/Messages";
import { useNavigate } from 'react-router-dom'
//import { Routes, Route } from 'react-router-dom'
//import NavSearch from './NavSearch';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav} from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import './Chatgpt.css';

const Chatgpt = () => {
  const [messages, setMessages] = useState([
	{ from: "me", text: "광주에 놀러 갈 만한 장소가 있을까?" },
	{
  	from: "computer",
  	text: 
        " 광주는 대한민국의 대도시로서 역사와 문화적인 유산, 자연 경관 등 다양한 매력을 가지고 있습니다. 광주를 방문하고자 하는 여행객들에게는 다음과 같은 장소들이 추천됩니다. " + 
         "광주 호남문화예술마을 : 예술적인 분위기를 느낄 수 있는 예술마을로, 예술 작품 전시, 공연, 체험 프로그램 등을 즐길 수 있습니다. " + 
        "광주 양림동 공원 : 아름다운 자연 환경과 푸르른 숲으로 둘러싸인 공원으로, 산책, 피크닉, 자전거 타기 등 액티비티를 즐길 수 있습니다. " +
        "5.18 민주광장 : 광주의 역사적인 장소로, 1980년 민주화 운동이 일어났던 곳으로 유명합니다. 역사적인 의미와 함께 평화로운 분위기를 느낄 수 있습니다. " +
        "  광주 동명동 벽화마을 : 동네 전체를 아름다운 벽화로 장식한 마을로, 벽화 투어를 즐기며 독특한 예술과 아름다움을 만끽할 수 있습니다. " +
        "  광주 국립아시아문화전당 : 아시아 문화와 예술을 전시하는 전문 문화예술기관으로, 다양한 전시, 공연, 이벤트 등을 즐길 수 있습니다. " +
        "  광주 무등산 : 광주의 상징적인 산으로, 하이킹이나 등산을 통해 아름다운 자연 경관과 신선한 공기를 즐길 수 있습니다. " +
        " 이 외에도 광주에는 많은 관광명소와 문화시설이 있으며, 음식, 전통시장, 박물관 등 다양한 경험을 즐길 수 있습니다. 방문하시기 전에 자신의 관심사와 일정에 맞는 장소를 선택해 보시는 것이 좋습니다. ",
	},
  ]);
  const [inputMessage, setInputMessage] = useState("");


  useEffect(() => {
    axios.post("http://localhost:8081/chat-gpt/question",)
    .then(response => console.log(response.data))
    .catch(function (error) {
      console.log(error); 
    })
  }, []);


  const handleSendMessage = () => {
	if (!inputMessage.trim().length) {
  	return;
	}

	const data = inputMessage;

    

    
    // axios 

	setMessages((old) => [...old, { from: "me", text: data }]);
	setInputMessage("");

	setTimeout(() => {
  	setMessages((old) => [...old, { from: "computer", text: data }]);
	}, 1000);
  };

  // const navigate = useNavigate()

  //   const goToMyPage = ()=> {
  //       navigate("/MyPage")
  //   }
  //   const goToMore = ()=> {
  //     navigate("/more")
  //   }
  
  //   const goToMapTest =()=>{
  //     navigate("/MapTest")
  //   }
  
  //   const goToBoard =()=> {
  //     navigate("/board-list") 
  //   }
  
  //   const goToChat =()=>{
  //     navigate("/chatgpt")
  //   }
  
  //   const goToLogin =()=> {
  //     navigate("/login")
  //   }
  
    
  //   const goToLogout =()=> {
    
  //     alert("로그아웃 되었습니다!"); 
  //      navigate("/")
  //   }

    // Chatgpt Open API  
  // const[message, setMessage] = useState('');
  // const [response, setResponse] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   fetch("http://localhost:3001/", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type' : 'application/json',
  //     }, 
  //     body: JSON.stringify({message})
  //   })
  //   .then((res) => res.json())
  //   .then((data) => setResponse(data.message))

  // }
  

  return (

<div>
<Navbar variant="white" expand="lg" bg="white" className='navbar-color'>
      {/* <Container fluid className='navbar-color'>
        <div className='navbar-color'><Navbar.Brand className='match-margin navbar-color link-home' >떠나 Match</Navbar.Brand></div>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">

        <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title=""
              menuVariant="dark"
            > 
              <NavDropdown.Item href="#action/3.1" onClick={goToMore}>여행지 보기</NavDropdown.Item>
            <NavDropdown.Item href="/board-list" onClick={goToBoard}>
                여행 후기 게시판
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" onClick={goToChat}>챗봇 여행지 추천</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" onClick={goToMapTest}>주변 여행지 추천</NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" onClick={goToMyPage}>
                마이페이지
              </NavDropdown.Item>
              <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.5" onClick={goToLogin}>로그인</NavDropdown.Item>
                <NavDropdown.Item href="/" onClick={goToLogout}>로그아웃</NavDropdown.Item>
            </NavDropdown>

          
            <Routes>
            <Route path='/' element={<NavSearch/>} />
            </Routes>

          </Nav>
        </Navbar.Collapse>
      </Container> */}
    </Navbar>

  <Flex w="100%" h="100vh" justify="center" align="center">
    <Flex w="40%" h="90%" flexDir="column">
      <Header />
      <Divider />
      <Messages messages={messages} />
      <Divider />
      <Footer
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}

        
      />

{/* <form onSubmit={handleSubmit}>
    <textarea 
      value={message}
      onChange={(e) => setMessage(e.target.value)}>
      </textarea>
      <button type="submit">전송</button>
  </form>
  <div>{response}</div> */}

      
    </Flex>
  </Flex>
</div>
  );
};

export default Chatgpt;