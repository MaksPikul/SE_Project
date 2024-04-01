import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LeaderboardItem = ({index, step} : {index:any, step:any}) =>{
        
    return(
        <View style={styles.mainView}>
            <View style={{backgroundColor: index === 1 ? "gold" : index === 2 ? "silver" :index === 3 ? "#CD7F32" : "white",
                height:80,
                width:'100%',
                borderWidth:2,
                borderRadius:15,
                alignItems:'center',
                justifyContent:'space-evenly',
                flexDirection: 'row',
        }}>
                <Text style={styles.itemText}>{step.first_name}</Text>
                <Text style={styles.itemText}>{step.steps} steps</Text>
                <Text style={styles.itemText}>{index}</Text>
            </View>

        </View>
    )
}

export default LeaderboardItem

const styles = StyleSheet.create({
    first:{
        backgroundColor:'orange'
    },

    mainView:{
        padding: 5,
        marginTop: 5,
        width:'95%',
        alignItems:'center',
        justifyContent:'center',
        //backgroundColor:'red'
    },
    itemText:{
        fontWeight:'bold',
        fontSize:16
    }
})
