import React, {useState} from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { useFirestore } from 'react-redux-firebase';

function Prompt(props){ 
  const firestore = useFirestore();
  const [jsonified, setJsonified] = useState(null);

  // function whenVoteClicked(id, currScore, vote){
  //   const firestorePromptScore = {
  //     score: currScore + vote
  //   }
  //   firestore.update({collection: 'prompts', doc: id}, firestorePromptScore );
  // }
  
  return (
    <React.Fragment>
      <ul className="faq-list" data-aos="fade-up" data-aos-delay="100">
        <li>
          <div data-bs-toggle="collapse" className="collapsed question" href="#faq1" onClick = {() => props.whenPromptClicked(props.id)}>
            {props.name}
          </div>
          {/* <div id="faq1" className="collapse" data-bs-parent=".faq-list">
          </div> */}
        </li>
      </ul>
        {/* <button onClick = {() => whenVoteClicked(props.id, props.score, 1)}>Upvote</button> */}
        {/* <button onClick = {() => whenVoteClicked(props.id, props.score, -1)}>Downvote</button> */}
        {/* <button onClick = {() => props.whenVoteClicked(props.id, 1)}>Upvote in Prompt</button>  */}
        {/* <button onClick = {() => props.whenVoteClicked(props.id, -1)}>Down vote in prompt</button>  */}
    </React.Fragment>
  );
}

// Prompt.propTypes = {
//   name: PropTypes.string,
//   id: PropTypes.string,
//   whenPromptClicked: PropTypes.func
// }; 

export default Prompt;
