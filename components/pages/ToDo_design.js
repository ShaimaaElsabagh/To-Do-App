import React, { useState, useLayoutEffect } from 'react'
import { View, StyleSheet, Text, FlatList, Dimensions, ActivityIndicator,TouchableOpacity, TextInput, Modal, StatusBar, AsyncStorage, ScrollView } from "react-native"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { Colors } from './Constant';
import { globalStyle } from './Constant';
import * as Animatable from 'react-native-animatable';
import AntDesign from "react-native-vector-icons/AntDesign"
import { deleteItem } from "../redux/actions/Delete"
import { add_item } from '../redux/actions/Add'
import { update_item } from "../redux/actions/Update"
import { Storage_data } from '../redux/actions/storage_data'
const { width, height } = Dimensions.get("screen")

const ToDo_design = () => {
    //useSelector(state => state.App.list)==> عشان استدعي ال state اللي هشتغل عليها 
    const dispatch = useDispatch()
    const [select_list, set_select_list] = useState(useSelector(state => state.App.list))
    const select_list_test = useSelector(state => state.App.list)
    const [Add_modal, set_Add_modal] = useState(false)
    const [Update_Alert, set_Update_Alert] = useState(false)
    const [item_title, set_item_title] = useState("")
    const [item_date, set_item_date] = useState("")
    const [update_name, set_update_name] = useState()
    const [update_index, set_update_index] = useState()
    const [id_to_update, set_id_to_update] = React.useState()
    const[Spinner , setSpinner]=useState(true)


    // const get_data = async () => {
    //     let storage_list = await AsyncStorage.getItem("storage_list")
    //     if (storage_list == null) {
    //         dispatch(Storage_data(JSON.stringify(select_list)))
    //         // console.log("home list : " + select_list)
    //     } else {
    //         // console.log("home list : " + JSON.stringify(storage_list))
    //         dispatch(Storage_data(storage_list))
    //     }

    // }


    useLayoutEffect(() => {
        GetData()
        //زي compomentDidmount بس الفرق ان دي بتتنفذ الاول و بعدين باقي الكود لكن 
        // compomentDidmount بتتنفذ هي و الباقي مع بعض == useEffect 
        // AsyncStorage.clear()
    }, [])


    GetData = () => {
        axios.get("http://192.168.43.213/ToDo_Data/My_Select.php").then(res => {
            // console.log(res.data)
            // console.log(res.status)
            // set_select_list(res.data)
            dispatch({
                type: "RENDER_DATA",
                payload: (res.data)
            })
            setSpinner(false)
        })
    }


    function add_modal() {
        return (
            <>

                {
                    Add_modal ? (
                        <>
                            <View style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: "rgba(0,0,0,0.5)",
                                position: 'absolute',
                                alignItems: "center"
                            }}>
                                <Animatable.View
                                    animation="fadeIn"
                                    style={globalStyle.AnimatedView}>
                                    <TextInput
                                        value={item_title}
                                        onChangeText={(value) => {
                                            set_item_title(value)
                                        }}

                                        placeholder="write.."
                                        textAlignVertical="top"
                                        placeholderTextColor="#999"
                                        multiline
                                        style={globalStyle.TextinputStyle}
                                    />
                                    <View style={globalStyle.SaveAndCancleContiner}>
                                        <TouchableOpacity

                                            onPress={() => {
                                                // let d = new Date()
                                                // set_item_date(d.getDate() + "/" + (1 + d.getMonth()) + "/" + d.getFullYear())
                                                let new_item = {
                                                    item_title: item_title,
                                                    item_date: item_date,

                                                }
                                                // alert(new_item.item_title)

                                                set_item_title("")
                                                set_Add_modal(false)
                                                if (new_item.item_title != "") {
                                                    SaveMember(new_item)
                                                }
                                            }}
                                            style={[globalStyle.SafeTouchable, { backgroundColor: Colors.mainColor }]}>
                                            <Text style={globalStyle.HeaderTitle}>Add</Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity
                                            onPress={() => {
                                                set_Add_modal(false)
                                            }}
                                            style={[globalStyle.SafeTouchable, { backgroundColor: Colors.falseColor }]}>
                                            <Text style={globalStyle.HeaderTitle}>Cancle</Text>
                                        </TouchableOpacity>



                                    </View>
                                </Animatable.View>
                            </View>


                        </>
                    ) : null
                }


            </>
        )
    }




    function update_modal() {
        return (
            <>

                {
                    Update_Alert ? (
                        <>
                            <View style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: "rgba(0,0,0,0.5)",
                                position: 'absolute',
                                alignItems: "center"
                            }}>
                                <Animatable.View
                                    animation="fadeIn"
                                    style={globalStyle.AnimatedView}>
                                    <TextInput
                                        value={update_name}
                                        onChangeText={(value) => {
                                            set_update_name(value)
                                        }}
                                        placeholder="write.."
                                        textAlignVertical="top"
                                        placeholderTextColor="#999"
                                        multiline
                                        style={globalStyle.TextinputStyle}
                                    />
                                    <View style={globalStyle.SaveAndCancleContiner}>

                                        <TouchableOpacity
                                            onPress={() => {
                                                set_Update_Alert(false)
                                                //dispatch(update_item(update_name, update_index))
                                                SaveUpdate()
                                               
                                            }}
                                            style={[globalStyle.SafeTouchable, { backgroundColor: Colors.mainColor }]}>
                                            <Text style={globalStyle.HeaderTitle}>Save</Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity
                                            onPress={() => {
                                                set_Update_Alert(false)
                                            }}
                                            style={[globalStyle.SafeTouchable, { backgroundColor: Colors.falseColor }]}>
                                            <Text style={globalStyle.HeaderTitle}>Cancle</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Animatable.View>
                            </View>
                        </>
                    ) : null
                }
            </>
        )
    }




    function SaveMember(new_item) {
        const data_to_send = {
            item_title: new_item.item_title,
            item_date: new_item.item_date
        };
        // console.log(data_to_send)
        axios.post("http://192.168.43.213/ToDo_Data/My_Add.php",  new_item ).then(res => {
            // console.log(res.data)

        })
        dispatch(add_item(new_item))
    }




    const SaveDelete = (index) => {

        id = select_list_test[index].id;

        const data_to_send = {
            id
        };


        axios.post("http://192.168.43.213/ToDo_Data/My_Delete.php", data_to_send).then(res => {
        })
        dispatch(deleteItem(index))
    }



    const SaveUpdate = () => {
        id = select_list_test[update_index].id
        const data_to_send = {
            item_title: update_name,
            id
        };

        axios.post("http://192.168.43.213/ToDo_Data/My_Update.php", data_to_send).then(res => {
            // console.log(res.data)
            // console.log(data_to_send)

        })
        dispatch(update_item(update_name, update_index))



    }




    return (
        <>
            <StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />

            <View style={{
                backgroundColor: "#fff",
                width: '100%',
                height: '100%'
            }}>
                <View style={globalStyle.Header}>
                    <Text style={globalStyle.HeaderTitle}>Your To Do list</Text>
                </View>





{
    Spinner  ? (
        <View style={{
            width:'100%',
            height:'100%',
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"#fff"
        }}> 
        <ActivityIndicator size={45} color={Colors.mainColor}/>
        </View>
    ):(

<>
                <View style={{
                    width: "100%",
                    height: '93%',
                    alignItems: "center",
                    // backgroundColor: "#ff0",

                }}>


                    <View style={{
                        width: "100%",
                        height: "90%",
                        // backgroundColor: "#0ff"
                    }}>
                        {
                            select_list_test.length != 0 ? (
                                <>
                                    {
                                        <FlatList

                                            keyExtractor={(item, index) => index.toString()}
                                            data={select_list_test}
                                            renderItem={({ item, index }) => (
                                                <>
                                                    <TouchableOpacity style={globalStyle.TouchableContiner}>
                                                        <TouchableOpacity style={globalStyle.IconContiner}
                                                            onPress={() => {
                                                                SaveDelete(index)
                                                            }}
                                                        >
                                                            <AntDesign name="close" size={18} color={Colors.falseColor} />
                                                        </TouchableOpacity>


                                                        <TouchableOpacity style={globalStyle.IconContiner}
                                                            onPress={() => {
                                                                set_Update_Alert(true)
                                                                set_update_name(item.item_title)
                                                                set_update_index(index)
                                                                set_id_to_update(item.id)
                                                            }}
                                                        >
                                                            <AntDesign name="edit" size={18} color={Colors.mainColor} />
                                                        </TouchableOpacity>


                                                        <View style={{
                                                            width: '80%',
                                                            height: '100%',
                                                            justifyContent: "center",
                                                            alignItems: 'flex-end',
                                                            // backgroundColor:"#f0f"
                                                        }}>
                                                            <View style={{
                                                                // backgroundColor:"#f0f",
                                                                width: '100%',
                                                                height: '70%',
                                                                justifyContent: "center",

                                                            }}>
                                                                <Text style={{
                                                                    color: "#333",
                                                                    fontSize: 16,
                                                                    fontWeight: "normal",
                                                                    paddingLeft: 5,
                                                                    maxHeight: '40%',
                                                                    // maxWidth:'90%'
                                                                }}
                                                                // numberOfLines={1}

                                                                >{item.item_title}</Text>

                                                            </View>

                                                            <View style={{
                                                                // backgroundColor:"#00f",
                                                                width: '100%',
                                                                height: '30%',
                                                                justifyContent: "center"
                                                            }}>
                                                                <Text style={{
                                                                    color: Colors.falseColor,
                                                                    fontSize: 11,
                                                                    fontWeight: "normal",
                                                                    paddingLeft: 5
                                                                }}>{item.item_date}</Text>
                                                            </View>
                                                        </View>

                                                    </TouchableOpacity>
                                                </>
                                            )}
                                        >
                                        </FlatList>
                                    }
                                </>
                            ) : (
                                <>
                                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: Colors.mainColor, fontSize: 19, fontWeight: "normal" }}>Your list is empty</Text>

                                    </View>
                                </>
                            )
                        }
                        
                       

                    </View>
                    

                    <View style={{
                        width: "100%",
                        height: "10%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <TouchableOpacity style={globalStyle.AddTouchable}
                            onPress={() => {
                                set_Add_modal(true)
                            }}
                        >
                            <Text style={{ color: Colors.secColor, fontSize: 16 }}>Add new</Text>

                        </TouchableOpacity>
                    </View>
                </View>
                </>
                    )}
                {add_modal()}
                {update_modal()}
            </View>
        </>
    )
}


export default ToDo_design