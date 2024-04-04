import { StyleSheet } from "react-native"

export const b = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: "row",
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

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 11,
  },
  column: {
    flexDirection: 'row',
    marginBottom: 11,
  },
  button: {
    width: 150, // Adjust as needed
    height: 150, // Adjust as needed
    padding: 11,
    borderRadius: 13,
    marginRight: 10, // Adjust as needed
    backgroundColor: 'black', // Adjust as needed
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export const logoutButton = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black'
  },
  button: {
    width: 150, // Adjust as needed
    height: 70, // Adjust as needed
    padding: 11,
    margin: 10,
    borderRadius: 13,
    marginRight: 10, // Adjust as needed
    backgroundColor: 'blue', // Adjust as needed
  },

})

export const fitStyles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: "lightgrey",
    },
    viewContainer: {
        flexDirection: "column",
        alignItems: "center",
        //justifyContent: "",
        marginVertical: 20
    },
    group: {
        marginTop: 20,
        marginBottom: 100,
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

  export const headerStyle = StyleSheet.create({
    container:{
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      flex:1,
      backgroundColor: "red"
    }
  })