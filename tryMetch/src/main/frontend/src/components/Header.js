import "./header.scss";
import { Link, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {jwtUtils} from "../utils/jwtUtils";
import {setToken} from "../redux/reducers/AuthReducer";

const Header= ()=>{
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    
    const token = useSelector(state=> state.Auth.token); 
    //const token = 1; 
    const [isAuth, setIsAuth] = useState(false); // 로그인 토큰 인증하는 부분
    useEffect(() => {
        if (jwtUtils.isAuth(token)) {
            setIsAuth(true); 
        }else {
            setIsAuth(false); 
        }
    }, [token]); 

    const logout = async ()=> {
        await dispatch(setToken("")); 
        alert("로그아웃 되었습니다!"); 
        navigate("/"); 
    }


    return(
        <div className="header-wrapper">

            <div className="header-menu">
                <Link to="/board-list?page=1">여행 후기 게시판</Link>
                <Link to="/add-board">글쓰기</Link>
                {isAuth ? (
                    <>
                    {/* <Link to="/myboard-list?page=1">내 게시물</Link>
                    <Link to="#" onClick={logout}>로그아웃</Link> */}
                    
                    </>
                ) : (
                    <>
                    <Link to="/myboard-list?page=1">내 게시물</Link>
                    <Link to="#" onClick={logout}>로그아웃</Link>
                    <Link to="/login?#action/3.3">로그인</Link>
                    <Link to="/sign-up">회원가입</Link>
                </>
            )}
            </div>
        
        </div>


    );
}; 

export default Header; 
