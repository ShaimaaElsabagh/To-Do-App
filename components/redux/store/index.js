import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk"
import combineReducers from "../reducer"
const configStore = createStore(combineReducers, {}, applyMiddleware(ReduxThunk))

export {configStore}




///createStore==> هي اللي بتخزن الglobal state

/// applyMiddleware ==> بتحدد اذا كانت العمليات هتتنفذ توالي ولا توتزي