import React, { useEffect, useState } from "react";
import firebase from '../../firebase';
import 'firebase/firestore';
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import { useAuth } from '../contexts/AuthContext';
// import placeholder from '../../images/upload-placeholder.jpeg';

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

  // <h4>Upload a new photo to this prompt</h4>
  // <form onSubmit={handleUpload}>
  // {/* <form onSubmit={addPostToPostCollection}> */}
  //   <img
  //     className="ref"
  //     src={uploadedImage? URL.createObjectURL(uploadedImage) : null}
  //     alt={uploadedImage? "Uploaded photograph" : null}
  //     height={uploadedImage? 300 : null}
  //   />
  //   <input type="file" id="file" onChange={handleChange}/>
  //   {/* {downloadUrl?downloadUrl.toString(): ""} */}
  //   <span style={progress === 100? {color:"green"}: null}>{progress}%</span>
  //   <button type="submit">Upload</button>
  //   {/* <input type="text" name="authorId" defaultValue="author1" placeholder="Your name"/> */}
  //   <hr/>
  //   <button onClick={() => props.returnHome()}>Return to prompt</button>
  // </form>
  // </div>

  // <div className="new_post_form">
  //         <div className="container col1 d-flex align-items-center justify-content-center">
  //           <div className="row thumbnail">
  //             {/* thumbnail  */}
  //             <div className="col-lg-10 card g-0">
  //               <img src={squareman} className="img-fluid" alt=""/>
  //             <div className="row upload_form">
  //               {/* <div className="col card g-0"> */}
  //             {/* form */}
  //             {/* <div className="col card"> */}
                
  //               <div className="container-fluid formcontainer">
  //               <h1 className="font-weight-bold py-3">Login</h1>
  //               <h4>Sign into your account</h4>
  //               <form>
  //                 <div className="form-row">
  //                   <div className="col">
  //                     <input type="email" placeholder="Email" className="form-control my-3 p-2"/>
  //                   </div>
  //                 </div>
  //                 <div className="form-row">
  //                   <div className="col">
  //                     <input type="password" placeholder="******" className="form-control my-3 p-2"/>
  //                   </div>
  //                   <div className="form-row">
  //                     <div className="col">
  //                       <button type="button" className="login-button">Login</button>
  //                     </div>
  //                   </div>
  //                   <div className="form-row">
  //                     <div className="col login-help mt-3 mb-5">
  //                     </div>
  //                   </div>
  //                 </div>
  //               </form>
  //             </div>
  //             </div>
  //             </div>
  //           </div>
  //         </div>


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
                      {/* <label for="file-upload" className="fileupload">
                      <input type="file" style={{visibility:"hidden"}}onChange={handleChange}/>
                      </label> */}
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









