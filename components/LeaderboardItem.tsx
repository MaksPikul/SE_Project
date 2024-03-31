import React from "react";
import { View, Text, StyleSheet } from "react-native";
const LeaderboardItem = ({index, step} : {index:any, step:any}) =>{
    
    return(
        <View style={styles.mainView}>
            <View style={styles.Item}>
                <Text style={styles.itemText}>{step.first_name}</Text>
                <Text style={styles.itemText}>{step.steps} steps</Text>
                <Text style={styles.itemText}>{index}</Text>
            </View>

        </View>
    )
}

export default LeaderboardItem

const styles = StyleSheet.create({
    Item:{
        height:80,
        width:'100%',
        borderWidth:2,
        backgroundColor:'#ffffff',
        borderRadius:15,
        alignItems:'center',
        justifyContent:'space-evenly',
        flexDirection: 'row',
        fontWeight: 'bold',
    },
    mainView:{
        width:'90%',
        alignItems:'center',
        justifyContent:'center',
        //backgroundColor:'red'
    },
    itemText:{
        fontWeight:'bold',
        fontSize:16
    }
})
