import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import thinking from '../../images/thinking.png';
import './about.css'

function About(){
    return (
      <React.Fragment>
        <section id="about">
          <div className="container abt_main">
            <div className="row g-0" >
              <div className="col-lg-6 about order-2 order-lg-1 d-flex flex-column px-5">
                <div className="about_title">
                  <a><Link to="/">Return home</Link></a>
                  <h1>About</h1>
                </div>
                <p>Welcome to Imitarus, an art gallery and photo sharing app for creators.</p>

                <p>This application uses artificial intelligence seeded with hundreds of thousands of poems, song lyrics, haikus, and stories to generate dynamic weekly prompts available to all users. 
                </p>

                <p>
                The weekly generated text prompts serve as a template for our community to make photo submissions that they feel connect with the prompt in any magnitude. Because each prompt is only available for users to view and submit for a 14-day period, our users aren't bound indefinitely to their worst or best creations, but rather are released to a fresh start bimonthly. All prompts are removed from the database after this 2 week period in an effort to create an environment focused on self-improvement instead of comparison. This allows our users to embark in the creative process, removed from the weighty ties of peer-judgement. We believe that visual art should be taken at face value, appreciated, then surrendered to the wind.
                </p>

                <p>Imitarus' minimalistic take on social media stems from our desire to encourage you to spend your time <em>outside</em> of the app, and instead capturing all that the world has to offer.
                </p>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 d-none d-lg-block justify-items-center">
                <img src={thinking} className="img-fluid about_img"/>
              </div>
            </div>
          </div>
        </section>

      </React.Fragment>
    );
}

About.propTypes = {
  onPromptSelection: PropTypes.func
};

export default About;