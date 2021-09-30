import React, { useEffect } from "react";
import Prompt from "./Prompt";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useFirestore } from 'react-redux-firebase';


function Home(props){
  // const { prompt } = props;
  const firestore = useFirestore();

  useFirestoreConnect([
    { collection: 'prompts' }
  ]);

  const prompts = useSelector(state => state.firestore.ordered.prompts);

  const newPrompt = () => {
    var things = ["An image of a plane in the sky", "An image of a man in front of a house", "An image of a boy with a balloon"];
    var thing = things[Math.floor(Math.random()*things.length)];
  
        firestore.collection('prompts').add(
        {
          name: thing,
          timestamp: firestore.FieldValue.serverTimestamp()
        }
      )
  }

  if (isLoaded(prompts)) {
    return (
      <React.Fragment>
        <h4>HOME</h4>
        {/* <hr/> */}
        {prompts.map((prompt) => {
          return <Prompt
            whenPromptClicked = { props.onPromptSelection }
            // whenVoteClicked = { props.onVoteClick }
            name={prompt.name}
            timestamp={prompt.timestamp}
            id={prompt.id}
            key={prompt.id}/>
        })}
        <button onClick={() => newPrompt()}>New random prompt</button>
      </React.Fragment>
    );
  // If the prompts aren't loaded yet, our fragment will return a "Loading..." message.
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}
//
Home.propTypes = {
  onPromptSelection: PropTypes.func
};

export default Home;