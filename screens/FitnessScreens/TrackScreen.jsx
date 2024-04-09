import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native"
import CustomButton from '../../components/CustomButtons';
import { useEffect, useState } from 'react';
import { supabase  } from "../../lib/supabase";

export default function TrackScreen({ route, navigation }) {
    const [day, setDayName] = useState("");
    const [dayID, setDayID] = useState(0);
    const [exercises, setExercises] = useState([]);
    const states = []
    // this.state = {day_name: "boo"}

    useEffect(() => {
        getDays();
        getExercises();
    }, []);

    console.log("this days", day, dayID);

    const handleWeightChange = (newWeight, exIndex, setIndex) => {
        states[exIndex][setIndex].weight = newWeight
    }
    const handleRepChange = (newReps, exIndex, setIndex) => {
        states[exIndex][setIndex].reps = newReps
    }
    //For collecting data, find the next NOT completed day
    //And then get data for 

    var day_name = "boo";

    async function getDays() {
        console.log('RAAAN HEREE', route.params.programme.week_id);
        var week_id = route.params.programme.week_id;
        const { data, error } = await supabase.rpc('get_days', { weekid: week_id })
        // setDays(data);
        setDayName(data[0].day_name);

        setDayID(data[0].id);

        getExercises({ day_id: data[0].id });
        // console.log("Exercises", exercises);
    }

    async function getExercises({ day_id }) {
        console.log('ran in exercise', day_id);
        const { data, error } = await supabase
            .from('exercises')
            .select('id, name, reps, sets')
            .eq('day_id', day_id)
            // exercise_id,
        console.log("ran in tracking get exercises", data, exercises);
        setExercises(data);
        console.log(data);
    }

    async function setSets() {

        console.log(dayID);
        for (i = 0; i < states.length; i++) {
            const { error } = await supabase
            .from('exercises')
            .update( {completed: true} )
            .eq('id', states[i][0].exercise_id)
            console.log("states[i][0]", states[i][0]);
            for (j = 0; j < states[i].length; j++) {
                console.log("iterating through states", states[i][j].exercise_id);
                const { data, error } = await supabase
                .from('sets')
                .insert([
                    {exercise_id: states[i][j].exercise_id, weight: states[i][j].weight, reps_done: states[i][j].reps}
                ])
                .select()

                console.log(data, error);
            }
        }
        const { error } = await supabase
        .from('fitness_day')
        .update( {completed: true} )
        .eq('id', dayID)
        console.log(error);

        // TODO: UPDATE WEEK AND PROGRAM AS WELL

        // const { error } = await supabase
        // .from('sets')
        // .update({ weight: , sets_done: })
    }

    let prog = {
        name: route.params.programme.name,

    }

    // console.log("should show actual day", day_name);

    // let day = {
    //     dayName: days[0].day_name,
    //     exercs: []
    // }

    // let exercises = [
    //     { name: "tomatoe", sets: 5, reps: 3 },
    //     { name: "incline-bench", sets: 3, reps: 12 },
    //     { name: "Preacher", sets: 3, reps: 15 },
    //     { name: "Hammer curls", sets: 3, reps: 15 },
    // ]
    console.log(states);


    return (
        <View>


            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: "#e8e8e8" }}>


                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "center", backgroundColor: "navy", paddingVertical: 10 }}>
                    <View >
                        <Text style={trackStyles.text}>{prog.name}</Text>
                        <Text style={trackStyles.text}>{"week 1 - " + day}</Text> 
                    </View>

                    <View style={{ width: 100 }} />

                    <CustomButton
                        onPress={() => 
                            // console.log(states)
                            setSets()
                            }
                        text={"finish"}
                        width={70}
                        height={40}
                        color={"navy"} />
                </View>

                {exercises.map((exercise, exIndex) => {

                    states.push([])
                    let sets = [];
                    for (let i = 0; i < exercise.sets; i++) {
                        states[exIndex].push(
                            {   
                                exercise_id: exercise.id,
                                reps: null,
                                weight: null
                            }
                        )


                        sets.push(
                            //this is one row
                            <View style={{ flexDirection: "row", margin: 5 }}>

                                <Text style={{ ...trackStyles.spacing, marginStart: 10 }}>{i + 1}</Text>
                                {/*<Text style={trackStyles.spacing}>{"60Kg x 8"}</Text>*/}
                                <Text style={{ marginRight: 120, }}>{(exercise.reps).toString() + " reps"}</Text>

                                <TextInput
                                    //value={states[exIndex].weight}
                                    keyboardType="numeric"
                                    maxLength={2}
                                    onChangeText={(text) => handleWeightChange(text, exIndex, i)}
                                    style={{ ...trackStyles.spacing, ...trackStyles.input }} />

                                <TextInput
                                    value={states[exIndex].reps}
                                    keyboardType="numeric"
                                    maxLength={2}
                                    onChangeText={(text) => handleRepChange(text, exIndex, i)}
                                    style={{ ...trackStyles.spacing, ...trackStyles.input }} />

                                {/*<TextInput />
                        <TextInput />
                        Should be a checklist, 
                        when finish is press, it will loop 
                        and check exercises which are checked to log them,
                        unchecked will not be logged*/}
                            </View>
                        );
                    }
 
                    return (

                        <View style={trackStyles.container}>

                            {/* Exercise Header whole section needs map */}
                            <View style={trackStyles.header}>
                                <View>
                                    <Text style={trackStyles.text}>{exercise.name}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignContent: 'flex-end' }}>
                                    <Text style={trackStyles.text}>Set</Text>
                                    {/*<Text style={trackStyles.spacing}>Previous</Text>*/}
                                    <Text style={{ ...trackStyles.text, marginRight: 90 }}>Target</Text>
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
    container: {
        backgroundColor: "white",
        margin: 10,
        paddingBottom: 15,
        borderRadius: 15
    },
    header: {
        backgroundColor: "navy",
        marginBottom: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15
    },
    spacing: {
        marginRight: 10
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        width: 55,
        height: 30,
        padding: 0,
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: "white",
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