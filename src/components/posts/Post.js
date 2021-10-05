import React, {useState} from "react";
import PropTypes from "prop-types";
// import styled from 'styled-components';
import { useFirestore } from 'react-redux-firebase';

function Post(props){ 
  const firestore = useFirestore();

  // function whenVoteClicked(id, currScore, vote){
  //   const firestorePostScore = {
  //     score: currScore + vote
  //   }
  //   firestore.update({collection: 'Posts', doc: id}, firestorePostScore );
  // }
  return (
    <React.Fragment>
      {/* onClick = {() => props.whenPostClicked(props.id)} */}
        <div className="member">
          <img src={props.imageRef} className="img img-responsive" 
          onClick={() => props.handleUserLikedPhoto()}
          alt=""/>
          {/* <img src={props.imageRef} className="img-fluid" alt=""/> */}
          <div className="member-info">
          <div className="member-info-content">
            <h4>@{props.userId}</h4>
            <span>{props.timestamp}</span>
            <p>score: {props.score}</p>
          </div>
          <div className="social">
            <a href=""><i className="bi bi-heart" aria-hidden="true"/></a>
            <a href=""><i className="bi bi-heart-fill" aria-hidden="true"/></a>
            <a href=""><i class="bi bi-save2-fill"></i></a>
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
