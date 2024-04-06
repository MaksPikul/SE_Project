import {View, Text, StyleSheet} from 'react-native'
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Search from '../components/NutritionComps/Search';
import { useState } from 'react';


export default function WaterScreen() {

    const [water, setWater] = useState('');

    return(
        <View>
            <Search
                setInput={setWater}
                placeholder={"Enter water drank (Litres)"}
                showButton={true}
                buttonName={"Submit"}
                buttonColor={'#248bd6'} fetchData={undefined} height={undefined} multi={undefined}            />
            <View style= {styles.trackerBox}>
                <AnimatedCircularProgress
                    size={300}
                    width={10}
                    fill={30}
                    tintColor="#248bd6"
                    backgroundColor="white"
                    style={{padding:10}}>
                    {
                    () => (
                        <View>
                            <Text style={styles.trackerTopText}>
                                {'1.4 Litres'}
                            </Text>
                            <Text style={styles.trackerBottomText}>
                                {'Remaining'}
                            </Text>
                        </View>
                    )
                    }
                    
                </AnimatedCircularProgress>
            </View>

            <View>
                <Text style={styles.target}>Target: 2 Litres</Text>
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