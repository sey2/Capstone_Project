import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import "./board.scss";
import {Button, Dialog, DialogContent, IconButton} from "@mui/material";
import {useSelector} from "react-redux";
import api from "../../utils/api";
//import posts from "../../utils/posts";
import moment from "moment";
import Comments from "../../components/Comments";
import axios from "axios";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";

const Board =()=> {

    // const {board_id} = useParams();
    // const [board, setBoard] = useState({});

    const {post_id} = useParams();
    const {posts, setBoard} = useParams({});
    const [isLoaded, setIsLoaded] = useState(false);

    // token
    // const token = useSelector(state => state.Auth.token);
    const navigate = useNavigate();

    // Modal show
    const [show, setShow] = useState(false);

    // board 가져오기
    useEffect(()=> {
        const getBoard = async ()=> {
            const {data} = await axios.post(`/posts/${post_id}`);
            return data;
        }
        getBoard().then(result => setBoard(result)).then(() => setIsLoaded(true));
    },[])


    return(
        <React.Fragment>
            {isLoaded && (
                <div className ="board-wrapper">
                    {
                        <div className="edit-delete-button">
                            <Button className="delete-button" onClick={() => {
                                setShow(true)
                            }}
                            >삭제</Button>

                            <Button onClick={()=> {
                                navigate(`/posts/${post_id}`)
                            }}
                            >수정</Button>
                        </div>
                    }

                    {/* board-header,username,data, */}
                    <div className="board-header">
                        {/* <div className="board-header-username">{posts.user.username}</div> */}
                        <div className="board-header-membername">{posts.member.membername}</div>
                        <div className="board-header-date">{moment(posts.created).add(9, "hour").format('YYYY-MM-DD')}</div>
                    </div>
                    <hr/>
                    <div className="board-body">
                        {/* ImageController 없는 상태 */}
                        {/* <div className="board-image"> */}
                        {/* <img src={`/api/image/view/${board_id}`}/> */}
                        {/* </div> */}
                        <div className="board-title-content">
                            <div className="board-title">{posts.title}</div>
                            <div className="board-content">{posts.content}</div>
                        </div>
                    </div>
                    <hr/>
                    <div className="board-footer">
                        {/* <Comments board_id={board_id}/> */}
                        <Comments post_id={post_id}/>
                    </div>
                </div>
            )}
            {/*modal*/}
            <Dialog open={show}>
                <DialogContent style={{position: "relative"}}>
                    <IconButton
                        style={{position: "absolute", top: "0", right: "0"}}
                        onClick={() => setShow(false)}
                    >
                        <DisabledByDefaultOutlinedIcon/>
                    </IconButton>
                    <div className="modal">
                        <div className="modal-title"> 정말 삭제하시겠습니까?</div>
                        <div className="modal-button">
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={async () => {
                                    setShow(false);
                                    // 모달의 예 버튼 클릭시 게시물 삭제
                                    await api.delete(`/posts/${post_id}`);
                                    alert("게시물이 삭제되었습니다!");
                                    window.location.href = "/myboard-list";
                                }}
                            >
                                예
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    setShow(false)
                                }}
                            >
                                아니오
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>




        </React.Fragment>
    );

}

export default Board; 