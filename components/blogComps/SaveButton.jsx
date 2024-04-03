import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TextInput, Button, StyleSheet , TouchableOpacity } from 'react-native';
import { supabase } from "../../lib/supabase";

const SaveButton = ({post_ID, user_ID}) => {
    const [isSaved, setIsSaved] = useState();

    useEffect(() =>{
        getSaved();
    })

    async function getSaved() {
        const { data, error } = await supabase.rpc('check_if_saved', {postid: post_ID, userid: '54d2b68a-4eb6-45f9-9c17-98711ffd3324'})
        setIsSaved(data);
        console.log("post", post_ID, "is saved", data)

    }

    const savePost = async() => {
        const {error} = await supabase
        .from('saved_posts')
        .insert([
            { post_id: post_ID , user_id: '54d2b68a-4eb6-45f9-9c17-98711ffd3324'}
        ])
        console.log("saving error",error)
        getSaved()
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
        {isSaved ? (
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