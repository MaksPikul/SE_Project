import React from 'react';
import { View , Text} from 'react-native';
import CustomButton from './CustomButtons';
import { useNavigation } from '@react-navigation/native';
import { headerStyle } from '../styles/allStyles';

export default function CustomHeader(props) {

    //this will need styling, to center and add buttons

    // this whole file may not be neccessary

    
    return(
        <View style={headerStyle.container}>
            {/*    something similar but not this will be used for header
            
            <CustomButton onPress={() => navigation.navigate("Nutrition")} text="Home" width={70} height={50} color={"purple"} />
            */}
            <Text>{props.text}</Text>
        </View>
    )
}