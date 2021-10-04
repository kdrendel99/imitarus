// import { doc, updateDoc, arrayUnion } from "../../firebase.firestore";
import React, { useEffect, useState } from "react";
import firebase from '../../firebase';
// import firestore from '../../firebase/firestore';
import 'firebase/firestore';
import { useSelector } from 'react-redux'
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
// import { getStorage, ref } from "firebase/storage";
// import { doc, updateDoc, arrayUnion } from "firestore";

function NewFormPost(props){
  const firestore = useFirestore();

  useFirestoreConnect([
    { collection: 'posts' }
  ]);


  const { prompt } = props;
  const [uploadedImage, setUploadedImage] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [selectedPrompt, setSelectedPrompt] = useState(prompt.id);
  const [userId, setUserId] = useState(null);


  // useEffect(() => {
  //   console.log('prompt id:')
  //   console.log(selectedPrompt)
  // },[selectedPrompt]);

  // useEffect(() => {
  //   console.log('download url: ')
  //   console.log(downloadUrl)
  // },[downloadUrl]);

  useEffect(() => {
    if(userId && downloadUrl){
      addPostToPostCollection();
    }
  })

  // useEffect(() => {
  //   if (progress === 100){
  //     props.returnHome();
  //   }
  // })

  const handleChange = e => {
    if (e.target.files[0]){
      setUploadedImage(e.target.files[0])
    }
  }

  const addPostToPostCollection = () => {
    const promptRef = firestore.collection('prompts').doc(selectedPrompt);
    console.log('posted')
    firestore.collection('posts').add(
      {
        imageRef: downloadUrl,
        userId: userId,
        promptId: selectedPrompt,
        score: 0,
        timestamp: firestore.FieldValue.serverTimestamp()
      }
    )
    // .then(function(newPost){
    //   promptRef.update({
    //     posts: firebase.firestore.FieldValue.arrayUnion(newPost)
    //   })
    // })
  }

  const handleUpload = (e) => {
    e.preventDefault();

    const file = uploadedImage;
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const uploadTask = storageRef.child('folder/' + file.name).put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        let currentUploadProgress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100;
        setProgress(currentUploadProgress)
      },(error) => {
        throw error
      },() => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          setDownloadUrl(url)
        })
        document.getElementById('file').value = null
      }
    );
    setUserId(e.target.authorId.value);
  }

  return (
    <React.Fragment>
      <div className="padding"/>
      <div className="padding"/>
      <div className="padding"/>
      <div className="padding"/>
      <div className="padding"/>
      <div className="padding"/>
      <h4>Upload a new photo to this prompt</h4>
      <form onSubmit={handleUpload}>
      {/* <form onSubmit={addPostToPostCollection}> */}
        <img
          className="ref"
          src={uploadedImage? URL.createObjectURL(uploadedImage) : null}
          alt={uploadedImage? "Uploaded photograph" : null}
          height={uploadedImage? 300 : null}
        />
        <input type="file" id="file" onChange={handleChange}/>
        {/* {downloadUrl?downloadUrl.toString(): ""} */}
        <span style={progress === 100? {color:"green"}: null}>{progress}%</span>
        <button type="submit">Upload</button>
        <input type="text" name="authorId" defaultValue="author1" placeholder="Your name"/>
        <hr/>
        <button onClick={() => props.returnHome()}>Return to prompt</button>
      </form>
    </React.Fragment>
  );
};

export default NewFormPost;









