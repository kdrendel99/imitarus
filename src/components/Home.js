import React from "react";
import Prompt from "./prompts/Prompt";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, useFirestore, isLoaded } from 'react-redux-firebase'
// import { useFirestore } from 'react-redux-firebase';
import david from '../images/david2.png';



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

        {/* GREY BACKGROUND */}
        <section id="hero" className="d-flex align-items-center">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <h1>Imitarus</h1>
                <h2>An artificial intelligence-driven photo sharing app</h2>
                {/* <div>
                  <a href="#about" className="btn-get-started scrollto">Get Started</a>
                </div> */}
              </div>
              <div className="col-lg-6 order-1 order-lg-2 hero-img">
                <img src="../images/hero-img.svg" className="img-fluid animated" alt=""/>
              </div>
            </div>
          </div>
        </section>

        {/* <section id="hero" className="d-flex align-items-center">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <h1>Imitarus</h1>
                <h2>An artificial intelligence-driven photo sharing app</h2>
                <div>
                  <a href="#about" className="btn-get-started scrollto">Get Started</a>
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 hero-img">
                <img src={david} className="img-fluid animated" alt=""/>
              </div>
            </div>
          </div>
        </section> */}


      <section id="faq" className="faq section-bg">
        <div className="padding">
      <div className="container" data-aos="fade-up">

        {/* <div className="section-title">
          <h2>note</h2>
          <p>Lorem Ipsum</p>
        </div> */}
        {prompts.map((prompt) => {
          return <Prompt
            whenPromptClicked = { props.onPromptSelection }
            // whenVoteClicked = { props.onVoteClick }
            name={prompt.name}
            timestamp={prompt.timestamp}
            posts={prompt.posts}
            id={prompt.id}
            key={prompt.id}/>
        })}

      </div>
      </div>
      </section>
        <button onClick={() => newPrompt()}>New random prompt</button>
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