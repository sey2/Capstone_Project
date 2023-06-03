import {persistReducer} from "redux-persist";
import {AuthReducer} from "./reducers/AuthReducer";
import {createStore, combineReducers} from "redux";

// 스토어는 State 를 수시로 확인해 View 한테 변경된 사항을 알려주는 역할
// local storage 사용
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  //local storage에 저장
  storage: storage 
};

const allReducers = combineReducers({
  Auth: AuthReducer
});

// persistReducer를 통해 새로고침 해도 persistConfig의 storage값이 초기화 되지 않도록 설정 
// 즉, 새로 고침하면 Redux로 저장한 State들이 날아가는데 Login 후 다음페이지에서 새로고침해도 로그인 정보가 그대로 남음
const store = createStore(persistReducer(persistConfig, allReducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;