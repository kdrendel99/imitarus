import React, { useEffect, useState } from "react";
import firebase from '../../firebase';
import 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'

// WHAT WE NEED: 
//   -POST OBJECT FROM PROMPTDETAIL 
//   -USER'S ID
//   -USER OBJECT

function useLikePost(){
  const [validUser, setValidUser] = useState(false);


    const user = useAuth();
    if (user){
      setValidUser(true);
    }
    else {
      setValidUser(false);
    }





















  // const firestore = useFirestore();

  // useFirestoreConnect([
  //   { collection: 'posts' }
  // ]);


  // const [selectedPost, setSelectedPost] = useState(post.id);
  // const [userId, setUserId] = useState(null);




  // const addPostToPostCollection = () => {
  //   const promptRef = firestore.collection('prompts').doc(selectedPrompt);
  //   console.log('posted')
  //   firestore.collection('posts').add(
  //     {
  //       imageRef: downloadUrl,
  //       userId: userId,
  //       promptId: selectedPrompt,
  //       score: 0,
  //       timestamp: firestore.FieldValue.serverTimestamp()
  //     }
  //   )
  // }

  // const handleUpload = (e) => {
  //   e.preventDefault();

  //   const file = uploadedImage;
  //   const storage = firebase.storage();
  //   const storageRef = storage.ref();
  //   const uploadTask = storageRef.child('folder/' + file.name).put(file);

  //   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //     (snapshot) => {
  //       let currentUploadProgress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100;
  //       setProgress(currentUploadProgress)
  //     },(error) => {
  //       throw error
  //     },() => {
  //       uploadTask.snapshot.ref.getDownloadURL().then((url) => {
  //         setDownloadUrl(url)
  //       })
  //       document.getElementById('file').value = null
  //     }
  //   );
  //   setUserId(e.target.authorId.value);
  // }

  return validUser;
};

export default useLikePost;









