import React, { useEffect, useState } from "react";
import firebase from '../../firebase';
import 'firebase/firestore';
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import { useAuth } from '../contexts/AuthContext';

function NewFormPost(props){
  const firestore = useFirestore();
  const { currentUser } = useAuth();

  useFirestoreConnect([
    { collection: 'posts' }
  ]);


  const { prompt } = props;
  const [uploadedImage, setUploadedImage] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [selectedPrompt, setSelectedPrompt] = useState(prompt.id);
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    addPostToPostCollection();
  }, [downloadUrl])

  useEffect(() => {
    const userName = currentUser.email.split('@');
    console.log(userName[0])
  })

  const handleChange = e => {
    if (e.target.files[0]){
      setUploadedImage(e.target.files[0])
    }
  }

  const addPostToPostCollection = () => {
    if (currentUser.email){
      const userName = currentUser.email.split('@');
      const promptRef = firestore.collection('prompts').doc(selectedPrompt);
      console.log('posted')
      firestore.collection('posts').add(
        {
          imageRef: downloadUrl,
          userId: userName[0],
          promptId: selectedPrompt,
          likes: 0,
          timestamp: firestore.FieldValue.serverTimestamp()
        }
      )
    }
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
        {/* <input type="text" name="authorId" defaultValue="author1" placeholder="Your name"/> */}
        <hr/>
        <button onClick={() => props.returnHome()}>Return to prompt</button>
      </form>
    </React.Fragment>
  );
};

export default NewFormPost;









