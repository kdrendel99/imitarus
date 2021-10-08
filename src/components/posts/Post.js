import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
// import styled from 'styled-components';
import {useAuth} from '../contexts/AuthContext';
import { withFirestore, useFirestore } from 'react-redux-firebase'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Post(props){ 
  const firestore = useFirestore();
  const {currentUser} = useAuth();
  const [postId] = useState(props.id);
  const { userLikes } = props;
  const [likedPosts] = useState(userLikes)
  const [userLikedPost, setUserLikedPost] = useState();
  const [userLikeId, setUserLikeId] = useState();
  const [currentLikes, setCurrentLikes] = useState(props.likes)

  useEffect(() => {
    console.log(likedPosts)
      if (userLikes !== null && userLikes.includes(postId)){
        setUserLikedPost(true);
      }
    else {
      setUserLikedPost(false);
    }
  },)

    // const postRef = firestore.collection('posts').doc(postId);
    // const likesRef = firestore.collection('likes');
    // try {
    //   const res = await firestore.runTransaction(async t => {
    //     const doc = await t.get(postRef);
    //     const newLikesTotal = doc.data().likes + 1;
    //     await t.update(postRef, { likes: newLikesTotal });
    //     return newLikesTotal;
    //   });
    //   console.log('it worked!', res);
    // } catch(e){
    //   console.log('it didnt.' + e)
    // }

  // useEffect(() => {
  //   console.log('getting user likes ' + likedPosts)
  // }, [likedPosts])

  const newLike = async() => {
    firestore.collection('likes').add(
      {
        postId: postId,
        userId: currentUser.uid,
      }
    ).then(function(newLike) {
      console.log("Like doc ID: ", newLike.id);
      setUserLikeId(newLike.id)
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    // setUserLikedPost(true);
    const postRef = firestore.collection('posts').doc(postId)
    try {
      const res = await firestore.runTransaction(async t => {
        const doc = await t.get(postRef);
        const newTotal = doc.data().likes + 1;
          await t.update(postRef, { likes: newTotal });
          return newTotal;
      });
      setCurrentLikes(res);
    } catch (e) {
      console.log('Transaction failure:', e);
    }
  }

  // const onLikePost = () => {
  //   firestore.collection('likes').add(
  //     {
  //       postId: postId,
  //       userId: currentUser.uid,
  //     }
  //   ).then(function(newLike) {
  //     console.log("Like doc ID: ", newLike.id);
  //     setUserLikeId(newLike.id)
  //   })
  //   .catch(function(error) {
  //       console.error("Error adding document: ", error);
  //   });
  //   setUserLikedPost(true);
  // }

  const onRemoveLikePost = () => {
    const deleteLikeQuery = firestore.collection('likes').where('postId', '==', 'postId').where('userId', '==', currentUser.uid);
    deleteLikeQuery.get().then(function(snapshot) {
      snapshot.forEach(function(doc){
        doc.ref.delete()
      })
      setUserLikedPost(false)
    })
    .catch(function(error) {
      console.error("Error deleting like: ", error);
  });
  }

  const checkForLikeExistence = async() => {
    const likeQuery = await firestore.collection('likes').where('postId', '==', 'postId').where('userId', '==', currentUser.uid).get();
    if (likeQuery.empty){
      console.log('like doesnt exist')
      return false
    } else {
      console.log('like exists already')
      return true
    }
  }



  const handleClickLike = () => {
    if (currentUser !== null){
      //handle like here
      console.log('youre all signed in!')
      console.log(props.id + " = post id, and user Id = " + currentUser.uid)
      newLike();
      setUserLikedPost(true);
      // if(userLikedPost === true){
      //   onRemoveLikePost()
      // } else {
      //   onLikePost()
      // }
    } else {
      alert('You need to be signed in to interact in the galleries.')
      console.log(currentUser);
    }
  }


  return (
    <React.Fragment>
      {/* onClick = {() => props.whenPostClicked(props.id)} */}
        <div className="member">
          <img src={props.imageRef} className="img img-responsive" 
          alt=""/>
          <div className="member-info">
          <div className="member-info-content">
            <h4>@{props.userId}</h4>
            <span>{props.timestamp}</span>
            <p>{currentLikes}</p>
          </div>
          <div className="social">
            <i className={userLikedPost ? "bi bi-heart-fill" : "bi bi-heart"} 
            onClick={() => handleClickLike()}
            />
            <i className="bi bi-save2-fill"></i>
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
