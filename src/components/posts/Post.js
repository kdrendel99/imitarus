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
  const [postId ] = useState(props.id);
  const { userLikes } = props;
  const [likedPosts] = useState(userLikes)
  const [userLikedPost, setUserLikedPost] = useState(false);

  useEffect(() => {
    if (likedPosts.includes(postId)){
      setUserLikedPost(true);
    }
  },[likedPosts])


  // useEffect(() => {
  //   console.log('getting user likes ' + likedPosts)
  // }, [likedPosts])

  const handleClickLike = () => {
    if (currentUser !== null){
      //handle like here
      console.log('youre all signed in!')
      console.log(props.id + " = post id, and user Id = " + currentUser.uid)
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
            <p>{props.likes}</p>
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
