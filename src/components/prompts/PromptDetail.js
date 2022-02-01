import React, { useState, useEffect, useRef } from "react";
import Post from './../posts/Post'
import { withFirestore, useFirestore } from 'react-redux-firebase'
import * as c from '../../actions/ActionTypes';
import { connect } from 'react-redux';
import {useAuth} from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import './prompt.css'
import Masonry from "react-masonry-css";
import runAnimations from './../../helper';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';


function PromptDetail(props){
  const isotope = React.useRef()
  const firestore = useFirestore();
  const { prompt, onClickingDelete, onClickingNewPost, userLikes } = props;
  const {currentUser} = useAuth();
  const [currPromptId, setCurrPromptId] = useState(prompt.id);
  const [promptPosts, setPromptPosts] = useState([]);
  const [updatePosts, setUpdatePosts] = useState(false);
  const history = useHistory();

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
        likedPostArr.push(likeRef)
      })
      dispatchUserLikes(likedPostArr) 
      }
    } 

  useEffect(() => {
    handleGetUserLikes()
  },[])

  //get all posts for this prompt
  useEffect(() => {
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
        }
          postArr.push(postObj);
        })
        setPromptPosts(postArr);
    })
    return () => unsubscribe()
  }, [currPromptId])

  const authorize = () => {
    if (currentUser !== null){
      onClickingNewPost()
    } else {
      history.push("/signup")
    }
  }

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
      }, [])

      const renderOnLike = () => {
        setUpdatePosts(!updatePosts)
      }

    const breakpoints = {
      350: 1,
      750: 2,
      900: 3
    }

  return (
    <React.Fragment>
      <section className="all-posts">
        <div className="container px-lg-5" ref={containerLoaded} onLoad={setContainerLoaded}>
          <div className="prompt-details-heading pt-20" data-aos="fade-up">
            <h2><i onClick={() => props.returnHome()} class="bi bi-arrow-left-short backbutton"/>{prompt.name}</h2>
            <p>{prompt.timestamp}</p>
          </div>
          <div className="row mx-lg-n5">
            <Masonry
              breakpointscols={breakpoints}
              className="posts-grid"
              columnClassName="posts-grid_column"
              >
              {promptPosts.map((post) =>
                <Post
                  renderOnLike = { renderOnLike }
                  imageRef = {post.imageRef}
                  promptId = {post.promptId}
                  likes = {post.likes}
                  timestamp = {post.timestamp}
                  userId = {post.userId}
                  id={post.postId}
                  key={post.postId}
                />
              )}
            </Masonry>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row justify-content-around">
            <div className="text-center g-0">
              <button type="button" className="share" onClick={() => authorize()}>Share</button>
            </div>
        </div>
      </div>
    </section>
  </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    userLikes: state.userLikes.userLikes,
  }
}

PromptDetail = connect(mapStateToProps)(PromptDetail);

export default withFirestore(PromptDetail);