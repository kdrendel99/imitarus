import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { useFirestore } from 'react-redux-firebase';

function Prompt(props){ 
  const firestore = useFirestore();
  const LeftMarg = styled.section`
  margin-left: 20px;
`;

  // function whenVoteClicked(id, currScore, vote){
  //   const firestorePromptScore = {
  //     score: currScore + vote
  //   }
  //   firestore.update({collection: 'prompts', doc: id}, firestorePromptScore );
  // }
  return (
    <React.Fragment>
      <LeftMarg>
        <div onClick = {() => props.whenPromptClicked(props.id)}>
          <h1>{props.name}</h1>
          {/* <h4>{(props.timestamp).toString()}</h4> */}
          {/* <h4>Score: {props.score}</h4> */}
        </div>
        {/* <button onClick = {() => whenVoteClicked(props.id, props.score, 1)}>Upvote</button> */}
        {/* <button onClick = {() => whenVoteClicked(props.id, props.score, -1)}>Downvote</button> */}
        {/* <button onClick = {() => props.whenVoteClicked(props.id, 1)}>Upvote in Prompt</button>  */}
        {/* <button onClick = {() => props.whenVoteClicked(props.id, -1)}>Down vote in prompt</button>  */}
      </LeftMarg>
      <hr/>
    </React.Fragment>
  );
}

// Prompt.propTypes = {
//   name: PropTypes.string,
//   id: PropTypes.string,
//   whenPromptClicked: PropTypes.func
// }; 

export default Prompt;
