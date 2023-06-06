
import {Pagination} from "@mui/material";
import {useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import "./boardList.scss";
import {Card} from "../../components/Card";
import moment from "moment";
import {Link } from 'react-router-dom';
import {Button} from "@mui/material";
//import { CgChevronRight, CgChevronLeft } from "react-icons/cg";
//import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
//import { useRef } from "react";


const BoardList=()=> {
    const [pageCount, setPageCount ] = useState(0);
    const [boardList, setBoardList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();


    // const scrollRef = useRef();

    useEffect(() => {
        // 페이지에 해당되는 게시물 가져오는 부분
        const getBoardList = async () => {
            // const page_number = searchParams.get("page");
            // const {data} = await axios.post(`/api/board/list?page_number=${page_number}&page_size=4`);
            //const {data} = await axios.post(`/posts/getAllPosts`)
            const url = "http://localhost:8081/posts"
            const {data} = await axios.get(url);
            return data;
        }

        getBoardList().then(result => setBoardList(result));
        // 게시물 전체 갯수 구하기
        const getTotalBoard = async () => {
            // const {data} = await axios.post("/api/board/count");
            // const {data} = await axios.post("/posts/getAllPosts");
            const url = "http://localhost:8081/posts/count"
            const {data} = await axios.get(url)
            console.log(data.total)
            return data.total;
        }
        // 페이지 카운트 구하기: (전체 board 갯수) / (한 페이지 갯수) 결과 올림 , 한 페이지에 게시물 4개씩
        getTotalBoard().then(result => setPageCount(Math.ceil(result / 4)));
    }, [])


    return(
        <div className="boardList-wrapper">
            <div className="boardList-header">
                전체 게시물
            </div>

            <div className=" mt-[10%]  w-[85%] md:resp h-auto   ">
                <p className=" ml-1 my-[2%] md:bg-gray-01 w-fit lg:text-[47px] sm:text-[35px] text-2xl font-bold font-eng   ">
                    NOW REVIEWS
                </p>
            </div>
            <p className=" hidden sm:block ml-2 pb-5 w-fit text-xl text-gray-04">
                떠나 Match 유저들의 최신 여행 후기를 함께 해보세요!
            </p>

            <Button
                className="disable-button"
                variant="outlined"
                size="large"
            >
                <Link to="/add-board">작성하기</Link>
            </Button>

            {/* <CommonTable headersName={['글번호', '제목', '등록일']}>
              {

              }
              </CommonTable> */}




            {/* 수정 필요  */}
            <div className="boardList-body">
                {boardList.map((item, index) => (
                    <Card key={item.id} username='1'
                          date={moment(item.created).add(9, "hour").format('YYYY-MM-DD')}
                          title={item.title} content={item.content}
                        // postId={item.id} img_url={`/api/image/view/${item.id}`}
                          post_id={item.id}
                    />
                ))}
            </div>

            <div className="boardList-footer">
                {/*페이지네이션: count에 페이지 카운트, page에 페이지 번호 넣기*/}
                <Pagination
                    variant="outlined" color="primary" page={Number(searchParams.get("page"))}
                    count={pageCount} size="large"
                    onChange={(e, value) => {
                        window.location.href = `/board-list?page=${value}`;
                    }}
                    showFirstButton showLastButton
                />
            </div>
        </div>
    )
}

export default BoardList;
