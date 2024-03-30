import React, {useEffect, useState} from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    FlatList,
    Text,
    View,
    FLatList
} from 'react-native';
import { supabase } from "../lib/supabase";


import LeaderboardItem from "../components/LeaderboardItem";

const LeaderboardScreen = () => {

    const [steps, setSteps] = useState([]);

    useEffect(() => {
        getSteps();
    }, []);

    async function getSteps() {
        const { data } = await supabase
        .from('step_log')
        .select()
        setSteps(data);
        console.log(data)
    }

    return (

        <SafeAreaView style={styles.pageView}>
            <ScrollView contentContainerStyle={styles.leaderboardView}>
                <Text style={styles.heading}>Most Steps This Week</Text>
                {steps.map((step) => (
                    <Text key={step.count}>{step.count} {step.id}</Text>
                ))}

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