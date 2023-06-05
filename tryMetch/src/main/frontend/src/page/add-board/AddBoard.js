import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useCallback, useState} from "react";
import ImageUploader from "../../components/ImageUploader";
import api from "../../utils/api";
//import posts from "../../utils/posts";
import {jwtUtils} from "../../utils/jwtUtils";
import TextArea from "../../components/TextArea";
import {Button} from "@mui/material";
import "./addBoard.scss";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddBoard= () => {
    // 먼저 사용자 로그인 토큰을 확인 state.Auth.token
    const token = useSelector(state => state.Auth.token);
    //const token = 1;
    //const token = useSelector(state => 1 );
    const navigate= useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

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

            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            // formData.append("file", image.image_file);
            formData.append("member_id", jwtUtils.getId(token));

            // await api.post("/api/board", formData);

            await api.post("/posts", formData);
            window.alert("등록이 완료되었습니다!");
            navigate("/board-list");
        }catch (e) {
            toast.error("이모지 사용시 오류가 발생합니다!", {
                position: "top-center",
            });
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