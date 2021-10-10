import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
// import styled from 'styled-components';
import {useAuth} from '../contexts/AuthContext';
import { withFirestore, useFirestore, useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { connect } from 'react-redux';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

function Post(props){ 
  const firestore = useFirestore();
  const {currentUser} = useAuth();
  const [postId] = useState(props.id);
  // const { userLikes } = props;
  const [likedPosts] = useState(props.userLikes)
  const [userLikedPost, setUserLikedPost] = useState(false);
  const [userLikeId, setUserLikeId] = useState();


  // useFirestoreConnect([
  //   { collection: 'likes' } 
  // ])
  // const likes = useSelector(state => state.firestore.ordered.likes)

  useEffect(() => {
    console.log(likedPosts)
    if(likedPosts === null || likedPosts === undefined){
      return;
    } else {
        if(likedPosts.includes(postId)){
          setUserLikedPost(true);
        } else {
          return;
        }
      }
  }, [likedPosts])


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
      // setCurrentLikes(res);
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

  // if (isLoaded(likes)){
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
              {/* <p>{currentLikes}</p> */}
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
  // } else {
  //   return (
  //     <React.Fragment>
  //       <h3>Loading...</h3>
  //     </React.Fragment>
  //   )
  // }
}

const mapStateToProps = state => {
  return {
    userLikes: state.userLikes.userLikes,
  }
}

Post = connect(mapStateToProps)(Post);

export default withFirestore(Post);
