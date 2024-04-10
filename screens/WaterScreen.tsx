import {View, Text, StyleSheet, Alert} from 'react-native'
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Search from '../components/NutritionComps/Search';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from 'react-native-elements';


export default function WaterScreen() {

    const [water, setWater] = useState('');
    const [totalWater, setTotalWater] = useState(0)

    var currentUserId = '54d2b68a-4eb6-45f9-9c17-98711ffd3324'

    useEffect(() => {
        getTotalWater();
    }, []);

    const addWater = async() => {
        const {error} = await supabase
        .from('water_log')
        .insert([
            {user_id: currentUserId, count: water}
        ])
        console.log("adding error", error)
        setWater('')
        getTotalWater()
    }

    async function getTotalWater() {
        const {data, error} = await supabase.rpc('get_water', {userid: currentUserId})
        setTotalWater(data)
        console.log('getting water error', error)
        console.log('current water', data)
    }

    return(
        <View>
            <Search
                input={water}
                setInput={setWater}
                placeholder={"Enter water drank (ml)"}
                showButton={false}
                buttonName={"Submit"}
                buttonColor={'#248bd6'} fetchData={undefined} height={undefined} multi={undefined}          />
            
            <Button
                title="Add Water"
                onPress={addWater}
            />
            <View style= {styles.trackerBox}>
                <AnimatedCircularProgress
                    size={300}
                    width={10}
                    fill={Math.round((totalWater/2000)*100)}
                    tintColor="#248bd6"
                    backgroundColor="#b9f2ff"
                    style={{padding:10}}>
                    {
                    () => (
                        <View>
                            <Text style={styles.trackerTopText}>
                                {Math.round(totalWater)} ml
                            </Text>
                            <Text style={styles.trackerBottomText}>
                                {'Consumed'}
                            </Text>
                        </View>
                    )
                    }
                    
                </AnimatedCircularProgress>
            </View>

            <View>
                <Text style={styles.target}>Target: 2000ml</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    trackerBox:{
        alignItems:'center',
    },

    trackerTopText:{
      textAlign:'center',
      fontSize:42,
    },

    trackerBottomText:{
      textAlign:'center',
      fontSize:24,
    },

    target: {
        textAlign:'center',
        fontSize:32,
        marginTop:15,
    },
});