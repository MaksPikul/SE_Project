import React from 'react';
import { View , Text} from 'react-native';
import CustomButton from './CustomButtons';
import { useNavigation } from '@react-navigation/native';

export default function CustomHeader(props) {

    //this will need styling, to center and add buttons

    return(
        <View>
            {/*    something similar but not this will be used for header
            
            <CustomButton onPress={() => navigation.navigate("Nutrition")} text="Home" width={70} height={50} color={"purple"} />
            */}

        <Text>{props.text}</Text>
        </View>
    )
}