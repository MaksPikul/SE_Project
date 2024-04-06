//Code taken and adapted by Maks from RenderPost.jsx
//both files originally written by --NAME--

import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const RenderHist = ({ historyData } : { historyData : any}) => {
    
    historyData.progName
    historyData.saveDate
    historyData.exercises
    //.names .sets .bestSets
        //historyData.exercises should have exercise name, setsCompleted and bestSet
        //bestSet is the largest value when set*reps, displayed as "70 kg x 6"
    
    return (
        <View style={styles.postContainer}>

            {historyData.progName && <Text style={styles.postTitle}>{historyData.progName}</Text>}
            {historyData.saveDate && <Text style={styles.postDate}>Completed on: {historyData.saveDate.substring(0,10)}</Text>}
            {historyData.exercises && 
            <View>
                <View>
                    {historyData.exercises.names.map((name:any)=>{
                        return(
                            <Text>{name}</Text>
                            
                        )
                    })}
                </View>

                <View>
                {historyData.exercises.sets.map((set:any)=>{
                    return(
                        <Text>{set}</Text>
                        
                    )
                })}
                </View>

                <View>
                {historyData.exercises.bestSets.map((bestSet:any)=>{
                    return(
                        <Text>{bestSet}</Text>
                        
                    )
                })}
                </View>
            </View>}
        </View>
    )
}


const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#fff', 
        borderRadius: 4,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },
        borderWidth: 1, 
        borderColor: 'purple', 
    },
    postType: {
        fontSize: 18, 
        fontWeight: 'bold',
        color: 'purple', 
        marginBottom: 4,
    },
    postTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'purple',
    },
    postDate: {
        fontSize: 14,
        color: '#2f4f4f',
        marginTop: 8,
    },
    postLink: {
        fontSize: 16,
        color: '#0000ff', 
        marginTop: 8,
    },
    textStyle: {
        fontSize: 16,
    },
    readMoreStyle:{
        fontSize: 14,
        color: '#b366ff',
        textDecorationLine: 'underline'
    }
})