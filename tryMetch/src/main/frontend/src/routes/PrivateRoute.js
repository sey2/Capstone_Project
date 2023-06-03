import React from "react";
import {Navigate} from "react-router-dom";
import {jwtUtils} from "../utils/jwtUtils";
import {useSelector} from "react-redux";

const PrivateRoute = (props) => {
  // 넘어오는 props를 파악하는게 중요.
  // path, component ....state.Auth.token
  const token = useSelector((state) => state.true);
  //const token = 1;
  const {component: RouteComponent, path} = props;
  
  // redirectUrl은 로그인이 성공후 돌아갈 화면. !jwtUtils.isAuth(token) --> 로그인 토큰이 올바르지 않은 경우 
  if (jwtUtils.isAuth(token)) {
    alert("로그인이 필요한 페이지입니다");
    return <Navigate to={`/login?redirectUrl=${path}`}/>;
  }
  return <RouteComponent/>;
};

export default PrivateRoute;