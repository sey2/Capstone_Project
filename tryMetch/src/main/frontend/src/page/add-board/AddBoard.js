import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useCallback, useState} from "react";
import React, { useEffect } from 'react';
import ImageUploader from "../../components/ImageUploader";
import api from "../../utils/api";
//import posts from "../../utils/posts";
import {jwtUtils} from "../../utils/jwtUtils";
import TextArea from "../../components/TextArea";
import {Button} from "@mui/material";
import "./addBoard.scss";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const AddBoard= () => {
    // 먼저 사용자 로그인 토큰을 확인 state.Auth.token
    const token = useSelector(state => state.Auth.token);
    //const token = 1;
    //const token = useSelector(state => 1 );
    const navigate= useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userid, setUserid] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8081/sample/member')
            .then(response => {
                console.log(response.data);
                setUserid(response.data.email)
            })
            .catch(error => {
                // 에러 처리
                console.error(error);
            });

    }, []);


    // const [image, setImage] = useState({
    //     image_file: "",
    //     preview_URL: "image/default_image.jpg",
    // });

    // 이미지 파일 포함했을 때
    // const canSubmit = useCallback(() => {
    //      return image.image_file !== "" && content !== "" && title !== "";
    // }, [image, title, content]);

    const canSubmit = useCallback(() => {
        return content !== "" && title !== "";
    }, [title, content]);


    const handleSubmit = useCallback(async () => {
        try {
            console.log(title)
            console.log(content)
            console.log(userid)
            const url = 'http://localhost:8081/posts';
            const email = userid
            const data = {
                title: title,
                content: content
            };

            const response = await axios.post(url, data, {
                params: {
                    email: email
                }
            });

            console.log(response.data); // 서버로부터의 응답 데이터

        } catch (error) {
            console.error(error);
        }

    }, [canSubmit]);

    return (
        <div className="addBoard-wrapper">
            <div className="addBoard-header">
                여행 후기 작성하기 🖊️
            </div>
            <div className="submitButton">
                {canSubmit() ? (
                    <Button
                        onClick={handleSubmit}
                        className="success-button"
                        variant="outlined"
                    >
                        게시물 등록하기

                    </Button>
                ) : (
                    <Button
                        className="disable-button"
                        variant="outlined"
                        size="large"
                    >
                        사진과 내용을 모두 입력하세요!
                    </Button>
                )}
            </div>
            <div className="addBoard-body">
                {/* <ImageUploader setImage={setImage} preview_URL={image.preview_URL}/> */}
                <TextArea setTitle={setTitle} setContent={setContent} title={title} content={content}/>
            </div>
        </div>

    );

}

export default AddBoard; 