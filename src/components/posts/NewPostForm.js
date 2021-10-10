import React, { useEffect, useState } from "react";
import firebase from '../../firebase';
import 'firebase/firestore';
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
// import placeholder from '../../images/upload-placeholder.jpeg';

function NewFormPost(props){
  const firestore = useFirestore();
  const { currentUser } = useAuth();
  const history = useHistory();

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
    if (currentUser !== null){
      const userName = currentUser.email.split('@');
      console.log(userName[0])
    } else {
      console.log('you need to sign in')
    }
  })

  const handleChange = e => {
    if (e.target.files[0]){
      setUploadedImage(e.target.files[0])
    }
  }

  const addPostToPostCollection = () => {
    if (currentUser !== null){
      const userName = currentUser.email.split('@');
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

  useEffect(() => {
    if(downloadUrl !== null)
      history.push("/")
  })

  return (
    <React.Fragment>
    {/* <span style={progress === 100? {color:"green"}: null}>{progress}%</span>  */}
    <form onSubmit={handleUpload}>
      <div className="container-fluid new_post_form">
        <div className="row justify-content-center">
        <div className="col test g-0">
          <div className="row-fluid james justify-content-center">
            <img
              className="ref"
              src={uploadedImage? URL.createObjectURL(uploadedImage) : null}
              alt={uploadedImage? "Uploaded photograph" : null}
              height={uploadedImage? 300 : null}
            />
            <div className="container-fluid card px-3">
              <div className="row">
                <div className="col poptarts">
                  <h1 className="prompt_heading px-3">"{prompt.name}"</h1>
                  <div className="row justify-content-around">

                    <div className="col-sm-3">
                      <button onClick={() => props.returnHome()} type="button" className="backtoprompt">Back</button>
                    </div>

                    <div className="col-sm-3 py-5">
                      <label htmlFor="file" className="fileupload">
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

{/* <div className="form-row">
<div className="col">
  <button type="button" className="login-button">Login</button>
</div>
<div className="form-row">
  <div className="col">
    <button type="button" className="login-button">Login</button>
  </div>
</div> */}

export default NewFormPost;









