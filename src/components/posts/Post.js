import React, {useEffect, useState} from "react";
import {useAuth} from '../contexts/AuthContext';
import { withFirestore, useFirestore } from 'react-redux-firebase'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './post.css'

function Post(props){ 
  const firestore = useFirestore();
  const {currentUser} = useAuth();
  const [postId] = useState(props.id);
  const [likeTotal, setLikeTotal] = useState(props.likes);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false)
  const [like, setLike] = useState()
  const [likeId, setLikedId] = useState();
  const [timestamp, setTimestamp] = useState('');

  if(currentUser !== null){
    const observer = firestore.collection('likes').where('userId', '==', currentUser.uid)
    .onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const newLike = change.doc.data().postId;
          if(newLike === postId){
            setLike(true)
          }
        }
        if (change.type === 'removed') {
          const newLike = change.doc.data().postId;
          if(newLike === postId){
            setLike(false)
          }
        }
      });
    });
  }

  const updateLike = async() => {
    const postRef = firestore.collection('posts').doc(postId)
    const likeExists = firestore.collection('likes').doc(`${postId + currentUser.uid}`);
    likeExists.get().then((doc) => {
      if (doc.exists){

        const res = firestore.collection('likes').doc(`${postId + currentUser.uid}`).delete()

        postRef.update(
          'likes', firestore.FieldValue.increment(-1)
        ).then(() => {
          return postRef.get();
        }).then(doc => {
          setLikeTotal(doc.get('likes'))
          setIsLoading(false)
        });
      } else {
        const data = {
          postId: postId,
          userId: currentUser.uid,
        }
        const res = firestore.collection('likes').doc(`${postId + currentUser.uid}`).set(data);

        postRef.update(
          'likes', firestore.FieldValue.increment(1)
        ).then(() => {
          return postRef.get();
        }).then(doc => {
          setLikeTotal(doc.get('likes'))
          setIsLoading(false)
        });
      }
    })
  }



  const handleClickLike = () => {
    setIsLoading(true)
    if (currentUser !== null){
        updateLike();
      } else {
        setIsLoading(false)
        history.push("/signup")
      }
    }     
    
    useEffect(() => {
      const parsedTimestamp = props.timestamp.split('G');
      setTimestamp(parsedTimestamp[0]);
    })


    return (
      <React.Fragment>
          <div className="post">
            <img src={props.imageRef} className="img img-responsive" 
            alt=""/>
            <div className="post-info">
            <div className="post-info-content">
              {/* <h3>{postId}</h3> */}
              <h4>@{props.userId}</h4>
              <span>{timestamp}</span>
              <p>{likeTotal} <i className="bi bi-heart-fill"/></p>
            </div>
            <div className="social">
              <i className={like ? "bi bi-heart-fill" : "bi bi-heart"}
              onClick={() => handleClickLike()}
              />
              {/* <i className="bi bi-save2-fill"></i> */}
            </div>
            </div>
          </div>
      </React.Fragment>
    );
}

const mapStateToProps = state => {
  return {
    userLikes: state.userLikes.userLikes,
  }
}

Post = connect(mapStateToProps)(Post);

export default withFirestore(Post);
