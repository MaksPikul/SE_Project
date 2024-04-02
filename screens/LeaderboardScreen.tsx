import React, {useEffect, useState} from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    FlatList,
    Text,
    View,
} from 'react-native';
import { supabase } from "../lib/supabase";


import LeaderboardItem from "../components/leaderboardComps/LeaderboardItem";

const LeaderboardScreen = () => {

    const [steps, setSteps] = useState([]);

    useEffect(() => {
        getSteps();
    }, []);

    async function getSteps() {
        const { data } = await supabase.rpc('get_leaderboard')
        setSteps(data);
        console.log("leaderboard data", data)
    }

    return (

        <SafeAreaView style={styles.pageView}>
            <ScrollView style={styles.leaderboardView}>
                <Text style={styles.heading}>Most Steps Over 7 Days</Text>
                {steps.map((step, index) => (
                    <View style={styles.leaderboard}key={step['first_name']}>
                        <LeaderboardItem step={step} index={index+1}></LeaderboardItem>
                    </View>
                    
                ))}

            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageView:{
        flex:1,
        
    },
    leaderboard:{
        flex:1,
        //backgroundColor:'pink',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%'
    },
    leaderboardView:{
        flex:1,
        padding:10,
        //backgroundColor:'blue',
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    heading:{
        fontSize:20,
        fontWeight:'bold',
        marginTop:20,
        //backgroundColor:'green'
    }
})

export default LeaderboardScreen