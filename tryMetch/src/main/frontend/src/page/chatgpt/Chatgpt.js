import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Divider from "../../components/Divider/Divider";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Messages from "../../components/Messages/Messages";


import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav} from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import './Chatgpt.css';

const Chatgpt = () => {
    const [messages, setMessages] = useState([
        {
            from: "computer",
            text: "안녕하세요!" + "\n" + "여행 챗봇 도우미입니다." + "\n" + "무엇이든 물어봐주세요"
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


    const handleSendMessage = async() => {
        if (!inputMessage.trim().length) {
            return;
        }

        const data = inputMessage;


        try{
            const requestBody = {
                question: data,
            };

            const response = await axios.post(
                'http://localhost:8081/chat-gpt/question',
                requestBody
            );

            // 응답 데이터를 처리하는 로직을 작성합니다.
            const responseData = response.data;
            const text = responseData.choices[0].text;

            setMessages((old) => [...old, { from: "me", text: data }]);
            setInputMessage("");

            setTimeout(() => {
                setMessages((old) => [...old, { from: "computer", text: text }]);
            }, 1000);
        } catch (error) {
            // 오류 처리 로직을 작성합니다.
            console.error(error);
        }
    };


    //     // axios
    //
    //     setMessages((old) => [...old, { from: "me", text: data }]);
    //     setInputMessage("");
    //
    //     setTimeout(() => {
    //         setMessages((old) => [...old, { from: "computer", text: data }]);
    //     }, 1000);
    // };



    return (

        <div>
            <Navbar variant="white" expand="lg" bg="white" className='navbar-color'>
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

                </Flex>
            </Flex>
        </div>
    );
};

export default Chatgpt;