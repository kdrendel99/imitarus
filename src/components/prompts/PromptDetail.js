import React, { useState, useEffect, useRef } from "react";
import Post from './../posts/Post'
import SignIn from "../users/SignIn";
import PropTypes from "prop-types";
import 'firebase/firestore';
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import {useAuth} from '../contexts/AuthContext';
// import useLikePost from "../posts/useLikePost";
// import * as firebase from 'firebase';
// import firebase from '../../firebase';


import Masonry from "react-masonry-css";

import runAnimations from './../../helper';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';


function PromptDetail(props){
  const isotope = React.useRef()
  const firestore = useFirestore();
  const { prompt, onClickingDelete, onClickingNewPost } = props;
  const {currentUser} = useAuth();

  const [selectedPrompt, setSelectedPrompt] = useState({...prompt});
  const [currPromptId, setCurrPromptId] = useState(prompt.id);
  const [promptPosts, setPromptPosts] = useState([]);
  const [userLikes, setUserLikes] = useState([]);


  // useEffect(() => {
  //   // if (prompt !== null){
  //   setSelectedPrompt([prompt]);
  //   // getPostList();
  // },[prompt]);


  useEffect(() => {
    async function getAll(){
      const postArr = [];
      const postsRef = firestore.collection('posts');

      const snapshot = await postsRef.where('promptId', '==', currPromptId).get();
      
      if(snapshot.empty){
        console.log('no matching docs');
        return;
      }
      snapshot.forEach((post) => {
        const data = post.data()
        const postObj = {
          imageRef: data.imageRef,
          promptId: data.promptId,
          likes: data.likes,
          timestamp: data.timestamp.toDate().toString(),
          userId: data.userId,
          postId: post.id
        }
        postArr.push(postObj);
      })
      setPromptPosts(postArr);
      // console.log(promptPosts);
      }
    getAll();
  }, [currPromptId])

  useEffect(() => {
    console.log('1')
    if(!currentUser){
      console.log('not signed in')
    } 
    else {
      console.log('2');
      async function getUserLikes(){
        const likesArr = [];
        const snapshot = await firestore.collection('likes').where('postId', 'in', [promptPosts]).get();
  
        // const snapshot = await likesRef.where('postId', 'in', [promptPosts]).where('userId', '==', currentUser.uid).get();

        
        if(snapshot.empty){
          console.log('no matching docs');
          return;
        }
        snapshot.forEach((post) => {
          const data = post.data()
          const postObj = data.postId;
          // {
          //   imageRef: data.imageRef,
          //   promptId: data.promptId,
          //   likes: data.likes,
          //   timestamp: data.timestamp.toDate().toString(),
          //   userId: data.userId,
          //   postId: post.id
          // }
          likesArr.push(postObj);
        })
        // setPromptPosts(postArr);
        console.log(likesArr);
        }
      getUserLikes();






















      // getUserLikesInPrompt()
      // const test = async () => {
      //   console.log('user is signed in!')
      //   const userLikesArr = await firestore.collection('likes').where('postId', 'in', [promptPosts]).where('userId', '==', currentUser.uid).get();
      //     console.log('the user likes these posts: ' + userLikesArr)
      // }
      // test()

      
      // .then(() => {
      //   setUserLikes(userLikesArr)
        // console.log('the user likes these posts: ' + userLikesArr)
      // })
    }
  }, [promptPosts])





    const useFocus = () => {
      const containerRef = useRef(null)
      const setFocus = () => {containerRef.current && containerRef.current.focus()}
      
      return [ containerRef, setFocus ]
    }
  
    const [containerLoaded, setContainerLoaded] = useFocus();

    // initialize an Isotope object with configs

    useEffect(() => {
        runAnimations();
        let currentlyLoadedContainer = `${containerLoaded.current.className}`;
        currentlyLoadedContainer = '.' + currentlyLoadedContainer.substring(4);
    
        imagesLoaded(currentlyLoadedContainer, function(){
          isotope.current = new Isotope(currentlyLoadedContainer, {
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows',
          });
          })
  
        // cleanup
        // return () => isotope.current.destroy()
      }, [])


    const breakpoints = {
      // default: 3,
      // 1100: 2,
      // 700: 1
      350: 1,
      750: 2,
      900: 3
    }
  return (
    <React.Fragment>
      <section id="team" class="team">
        <div className="padding"/>
        <div className="container" 
          ref={containerLoaded} onLoad={setContainerLoaded}
          >
          <div class="prompt-details-heading" data-aos="fade-up">
          <h2>{prompt.name}</h2>
          <p>{prompt.timestamp}</p>
          </div>
          {/* <button onClick={() => logUser()}>check user</button> */}
          <div className="row">
            <Masonry
              breakpointsCols={breakpoints}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
              >

              {promptPosts.map((post) =>
                <Post
                  // whenPostClicked = { props.onPostSelection }
                  imageRef = {post.imageRef}
                  promptId = {post.promptId}
                  likes = {post.likes}
                  timestamp = {post.timestamp}
                  userId = {post.userId}
                  id={post.postId}
                  key={post.postId}
                  currUserLiked={[userLikes].includes(post.postId)}
                />
              )}
            </Masonry>
          </div>
        </div>
      </section>

    <button onClick={() => onClickingNewPost()}>Upload new post</button>

    <button onClick={ props.onClickingEdit }>Update Prompt</button>
    <button onClick={()=> onClickingDelete(prompt.id) }>Delete Prompt</button> 
    <hr/>
    <button onClick={() => props.returnHome()}>Return to prompt list</button>
  </React.Fragment>
  )
}

PromptDetail.propTypes = {
  prompt: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default PromptDetail;