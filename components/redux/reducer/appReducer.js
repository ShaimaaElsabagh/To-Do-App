import { AsyncStorage } from "react-native"
const INITIAL_STATE = {
    list: []
}

// const storage = async (list) => {

//     return (
//         await AsyncStorage.setItem("storage_list", JSON.stringify(list))
//     )
// }




//لازم علي الاقل يبقي فيه 1 reducer

const AppReducer = (state = INITIAL_STATE, action) => {

    // AppReducer => لازم يكون ليها 2 para ==. 1- state اللي هي  INITIAL_STATE  , 2- action
    // طبعا اساميهم ممكن تتغير
    switch (action.type) {
        case "DELETE_ITEM":
            let new_array = state.list.filter((item, index) => index != action.payload_index)
           // مهناها ان اي اندكس مش بيساوي الاندكس اللي معايا حطه ف الاراري الجديد
            // state.list(new_array)
            return {
                ...state,list: [...new_array]
            }

            // list: new_array ==> زي  this.setState({list:new_arry})
        case "ADD_ITEM":
            state.list.push(action.payload)
            // storage(state.list)md

            return {
                ...state, list:[...state.list]
            }
        case "UPDATE_ITEM":
            state.list[action.payload_index].item_title = (action.payload_name)
            // storage(state.list)

            return {
                ...state, list:state.list
            }
        // case "STORAGE_DATA":
        //     return {
        //         ...state, list: action.payload
        //     }
        case "RENDER_DATA":
            return{
                ...state,list:action.payload
            }

        default:
            return state
    }
}

export default AppReducer