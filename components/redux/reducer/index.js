import { combineReducers } from "redux";
import AppReducer from "./appReducer";
export default combineReducers({
    App: AppReducer
})



///combineReducers ==> زي createAppContiner بجمع فيه كل ال reducers اللي عندي