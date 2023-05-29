import React, { useState } from 'react';
import { Figure, ProgressBar } from 'react-bootstrap';
import LikeInfo from './LikeInfo';
import CommentedInfo from './CommentedInfo';
import MyReviews from './MyReviews';

const defaultProfileImage = 'https://blog.kakaocdn.net/dn/c3vWTf/btqUuNfnDsf/VQMbJlQW4ywjeI8cUE91OK/img.jpg';

function MyPage() {
  const [select, setSelect] = useState('btn1');
  const [intro, setIntro] = useState('');
  const [editing, setEditing] = useState(true);
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [originalIntro, setOriginalIntro] = useState('');

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
        <Figure>
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
            기본 프로필
          </button>
          <Figure.Caption>
            홍길동
            <br />
            {editing ? (
              <>
                <textarea
                  value={intro}
                  onChange={handleIntroChange}
                  placeholder="인삿말을 등록하세요."
                />
                <button className="mypage-btn" onClick={handleIntroSubmit}>
                  등록
                </button>
              </>
            ) : (
              <>
                <span onClick={handleIntroClick}>{intro}</span>
              </>
            )}
            <br />
            이메일
            <br />
            위치
          </Figure.Caption>
          <br />
          <ProgressBar variant="primary" animated now={45} style={{ width: '300px', height: '30px' }} />
        </Figure>
        <br />
      </div>
      {/* 메뉴 */}
      <div className="user-menu-big">
        <div className="menuBar">
          <button
            value="btn1"
            className={`btn ${select === 'btn1' ? 'active' : ''}`}
            onClick={() => handleButtonClick('btn1')}
          >
            내가 좋아요한 여행 후기
          </button>
          <button
            value="btn2"
            className={`btn ${select === 'btn2' ? 'active' : ''}`}
            onClick={() => handleButtonClick('btn2')}
          >
            내가 댓글 단 여행 후기
          </button>
          <button
            value="btn3"
            className={`btn ${select === 'btn3' ? 'active' : ''}`}
            onClick={() => handleButtonClick('btn3')}
          >
            내가 작성한 여행 후기
          </button>
        </div>
      </div>
      {/* 메뉴 끝 */}
      {/* 선택한 버튼에 따른 컴포넌트 렌더링 */}
      {select === 'btn1' && <LikeInfo />}
      {/* btn1을 눌렀을 때 보여줄 컴포넌트 */}
      {select === 'btn2' && <CommentedInfo />}
      {/* btn2를 눌렀을 때 보여줄 컴포넌트 */}
      {select === 'btn3' && <MyReviews />}
      {/* btn3을 눌렀을 때 보여줄 컴포넌트 */}
    </>
  );
}

export default MyPage;
