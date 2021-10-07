import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
// import styled from 'styled-components';
import { useFirestore } from 'react-redux-firebase';
import {useAuth} from '../contexts/AuthContext';

function Post(props){ 
  const [userLikedPost, setUserLikedPost] = useState(props.currUserLiked);
  const firestore = useFirestore();
  const {currentUser} = useAuth();
  const [postId, setPostId] = useState(props.id);
  const [addedLike, setAddedLike] = useState(null)

  // function whenVoteClicked(id, currScore, vote){
  //   const firestorePostScore = {
  //     score: currScore + vote
  //   }
  //   firestore.update({collection: 'Posts', doc: id}, firestorePostScore );
  // }

  const addUserLike = async () => {
    const addUserPostLike = await firestore.collection('likes').add({
      postId: postId,
      userId: currentUser.uid
    });
    console.log('like added! ' + addUserPostLike.id);
    setAddedLike(addUserPostLike.id)
    setUserLikedPost(true);
  }

  const removeLike = async () => {
    const removeUserPostLike = firestore.collection('likes').where('userId', '==', currentUser.uid).where('postId', '==', postId);

    removeUserPostLike.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.delete();
      })
    })
    setUserLikedPost(false);
  }


  useEffect( async() => {
    if (props.currUserLiked) {
      const getLikeRef = await firestore.collection('likes').where('userId', '==', currentUser.uid).where('postId', '==', postId).get();
      
        if(getLikeRef.empty){
          console.log('no matching docs');
          return;
        }

        getLikeRef.forEach((post) => {
          const data = post.data()
          const likeRef = data.id;
          console.log(likeRef);
      })
    }
  })

  useEffect(() => {
    console.log(postId)
  }, [postId])

  const validateUser = () => {
    if(currentUser){
        if(!userLikedPost){
          console.log('user: ' + currentUser.uid + '  liked!');
          setUserLikedPost(true);
          addUserLike();
        } else {
          console.log('user: ' + currentUser.uid + "  deleting like");
          setUserLikedPost(!userLikedPost);
          removeLike();
        }
    } 
    else {
      console.log('not signed in')
      //open create account div
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
            <p>{props.likes}</p>
          </div>
          <div className="social">
            <i className={userLikedPost ? "bi bi-heart-fill" : "bi bi-heart"} onClick={() => validateUser()}/>
            {/* <i className="bi bi-heart-fill"/> */}
            <i className="bi bi-save2-fill"></i>
          </div>
          </div>
        </div>


        {/* <div onClick = {() => props.whenPostClicked(props.id)}> */}
        {/* <button onClick = {() => whenVoteClicked(props.id, props.score, 1)}>Upvote</button> */}
        {/* <button onClick = {() => whenVoteClicked(props.id, props.score, -1)}>Downvote</button> */}
        {/* <button onClick = {() => props.whenVoteClicked(props.id, 1)}>Upvote in Post</button>  */}
        {/* <button onClick = {() => props.whenVoteClicked(props.id, -1)}>Down vote in Post</button>  */}
      {/* <hr/> */}
    </React.Fragment>
  );
}

// Post.propTypes = {
//   name: PropTypes.string,
//   id: PropTypes.string,
//   whenPostClicked: PropTypes.func
// }; 

export default Post;
