import { StyleSheet } from "react-native"

export const homeStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 75,
    },
    button: {
        width: 400,
        height: 150,
        backgroundColor: "black",
        
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 16

    }
})

export const fitStyles = StyleSheet.create({
    container: {
        flex:0.8,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "darkgrey"
    },
    buttonGroup: {
        margin: 50,
    },

})

export const CustButStyle = StyleSheet.create({
    button: {
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderRadius: 7,
    },
    buttonPressed: {
      elevation: 10,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      transform: [{ scale: 0.95 }]
    },
    text:{
      fontSize: 16
    }
  })
