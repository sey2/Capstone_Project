import React, { useState } from 'react';
import { Figure, ProgressBar } from 'react-bootstrap';
import LikeInfo from './LikeInfo';
import CommentedInfo from './CommentedInfo';
import MyReviews from './MyReviews';
// import firebase from "firebase/app";
// import "firebase/storage";
// import "firebase/firestore";
import { useParams } from 'react-router-dom'

const defaultProfileImage = 'https://blog.kakaocdn.net/dn/c3vWTf/btqUuNfnDsf/VQMbJlQW4ywjeI8cUE91OK/img.jpg';

function MyPage() {
    const [select, setSelect] = useState('btn1');
    const [intro, setIntro] = useState('');
    const [editing, setEditing] = useState(true);
    const [profileImage, setProfileImage] = useState(defaultProfileImage);
    const [originalIntro, setOriginalIntro] = useState('');

    // let {id} = useParams()

    // const getUserID = async() => {
    //     let url = `http://localhost:8081/MyPage/${id}`
    //     let response = await fetch(url)
    //     let data = await response.json()
    // }

    const handleButtonClick = (value) => {
        setSelect(value);
    };

    const handleIntroSubmit = () => {
        setEditing(false);
    };

    const handleIntroEdit = () => {
        setEditing(true);
    };

    const handleIntroClick = () => {
        if (!editing) {
        setEditing(true);
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
        setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

//     const storage = firebase.storage();
    
//     const handleCheckProfile = (file) => {
//     // 클라우드에서 프로필 사진을 불러오는 로직
//     const storageRef = storage.ref();
//     const imageRef = storageRef.child(`profile_images/${file.name}.jpg`); // 프로필 이미지 경로

//     imageRef
//     .getDownloadURL()
//     .then((url) => {
//     setProfileImage(url);
//     })
//     .catch((error) => {
//     console.error('프로필 이미지 다운로드 실패:', error);
//     });
// };


    const handleResetProfile = () => {
        setProfileImage(defaultProfileImage);
        if (!editing) {
        setIntro(originalIntro);
        }
        setEditing(true);
        document.getElementById('imageUpload').value = ''; // 파일 업로드 필드 초기화
    };

    const handleIntroChange = (event) => {
        setIntro(event.target.value);
        if (editing) {
        setOriginalIntro(event.target.value);
        }
    };

    return (
        <>
        <div className="nav-solid-two"></div>
        <div className="profile">
            <Figure className='real-profile'>
            <h6>프로필</h6>
            <Figure.Image
                className="rounded-circle"
                width={100}
                height={100}
                alt="Profile Image"
                src={profileImage}
                onClick={() => document.getElementById('imageUpload').click()}
            />
            <input
                type="file"
                id="imageUpload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
            />
            <button className="mypage-btn-img" onClick={handleResetProfile}>
                reset
            </button>
            {/* <button className="mypage-btn-img" onClick={handleCheckProfile}>
                체크
            </button> */}
            <Figure.Caption >
                <div className="black-text">홍길동</div>
                <br />
                {editing ? (
                <>
                    {/* <textarea 
                    className='text-area'
                    value={intro}
                    onChange={handleIntroChange}
                    placeholder="인삿말을 등록하세요."
                    /> */}
                    <div className="black-text">mbti</div>
                    {/* <button className="mypage-btn" onClick={handleIntroSubmit}>
                    upload
                    </button> */}
                </>
                ) : (
                <>
                    <span onClick={handleIntroClick}>{intro}</span>
                </>
                )}
                <br />
                <div className="black-text">e-mail</div>
                <br />
                <div className='black-text'>location</div>
            </Figure.Caption>
            <br />
            {/* <ProgressBar variant="primary" animated now={45} style={{ width: '300px', height: '30px'}} /> */}
            </Figure>
            <br />
        
        {/* 메뉴 */}
        <div className="user-menu-big">
            <div className="menuBar">
                <div className='menu-bar-btn'>
                    <button
                        value="btn1"
                        className={`new-btn ${select === 'btn1' ? 'active' : ''}` }
                        onClick={() => handleButtonClick('btn1')}
                    >
                        내가 좋아요한 <br/>여행 후기
                    </button>
                </div>
                <div className='menu-bar-btn'>
                    <button
                        value="btn2"
                        className={`new-btn ${select === 'btn2' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('btn2')}
                    >
                        내가 댓글 단 <br/>여행 후기
                    </button>
                </div>
                <div className='menu-bar-btn'>
                    <button
                        value="btn3"
                        className={`new-btn ${select === 'btn3' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('btn3')}
                    >
                        내가 작성한 <br/>여행 후기
                    </button>
                </div>
            </div>
        </div>
            <div>
            {/* 메뉴 끝 */}
            {/* 선택한 버튼에 따른 컴포넌트 렌더링 */}
            {select === 'btn1' && <LikeInfo />}
            {/* btn1을 눌렀을 때 보여줄 컴포넌트 */}
            {select === 'btn2' && <CommentedInfo />}
            {/* btn2를 눌렀을 때 보여줄 컴포넌트 */}
            {select === 'btn3' && <MyReviews />}
            {/* btn3을 눌렀을 때 보여줄 컴포넌트 */}
            </div>
        </div>
        </>
    );
}

export default MyPage;
 