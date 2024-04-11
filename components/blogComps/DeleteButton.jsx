import React, {useEffect, useState} from "react";
import { Text, StyleSheet , TouchableOpacity, Alert } from 'react-native';
import { supabase } from "../../lib/supabase";

 const DeleteButton = ({post_ID, user_ID}) => {
    const [isOwned, setIsOwned] = useState();
    //console.log('delete button user id', user_ID)

    useEffect(() =>{
        getOwned();
    })

    async function getOwned() {

        const {data, error} = await supabase.rpc('check_if_owner', {postid: post_ID, userid: user_ID})
        //console.log(error)
        setIsOwned(data);
    }

    const deletePost = async() => {
        const {error} = await supabase
        .from('blog_post')
        .delete()
        .eq('id',post_ID)
        //console.log("error",error)
        getOwned()
    }

    function deleteConfirmation() {
        Alert.alert('Wait','Are you sure you want to delete this post?', [
            {text: "No"},{text: 'Yes', onPress: () => deletePost()},
        ])    
    }

    return(
        <>
        {isOwned ?(
            <TouchableOpacity style={styles.button} onPress={deleteConfirmation}>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        ) : (
            null
        )}
        </>
    )

 }

 export default DeleteButton

 const styles = StyleSheet.create({
    button: {
        backgroundColor: 'red', 
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