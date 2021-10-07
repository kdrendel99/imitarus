import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
// import styled from 'styled-components';
import { useFirestore } from 'react-redux-firebase';
// import useLikePost from "./useLikePost";
import {useAuth} from '../contexts/AuthContext';

function Post(props){ 
  const [userLikedPost, setUserLikedPost] = useState(false);
  const firestore = useFirestore();
  const {currentUser} = useAuth();
  // const postRef = firestore.collection('posts').doc(selectedPrompt)

  // function whenVoteClicked(id, currScore, vote){
  //   const firestorePostScore = {
  //     score: currScore + vote
  //   }
  //   firestore.update({collection: 'Posts', doc: id}, firestorePostScore );
  // }

  // useEffect(() => {

  // })

  const validateUser = () => {
    if(currentUser){
      console.log('user: ' + currentUser.uid);
      setUserLikedPost(!userLikedPost);
    } 
    else {
      console.log('not signed in')
      //open create account div
    }
  }
  return (
    <React.Fragment>
      {console.log(props.id)}
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
            <i class="bi bi-save2-fill"></i>
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
