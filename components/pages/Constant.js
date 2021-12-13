const { width, height } = Dimensions.get("screen")
import { Dimensions } from "react-native"
export const Colors = {
    mainColor: "rgb(0,125,75)",
    secColor: "#fff",
    falseColor: "rgba(255,0,0,0.9)"
}


export const globalStyle = {
    Header: {
        width: "100%",
        // height: height * .08,
        height:"7%",
        backgroundColor: Colors.mainColor,
        justifyContent: "center",
        alignItems: "center",

    },

    HeaderTitle: {
        color: Colors.secColor,
        fontSize: 18,
        fontWeight: '900'
    },

    TouchableContiner: {
        width: '95%',
        height: height * .09,
        // backgroundColor:"#f0f",
        alignSelf: 'center',
        marginTop: 5,
        borderBottomWidth: 0.8,
        borderBottomColor: Colors.mainColor,
        justifyContent: 'center',
        flexDirection: "row"
    },
    IconContiner: {
        width: '10%',
        height: '100%',
        justifyContent: "center",
        alignItems: 'center',
    },

    AddTouchable: {
        width: '37%',
        height: '95%',
      
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: Colors.mainColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20
       
    },

    SafeTouchable: {
        width: '45%',
        height: '100%',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 10
    },

    TextinputStyle: {
        width: '100%',
        height: height * 0.8,
        backgroundColor: Colors.secColor,
        fontSize: 18,
        paddingRight: 10,
        color: "#333"
    },

    AnimatedView: {
        width: '100%',
        height: height * 1,
        backgroundColor: Colors.secColor,
        alignSelf: 'center',
        alignItems: "center"
    },

    SaveAndCancleContiner: {
        width: '100%',
        height: height * 0.1,
        alignSelf: 'center',
       
        flexDirection: 'row',
        justifyContent: "space-around",
         backgroundColor:Colors.secColor
    }
}