import React from 'react'
import { Figure } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';
import { useState } from "react";
import LikeInfo from "./LikeInfo";

function MyPage() {
    let data = ["내가 좋아요한 여행 후기", "내가 댓글 단 여행 후기", "내가 작성한 여행 후기"];

    let [btnActive, setBtnActive] = useState("");
    const [visible, setVisible] = useState(false);

    const toggleActive = (e) => {
        setBtnActive((prev) => {
            return e.target.value;
        });
    };

    return (
        <>
            <div className="nav-solid-two"></div>
            <div className='profile'>
                <Figure>
                    <h6>프로필</h6>
                    <Figure.Image
                        width={100}
                        height={100}
                        alt="171x180"
                        src="https://blog.kakaocdn.net/dn/c3vWTf/btqUuNfnDsf/VQMbJlQW4ywjeI8cUE91OK/img.jpg"
                    />
                    <Figure.Caption>
                        홍길동
                        <br/>
                        인삿말
                        <br/>
                        이메일
                        <br/>
                        위치
                    </Figure.Caption>
                    <br/>
                    <ProgressBar variant="primary" animated now={45} style={{width:'300px', height:'30px'}}/>
                </Figure>


            </div>
            {/* 메뉴 */}
            <div className='user-menu-big'>
                <div className='menuBar'>
                    {data.map((item, idx) => {
                        return (
                            <>
                                <button value={idx}
                                        className={"btn" + (idx == btnActive ? " active" : "")}
                                        // onClick={toggleActive}
                                        onClick={()=>{ toggleActive; data[0] = {toggleActive} ?
                                            setVisible(!visible) : setVisible(visible)
                                        }}
                                >{item}</button>
                                <hr/>
                                {visible && <LikeInfo/>}
                            </>
                        )
                    })}
                </div>
            </div>
            {/* 메뉴 끝 */}
        </>
    )
}

export default MyPage;