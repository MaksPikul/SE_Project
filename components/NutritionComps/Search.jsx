import {View, TextInput, Button, StyleSheet} from 'react-native';

export default function Search ({
    setInput, 
    fetchData, 
    placeholder, 
    showButton, 
    buttonName, 
    height,
    multi,
    buttonColor
}) {

    return (
        <View>
            <TextInput
                placeholder={placeholder}
                onChangeText={setInput}
                style ={styles.input}
                height = {height}
                multiline = {multi}
            />
            {showButton && <Button
                title={buttonName}
                onPress={fetchData}
                color={buttonColor}
            />}
        </View>
    )

}

const styles = StyleSheet.create({

    input: {
        borderWidth:1,
        padding: 10,
        height: 40,
        margin: 12,
    },
})
