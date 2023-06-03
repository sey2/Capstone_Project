const SET_TOKEN = 'set_token';
//const SET_TOKEN = 1;

const AuthInitialState = {
   //token: 1
  token: null
}

// 어떤 동작에 대해 선언되어진 객체. type 필드에 토큰 형식을 지정 
// 어떤 동작인지를 표기한 지정표 
export const setToken = (token) => ({
  type: SET_TOKEN,
  token
})

// Action Creator:  Action을 생성해 실제로 객체로 만들어주는 함수 
export const AuthReducer = (state = AuthInitialState, action) => {
  switch(action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      }
    default:
      return state;
  }
}