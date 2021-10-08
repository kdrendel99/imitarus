import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
// import styled from 'styled-components';
import {useAuth} from '../contexts/AuthContext';
import { withFirestore, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import * as c from '../../actions/ActionTypes';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Post(props){ 
  const firestore = useFirestore();
  const {currentUser} = useAuth();
  const [postId, setPostId] = useState(props.id);
  const { userLikes } = props;
  const [likedPosts, setLikedPosts] = useState(userLikes)
  const [userLikedPost, setUserLikedPost] = useState(false);

  useEffect(() => {
    if (likedPosts.includes(postId)){
      setUserLikedPost(true);
    }
  },[likedPosts])


  useEffect(() => {
    console.log('getting user likes ' + likedPosts)
  }, [likedPosts])

  // useEffect( async() => {
  //   if (props.currUserLiked) {
  //     const getLikeRef = await firestore.collection('likes').where('userId', '==', currentUser.uid).where('postId', '==', postId).get();
      
  //       if(getLikeRef.empty){
  //         console.log('no matching docs');
  //         return;
  //       }

  //       getLikeRef.forEach((post) => {
  //         const data = post.data()
  //         const likeRef = data.id;
  //         console.log(likeRef);
  //     })
  //   }
  // })

  // useEffect(() => {
  //   console.log(postId)
  // }, [postId])

  // const validateUser = () => {
  //   if(currentUser){
  //       if(!userLikedPost){
  //         console.log('user: ' + currentUser.uid + '  liked!');
  //         setUserLikedPost(true);
  //         addUserLike();
  //       } else {
  //         console.log('user: ' + currentUser.uid + "  deleting like");
  //         setUserLikedPost(!userLikedPost);
  //         removeLike();
  //       }
  //   } 
  //   else {
  //     console.log('not signed in')
  //     history.push("/signup");
  //   }
  // }


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
            onClick={() => console.log(props.id + " = post id, and user Id = " + currentUser.uid)}
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
