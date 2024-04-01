import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Button,
  Animated,
  useWindowDimensions,
} from 'react-native';
import CustomButton from '../CustomButtons';
import { useState, useEffect } from 'react';
import { LinkedList } from '../../jsFiles/LinkedList';


export function EditProg({name, duration, entered, ll, setLinkedList}) {

  //weeks with each having days - for mapping not storing
  console.log(duration)
  const [weeks, setWeeks] = useState(new Array(parseInt(duration)).fill(new Array(7).fill("")))
  const [input, setInput] = useState(false)

  const scrollX = useRef(new Animated.Value(0)).current;
  const {width: windowWidth} = useWindowDimensions();
  //slide index for week
  let curWeek;
  const [days, setDays] = useState(Array.from({ length: 7 }, () => 0));

  const incrementDay = (index) => {
    setDays(prevDays => {
      const newDays = [...prevDays]; // Create a copy of the array
      newDays[index] = newDays[index] + 1; // Increment the value at the specified index
      console.log(days)
      return newDays; // Return the updated array
    });
  };
  
  const handleIncrement = (index) => {
    incrementDay(index);
  };

  useEffect(() =>{
    for (let i=0; i<duration; i++){
      ll.insertAt(new LinkedList(), i)
    }
    setLinkedList(ll)

  }, [])


  useEffect(() =>{

  }, [input])
  




  return(
    <SafeAreaView style={{...styles.container, marginVertical: 50}}>
    
      <View style={styles.scrollContainer}> 
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={1}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ], { useNativeDriver: false })}>


            {weeks.map((week, weekIndex) => {
              
              
              

              return(

                <View style={{width: windowWidth, height: 590}} key={weekIndex}>
                    <View style={styles.progContainer}>
                     
                        <View style={{...styles.textContainer}}>
                            <Text style={styles.text}> Programme name: {name} - Duration: {duration} weeks</Text>
                            <Text style={styles.text}> Week {(weekIndex+1)}</Text>
                            <Text > {curWeek}</Text>
                        </View>


                        <View>

                        <Text style={{backgroundColor:"red"}}>{ll.printList()} lol</Text>

                        </View>
                        
                        
                        
                        
                        
                        <View style={{marginVertical: 10, marginHorizontal: 15}}>
                          <Text>lol</Text>
                            { days.map((day, dayIndex) => {
                              return (



                                  <View style={{backgroundColor: "red", color:"black"}}>
                                      
                                      <Text>{ll.dataAt(0) + " lolers"}</Text>
                                  </View>
                            )})}
                        </View>

                        {/*
                        
                        <View style={styles.indicatorContainer}>
                          {weeks.map((prog, progIndex) => {
                              width = scrollX.interpolate({
                              inputRange: [
                                windowWidth * (progIndex - 1),
                                windowWidth * progIndex,
                                windowWidth * (progIndex + 1),
                              ],
                              outputRange: [8, 16, 8],
                              extrapolate: 'clamp',
                            });
                            
                            
                            
                          return (
                              <Animated.View
                                key={progIndex}
                                style={[styles.indicator, {width}]}
                              />
                            );
                          })}
                        </View>
                          */}
                    </View>
                </View>
              )
            })}

            
          
          </ScrollView>
          <Button 
                title="+ add day" 
                onPress={()=>{
                    
                      curWeek= Math.round(Animated.divide(scrollX, windowWidth).__getValue())
                      console.log(curWeek)
                    if(ll.dataAt(curWeek).size < 7){
                      handleIncrement(curWeek)
                      ll.dataAt(curWeek).add("kek" + ll.dataAt(curWeek).size)
                      console.log(ll.dataAt(curWeek))
                      setInput(!input)
                      console.log(days)

                        
                    }
                    
            }}/>
      </View>
    </SafeAreaView>

  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"red"
  },
  progContainer: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:"#FFFAF0",
    

  },
  textContainer: {
    height: 100,
    width: 300,
    backgroundColor:"white",
    borderBottomWidth: 2,
    borderBlockColor: "black"
  },
  text: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    paddingHorizontal: 30, 
    paddingTop: 5,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'purple',
    marginHorizontal: 4,
    margin: 4
    
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})










export function EditProg({name, duration, entered, ll, setLinkedList}) {
  const [weeks, setWeeks] = useState(new Array(parseInt(duration)).fill(5))
  const [visible, setVisible] = useState(false)

  const handleModal = () => {
    setVisible(!visible)
  }

  return(
    
    <View>
      <Text>{name + " " + duration}</Text>


      {weeks.map((week, index)=>{
        return(
          <View>
            <Text>{"week " + (index+1).toString()}</Text>

            <View>{
              ll.dataAt(index).next? 
              (<><Text>{ll.dataAt(index).element}</Text></>) 
              : 
              (<Text>currently empty</Text>)
            }</View>


            <Button title="edit this week" onPress={() => {
            handleModal()
            }} />

          </View>)}
        )
      }
          <DayModal 
          visible={visible}
          handleModal={handleModal}/>

          <CustomButton
            onPress={()=>{handleSubmit()}}
            text={"Finalize Programme"}
            width={300}
            height={30}
            color={"purple"}/>

    </View>
    
)}