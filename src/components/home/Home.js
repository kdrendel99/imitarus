import React, { useEffect } from "react";
import Prompt from "../prompts/Prompt";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import {useAuth} from '../contexts/AuthContext';
import { useFirestoreConnect, useFirestore, isLoaded } from 'react-redux-firebase'
import { Link, useHistory } from 'react-router-dom'
import './home.css'


function Home(props){
  const firestore = useFirestore();
  const {currentUser} = useAuth();

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

  useEffect(() => {
    if(currentUser !== null){
      console.log('the current user is: ' + currentUser.email);
    }
    else {
      console.log('user not signed in')
    }
  })

  if (isLoaded(prompts)) {
    return (
      <React.Fragment>
      <section id="hero" className="d-flex align-items-center">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">

                <h1>Welcome</h1>
                <h2>An artificial intelligence-driven digital art gallery.</h2>
                <div>
                  <a 
                  className="btn-get-started"
                  ><Link to="/about">About</Link></a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="prompt section-bg">
          <div className="text-center container">
            <div className="section-title">
              <p>Prompts</p>
            </div>
            {prompts.map((prompt) => {
              return <Prompt
                whenPromptClicked = { props.onPromptSelection }
                name={prompt.name}
                timestamp={prompt.timestamp}
                posts={prompt.posts}
                id={prompt.id}
                key={prompt.id}
              />
            })}
          </div>
        </section>
        {/* <button onClick={() => newPrompt()}>New random prompt</button> */}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}

Home.propTypes = {
  onPromptSelection: PropTypes.func
};

export default Home;