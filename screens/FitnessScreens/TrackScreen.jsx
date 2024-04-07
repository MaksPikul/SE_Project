import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native"
import CustomButton from '../../components/CustomButtons';
import { useState } from "react";



export default function TrackScreen() {
    const [data, setData] = useState(null)
    const states = []

    const handleWeightChange = (newWeight, exIndex, setIndex) => {
        states[exIndex][setIndex].weight = newWeight
    }
    const handleRepChange = (newReps, exIndex, setIndex) => {
        states[exIndex][setIndex].reps = newReps
    }
    //For collecting data, find the next NOT completed day
    //And then get data for 

    let prog = {
        name: "Lifting Programme",

    }

    let day = {
        dayName : "Monday",
        exercs : []
    }

    let exercises = [
        {name:"tomatoe", sets:5, reps:3},
        {name:"incline-bench", sets:3, reps:12},
        {name:"Preacher", sets:3, reps:15},
        {name:"Hammer curls", sets:3, reps:15},
    ]

    
    return(
        <View>
            

            <ScrollView
            showsVerticalScrollIndicator={false}
            style={{backgroundColor:"#e8e8e8"}}>


                <View style={{flexDirection:"row", alignItems:'center', justifyContent:"center",backgroundColor:"navy", paddingVertical: 10}}>
                    <View >
                        <Text style={trackStyles.text}>{prog.name}</Text>
                        <Text style={trackStyles.text}>week 1 - Day2</Text>
                    </View>

                    <View style={{width:100}}/>

                    <CustomButton 
                    onPress={()=>console.log(states)}
                    text={"finish"}
                    width={70}
                    height={40}
                    color={"navy"} />
                </View>

            {exercises.map((exercise, exIndex)=>{

                states.push([])

                let sets = [];
                for (let i = 0; i < exercise.sets; i++) {
                    states[exIndex].push(
                        {
                        reps: null,
                        weight:null
                        }
                    )
                    
                    sets.push(
                    //this is one row
                    <View style={{flexDirection:"row", margin:5}}>
                         
                        <Text style={{...trackStyles.spacing, marginStart: 10}}>{i+1}</Text>
                        {/*<Text style={trackStyles.spacing}>{"60Kg x 8"}</Text>*/}
                        <Text style={{marginRight: 120,}}>{(exercise.reps).toString() + " reps"}</Text>

                        <TextInput
                        //value={states[exIndex].weight}
                        keyboardType="numeric"
                        maxLength={2}
                        onChangeText={(text)=>handleWeightChange(text, exIndex, i)}
                        style={{...trackStyles.spacing,...trackStyles.input}}/>

                        <TextInput
                        value={states[exIndex].reps}
                        keyboardType="numeric"
                        maxLength={2}
                        onChangeText={(text)=>handleRepChange(text, exIndex, i)}
                        style={{...trackStyles.spacing,...trackStyles.input}}/>
                        
                        {/*<TextInput />
                        <TextInput />
                        Should be a checklist, 
                        when finish is press, it will loop 
                        and check exercises which are checked to log them,
                        unchecked will not be logged*/}
                    </View>
                    );
                }
                return(
                    
                <View style={trackStyles.container}>

                    {/* Exercise Header whole section needs map */}
                    <View style={trackStyles.header}>
                        <View>
                            <Text style={trackStyles.text}>{exercise.name}</Text>
                        </View>
                        <View style={{flexDirection:"row", alignContent:'flex-end'}}>
                            <Text style={trackStyles.text}>Set</Text>
                            {/*<Text style={trackStyles.spacing}>Previous</Text>*/}
                            <Text style={{...trackStyles.text,marginRight: 90}}>Target</Text>
                            <Text style={trackStyles.text}>Kg</Text>
                            <Text style={trackStyles.text}>Reps</Text>
                        </View>
                    </View>

                    <View>{sets}</View>
                    
                </View>
                )
            })}
            </ScrollView>
        </View>
    )
}


const trackStyles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        margin:10,
        paddingBottom:15,
        borderRadius:15
    },
    header:{backgroundColor: "navy",
    marginBottom:15, 
    paddingHorizontal: 20, 
    paddingVertical:10, 
    borderRadius:15
    },
    spacing:{
        marginRight: 10
    },
    input:{
        borderWidth:1,
        borderRadius:5,
        width:55,
        height: 30,
        padding:0,
        textAlign:"center",
        textAlignVertical:"center",
        backgroundColor:"white",
        shadowOffset: {
            width: 0,
            height: 2,
          },
          elevation: 10,
    },
    text: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingTop: 5,
      },
})