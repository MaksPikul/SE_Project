// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// //this might need removing, and any instance of homeButton in homeScreen will 
// //be replaced with CustumButton

// const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => {
//   return (
//     <TouchableOpacity onPress={onPress} style={buttonStyle}>
//       <Text style={textStyle}>{title}</Text>
//     </TouchableOpacity>
//   );
// };

//trial but check if it runs and it doesnt want to work for me 

import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const HomeButton = ({ onPress, title, style}) => {

  
  
  return (
    <View style={{...bStyles.buttonBack, ...bStyles.button}}>
      <Pressable
      onPress={onPress} 
      style={({pressed})=> [{transform: pressed ? [{translateY: -6}] : null},bStyles.buttonFront, style]}>  
        
        <Text style={{color: "white", fontSize: 19}}>{title}</Text>

      </Pressable>
    </View>
  );
};

const bStyles = StyleSheet.create({
  button:{
  marginVertical:40,
  marginHorizontal: 20,
  },
  buttonFront:{
  backgroundColor:"blue",
  width: 150,
  height: 140,
  padding:20,
  transform: [{translateY:10}],
  borderRadius:20
  },
  buttonBack:{
  backgroundColor: "navy",
  width: 140,
  height: 140,
  padding:20,
  alignItems:"center",
  justifyContent:"center",
  borderRadius:20
  }
})

export default HomeButton;