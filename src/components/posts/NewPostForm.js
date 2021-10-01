import React, { useState } from "react";
import firebase from '../../firebase';

const NewFormPost = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = e => {
    if (e.target.files[0]){
      setUploadedImage(e.target.files[0])
    }
  }

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
        })
        document.getElementById('file').value = null
      }
    )
  }

  return (
    <React.Fragment>
      <h4>Upload a new post</h4>
      <label>
        Choose file
        <input type="file" id="file" onChange={handleChange}/>
      </label>

      {progress}
      <button onClick={handleUpload}>Upload</button>
      <img
        className="ref"
        src={{downloadUrl} || "https://via.placeholder.com/400/300"}
        alt="Uploaded image"
        height="300"
        width="400"
      />
    </React.Fragment>
    // <div>
    //   <h1>Upload a new post</h1>
    //   {uploadedImage && (
    //     <div>
    //     <img alt="not fount" width={"250px"} src={URL.createObjectURL(uploadedImage)} />
    //     <br />
    //     <button onClick={()=>setUploadedImage(null)}>Remove</button>
    //     </div>
    //   )}
    //   <form>
    //   <input
    //     type="file"
    //     name="myImage"
    //     onChange={(event) => {
    //       setUploadedImage(event.target.files[0]);
    //     }}
    //   />
    //   </form>
    // </div>
  );
};

export default NewFormPost;







