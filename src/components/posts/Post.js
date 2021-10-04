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

      {/* <div className="col-xl-3 col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="100"> */}
            <div className="member">
              <img src={props.imageRef} className="img img-responsive" alt=""/>
              <div className="member-info">
                <div className="member-info-content">
                  <h4>@{props.userId}</h4>
                  <span>{props.timestamp}</span>
                  <p>score: {props.score}</p>
                </div>
              </div>
            </div>







          {/* </div> */}
        {/* <div className="col-lg-4">
          <div className="image-wrap-2">
            <div className="image-info">
              <h2 className="mb-3">{props.timestamp}</h2>
              <a href="single.html" className="btn btn-outline-white py-2 px-4">@{props.timestamp}</a>
              <p>score: {props.score}</p>
              <i class="icon-heart-o" aria-hidden="true"/>
            </div>
            <img src={props.imageRef} alt="Image" className="img-fluid"/>
          </div>
        </div> */}





        {/* <div onClick = {() => props.whenPostClicked(props.id)}> */}
        {/* <div> */}
          {/* <img src={props.imageRef} height="250"/> */}
          {/* <h5>@{props.userId} - {props.timestamp}</h5> */}
          {/* <h4>{props.promptId}</h4> */}
          {/* <h4>{props.score}</h4> */}

          {/* <h1>{JSON.stringify(props.posts)}</h1> */}
          {/* <h4>{(props.timestamp).toString()}</h4> */}
          {/* <h4>Score: {props.score}</h4> */}
        {/* </div> */}
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
