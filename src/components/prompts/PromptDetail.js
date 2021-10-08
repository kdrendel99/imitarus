import React, { useState, useEffect, useRef, Component } from "react";
import Post from './../posts/Post'
import PropTypes from "prop-types";
// import * from 'firebase/firestore';
import { withFirestore, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import * as c from '../../actions/ActionTypes';
import { connect } from 'react-redux';
import {useAuth} from '../contexts/AuthContext';


import Masonry from "react-masonry-css";

import runAnimations from './../../helper';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';


function PromptDetail(props){
  const isotope = React.useRef()
  const firestore = useFirestore();
  const { prompt, onClickingDelete, onClickingNewPost, userLikes } = props;
  const {currentUser} = useAuth();
  const [likedPosts, setLikedPosts] = useState(userLikes)
  const [currPromptId, setCurrPromptId] = useState(prompt.id);
  const [promptPosts, setPromptPosts] = useState([]);

  const dispatchUserLikes = (likesArr) => {
    const { dispatch } = props;
    const action = {
      type: c.GET_USER_LIKES,
      userLikes: likesArr
    }
    dispatch(action);
  }

  const handleGetUserLikes = async () => {
    if (!currentUser){
      return
    }
    const likedPostArr = []
    const snapshot = await firestore.collection('likes').where('userId', '==', currentUser.uid).get()
      
    if(snapshot.empty){
      return;
    } else {
      snapshot.forEach((likedPost) => {
        const data = likedPost.data()
        const likeRef = data.postId.toString()
        // const likeId = likedPost.id.toString()
        likedPostArr.push(likeRef)
      })
      dispatchUserLikes(likedPostArr) 
      }
    } 

  useEffect(() => {
    handleGetUserLikes()
  },[])

  useEffect(() => {
    console.log(likedPosts)
  }, [])








  // //get all posts for this prompt
  useEffect(() => {
    // async function getAllPosts(){
      console.log('get all posts')
      const postArr = [];

      const postsRef = firestore.collection('posts').where('promptId', '==', currPromptId)
      const unsubscribe = postsRef.onSnapshot(snapshot => {

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
            postId: post.id,
            // currUserLiked: false
          }
            postArr.push(postObj);
          })
          setPromptPosts(postArr);
      })
      return () => unsubscribe()
    // }
    // getAllPosts();
  }, [currPromptId])





// //get all posts for this prompt
  // useEffect(() => {
  //   async function getAllPosts(){
  //     console.log('get all posts')
  //     const postArr = [];
  //     const postsRef = firestore.collection('posts');
  
  //     const snapshot = await postsRef.where('promptId', '==', currPromptId).get();
      
  //     if(snapshot.empty){
  //       console.log('no matching docs');
  //       return;
  //     }
  //     snapshot.forEach((post) => {
  //       const data = post.data()
  //       const postObj = {
  //         imageRef: data.imageRef,
  //         promptId: data.promptId,
  //         likes: data.likes,
  //         timestamp: data.timestamp.toDate().toString(),
  //         userId: data.userId,
  //         postId: post.id,
  //         // currUserLiked: false
  //       }
  //         postArr.push(postObj);
  //       })
  //     setPromptPosts(postArr);
  //   }
  //   getAllPosts();
  // }, [currPromptId])

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
      {console.log('rerendering')}
      <section id="team" className="team">
        <div className="padding"/>
        <div className="container" 
          ref={containerLoaded} onLoad={setContainerLoaded}
          >
          <div className="prompt-details-heading" data-aos="fade-up">
          <h2>{prompt.name}</h2>
          <p>{prompt.timestamp}</p>
          </div>
          <div className="row">
            <Masonry
              breakpointsCols={breakpoints}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
              >
                {/* {console.log('liked posts: ' + likedPosts)} */}
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
                  // userLikedList={likedPosts}
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

// PromptDetail.propTypes = {
//   prompt: PropTypes.object,
//   onClickingDelete: PropTypes.func,
//   onClickingEdit: PropTypes.func
// };

const mapStateToProps = state => {
  return {
    userLikes: state.userLikes.userLikes,
  }
}

PromptDetail = connect(mapStateToProps)(PromptDetail);

export default withFirestore(PromptDetail);