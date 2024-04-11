import React, { useEffect, useState } from "react";
import { Text, StyleSheet , TouchableOpacity, Alert } from 'react-native';
import { supabase } from "../../lib/supabase";
import { useLogin } from "../../context/loginProvider";

const SaveButton = ({post_ID, user_ID}) => {
    const [isSaved, setIsSaved] = useState(null);
    
    useEffect(() =>{
        getSaved();
    })

    async function getSaved() { 
        const {data, error} = await supabase.rpc('check_if_saved', {postid: post_ID, userid: user_ID})
        console.log(error)
        setIsSaved(data);

    }

    const savePost = async() => {
        const {error} = await supabase
        .from('saved_posts')
        .insert([
            { post_id: post_ID , user_id: user_ID}
        ])
        console.log("saving error",error)
        if(error === null){
            getSaved()
        }
        else {
            Alert.alert('Whoops!','This post no longer exists', [
                {text: 'Understood', onPress: () => console.log('Alert Closed')}
            ])
        }
    }

    const unsavePost = async() => {
        const {error} = await supabase
        .from('saved_posts')
        .delete()
        .eq('post_id', post_ID)
        console.log("error",error)
        getSaved()
    }


    return(
        <>
        {isSaved? (
            <TouchableOpacity style={styles.button} onPress={unsavePost}>
                <Text style={styles.buttonText}>Unsave</Text>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity style={styles.button} onPress={savePost}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        )}
        </>

        
    )
}

export default SaveButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'purple', 
        borderRadius: 5,
        padding: 5,
        marginBottom: 4, 
        marginTop: 4, 
        width: 70, 
        height: 30,
        justifyContent: 'left',
      },
      buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
      }
});