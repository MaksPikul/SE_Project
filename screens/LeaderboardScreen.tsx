import React, {useEffect, useState} from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { supabase } from "../lib/supabase";

const LeaderboardScreen = () => {

    const getSteps = async () => {
        let {data:steps_logs, error} = await supabase
        .from("steps_logs")
        .select('*')

        return steps_logs
    }

    useEffect(() => {
        getSteps()
        .then((steps_logs) => {
            console.log("steps", steps_logs)
        })
    }, [])

    return (
        <SafeAreaView style={styles.pageView}>
            <ScrollView contentContainerStyle={styles.leaderboardView}>
                <Text style={styles.heading}>Most Steps This Week</Text>
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageView:{
        flex:1,
        backgroundColor:'white'
    },
    leaderboardView:{
        flex:1,
        backgroundColor:'light grey',
        padding:10
    },
    heading:{
        fontSize:20,
        fontWeight:'bold',
        marginTop:20
    }
})

export default LeaderboardScreen