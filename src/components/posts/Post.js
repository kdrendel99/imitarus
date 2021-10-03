import React, {useState} from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { useFirestore } from 'react-redux-firebase';

function Post(props){ 
  const firestore = useFirestore();
  const LeftMarg = styled.section`
  margin-left: 20px;
`;

  // function whenVoteClicked(id, currScore, vote){
  //   const firestorePostScore = {
  //     score: currScore + vote
  //   }
  //   firestore.update({collection: 'Posts', doc: id}, firestorePostScore );
  // }
  return (
    <React.Fragment>
      <LeftMarg>
        {/* <div onClick = {() => props.whenPostClicked(props.id)}> */}
        <div>
          <img src={props.imageRef} height="250"/>
          <h5>@{props.userId} - {props.timestamp}</h5>
          {/* <h4>{props.promptId}</h4> */}
          <h4>{props.score}</h4>

          {/* <h1>{JSON.stringify(props.posts)}</h1> */}
          {/* <h4>{(props.timestamp).toString()}</h4> */}
          {/* <h4>Score: {props.score}</h4> */}
        </div>
        {/* <button onClick = {() => whenVoteClicked(props.id, props.score, 1)}>Upvote</button> */}
        {/* <button onClick = {() => whenVoteClicked(props.id, props.score, -1)}>Downvote</button> */}
        {/* <button onClick = {() => props.whenVoteClicked(props.id, 1)}>Upvote in Post</button>  */}
        {/* <button onClick = {() => props.whenVoteClicked(props.id, -1)}>Down vote in Post</button>  */}
      </LeftMarg>
      <hr/>
    </React.Fragment>
  );
}

// Post.propTypes = {
//   name: PropTypes.string,
//   id: PropTypes.string,
//   whenPostClicked: PropTypes.func
// }; 

export default Post;
