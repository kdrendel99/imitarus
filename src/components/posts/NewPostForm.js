import React, { useEffect, useState } from "react";
import firebase from '../../firebase';
import 'firebase/firestore';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
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



  useEffect(() => {
    addPostToPostCollection();
  }, [downloadUrl])

  const handleChange = e => {
    if (e.target.files[0]){
      setUploadedImage(e.target.files[0])
    }
  }

  const addPostToPostCollection = () => {
    if (currentUser !== null){
      const userName = currentUser.email.split('@');
      if(downloadUrl === null){
        console.log('image invalid')
        return;
      }
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
    // setFinished(false)

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
    <form onSubmit={handleUpload}>
      <div className="container-fluid new-post-form">
        <div className="row justify-content-center">
        <div className="col main g-0">
          <div className="row-fluid upload justify-content-center">
            <img
              className="ref"
              src={uploadedImage? URL.createObjectURL(uploadedImage) : null}
              alt={uploadedImage? "Uploaded photograph" : null}
              height={uploadedImage? 300 : null}
            />
            <div className="container-fluid card px-3">
              <div className="row">
                <div className="col">
                  <h1 className="prompt_heading px-3">"{prompt.name}"</h1>
                  <div className="row justify-content-around">

                    <div className="col-sm-3">
                      <button onClick={() => props.returnHome()} type="button"  className="backtoprompt">Back</button>
                    </div>

                    <div className="col-sm-3 py-5">
                      <label htmlFor="file" className="fileupload" >
                          Upload
                      </label>
                      <input id="file" type="file" style={{visibility:"hidden"}}onChange={handleChange}/>
                    </div>
                    
                    <div className="col-sm-3">
                      <button type="submit" className="share">Share</button>
                    </div>
                        
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </form>
    </React.Fragment>
  );
};

export default NewFormPost;









