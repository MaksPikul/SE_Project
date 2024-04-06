import { useState } from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';

export default function Search ({
    input,
    setInput, 
    fetchData, 
    placeholder, 
    showButton, 
    buttonName, 
    height,
    multi,
    buttonColor
}) {


    const handleSearch = () => {
        if (!input.trim()) {
            Alert.alert("Please enter a food or drink. Cannot be empty.")
        } else {
            fetchData()
        }
    }

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
                onPress={handleSearch}
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
