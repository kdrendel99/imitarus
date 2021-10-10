import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useAuth} from '../contexts/AuthContext';
import { withFirestore, useFirestore } from 'react-redux-firebase'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as c from '../../actions/ActionTypes';

function Post(props){ 
  const firestore = useFirestore();
  const {currentUser} = useAuth();
  const [postId] = useState(props.id);
  const [userLikedPost, setUserLikedPost] = useState(false);
  const [likeTotal, setLikeTotal] = useState(props.likes);
  // const [staticLikeIncrease, setStaticLikeIncrease] = useState(false);
  const history = useHistory();

  // const [userLikeId, setUserLikeId] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [like, setLike] = useState(false)
  const [likeId, setLikedId] = useState();



  // useEffect(() => {
  //   // console.log(props.userLikes)
  //   if(props.userLikes === null || props.userLikes === undefined){
  //     // console.log('returned')
  //     return;
  //   } else {
  //     // console.log('tried comparison')
  //       if(props.userLikes.includes(postId)){
  //         // handleAddingLike(postId);
  //         console.log('')
  //       } else {
  //         return;
  //       }
  //     }
  // })

  // useEffect(() => {
  //   console.log(userLikedPost)
  // },[userLikedPost])


  // const newLike = async() => {
  //   // console.log('youre all signed in!')
  //   // console.log(props.id + " = post id, and user Id = " + currentUser.uid)
  //   //adds like to like collection
  //   firestore.collection('likes').add(
  //     {
  //       postId: postId,
  //       userId: currentUser.uid,
  //     }
  //   ).then(function(newLike) {
  //     // console.log("Like doc ID: ", newLike.id);
  //     setUserLikeId(newLike.id)
  //   })
  //   .catch(function(error) {
  //       // console.error("Error adding document: ", error);
  //   });


  // const handleAddingLike = (id) => {
  //   const { dispatch } = this.props;
  //   const action = {
  //     type: c.ADD_USER_LIKE,
  //     id: id,
  //   }
  //   dispatch(action);
  // };


  // const handleRemovingLike = (id) => {
  //   const { dispatch } = this.props;
  //   const action = {
  //     type: c.REMOVE_USER_LIKE,
  //     id: id
  //   }
  //   dispatch(action);
  // }


  const observer = firestore.collection('likes').where('userId', '==', currentUser.uid)
  .onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        // console.log('New like: ', change.doc.data().postId);
        const newLike = change.doc.data().postId;
        if(newLike === postId){
          setLike(true)
        }
      }
      if (change.type === 'removed') {
        // console.log('Removed like: ', change.doc.data());
        const newLike = change.doc.data().postId;
        if(newLike === postId){
          setLike(false)
        }
      }
    });
  });

  useEffect(() => {
    console.log('IT WORKED: ' + like)
  }, [like])

  useEffect(() => {
    console.log('new like id ' + likeId)
  }, [likeId])



  const addLike = async(value) => {
      // handleAddingLike(postId)
      const data = {
        postId: postId,
        userId: currentUser.uid,
      }

      const res = await firestore.collection('likes').doc(`${postId + currentUser.uid}`).set(data);

    const postRef = firestore.collection('posts').doc(postId);
    // postRef.update({ likes: FieldValue.increment(value)});
    postRef.update(
      'likes', firestore.FieldValue.increment(value)
    ).then(() => {
      return postRef.get();
    }).then(doc => {
      setLikeTotal(doc.get('likes'))
      setUserLikedPost(true);
      setIsLoading(false)
    });
  }

  const removeLike = async(value) => {
      // handleRemovingLike(postId)
      const res = await firestore.collection('likes').doc(`${postId + currentUser.uid}`).delete()
  }


  // const handleClickLike = () => {
  //   setIsLoading(true)
  //   if (currentUser !== null){
  //       if(userLikedPost === false){
  //         //handle like here
  //         updateLike(1)
  //       } else if (userLikedPost === true){
  //         updateLike(-1)
  //       }
  //     } else {
  //       setIsLoading(false)
  //       history.push("/")
  //     }
  //   }     
    



    const handleClickLike = () => {
          addLike(1)
    } 

    const handleClickUnlike = () => {
      removeLike(-1)
    }










    return (
      <React.Fragment>
        {console.log('rendered')}
          <div className="member">
            <img src={props.imageRef} className="img img-responsive" 
            alt=""/>
            <div className="member-info">
            <div className="member-info-content">
              <h3>{postId}</h3>
              <h4>@{props.userId}</h4>
              <span>{props.timestamp}</span>
              <p>{likeTotal} <i className="bi bi-heart-fill"/></p>
            </div>
            <div className="social">
              <i className={like ? "bi bi-heart-fill" : "bi bi-heart"} disable={isLoading}
              onClick={() => handleClickLike()}
              />
              <i className={like ? "bi bi-heart-fill" : "bi bi-heart"} onClick={() => handleClickUnlike()}></i>
            </div>
            </div>
          </div>
      </React.Fragment>
    );
}

const mapStateToProps = state => {
  return {
    userLikes: state.userLikes.userLikes,
    localLikes: state.localLikes.localLikes
  }
}

Post = connect(mapStateToProps)(Post);

export default withFirestore(Post);
