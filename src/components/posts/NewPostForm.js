import { firestore } from "firebase";
import React, { useEffect, useState } from "react";
import firebase from '../../firebase';
import { useSelector } from 'react-redux'
import { useFirestore, useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

function NewFormPost(props){
  const [uploadedImage, setUploadedImage] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  const firestore = useFirestore();
  const posts = useSelector(state => state.firestore.ordered.posts);

  useFirestoreConnect([
    { collection: 'posts' }
  ]);

  const newPrompt = () => {
        firestore.collection('posts').add(
        {
          name: 'thing',
          timestamp: firestore.FieldValue.serverTimestamp()
        }
      )
  }

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

  // function addPostToPrompt(event, promptId){
  //   return firestore.CollectionReference('prompts')
  // }

  const handleUpload = () => {
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
          console.log('download url')
          console.log(downloadUrl);
        })
        document.getElementById('file').value = null
      }
    )
  }

  return (
    <React.Fragment>
      {/* {progress === 100? props.returnHome() : null} */}
      <h4>Upload a new post</h4>
      <img
        className="ref"
        // src={downloadUrl}
        src={uploadedImage? URL.createObjectURL(uploadedImage) : null}
        alt={uploadedImage? "Uploaded photograph" : null}
        height={uploadedImage? 300 : null}
        // width="600"
      />
      <input type="file" id="file" onChange={handleChange}/>

      <span style={progress === 100? {color:"green"}: null}>{progress}%</span>
      <button onClick={handleUpload}>Upload</button>
      <hr/>
      <button onClick={() => props.returnHome()}>Return to prompt</button>
    </React.Fragment>
  );
};

export default NewFormPost;







