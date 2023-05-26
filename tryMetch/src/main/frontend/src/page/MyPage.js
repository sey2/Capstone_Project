import React from 'react'
import { Figure } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';

function MyPage() {
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


            {/* 메뉴 */}
            <div>
                <div className='menuBar'>
                    <button className='userLike1'>내가 좋아요한 1</button>
                    <button className='userLike1'>내가 좋아요한 1</button>
                    <button className='userLike1'>내가 좋아요한 1</button>
                </div>
            </div>
            {/* 메뉴 끝 */}
        </div> 
        </>
    )
}

export default MyPage;