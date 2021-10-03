import React, { useState, useEffect } from "react";
import Post from './../posts/Post'
// import NewPostForm from '../posts/NewPostForm';
import PropTypes from "prop-types";
import firebase from '../../firebase';
import 'firebase/firestore';
// import * as firebase from 'firebase';
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'

function PromptDetail(props){
  const firestore = useFirestore();
  const { prompt, onClickingDelete, onClickingNewPost } = props;
  // const [newPostForm, setNewPostForm] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState({...prompt});
  const [currPromptId, setCurrPromptId] = useState(prompt.id);
  const [promptPosts, setPromptPosts] = useState([]);


  useEffect(() => {
    // if (prompt !== null){
    setSelectedPrompt([prompt]);
    // getPostList();
  },[prompt]);


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
          score: data.score,
          timestamp: data.timestamp.toDate().toString(),
          userId: data.userId
        }
        postArr.push(postObj);
      })
      setPromptPosts(postArr);
      console.log(promptPosts);
      }
    getAll();
  }, [currPromptId])

  // useEffect(() => {
  //   async function getAll(){
  //     // const promptPostSubCollectionRef = firestore.collection('prompts').doc(`${selectedPrompt}`).collection(posts)
      
  //     firestore.get({collection: 'prompts', doc: 'tvhLIjP39gwLaZYkGALa'}).then((prompt) => {
  //       const firestorePrompt = {
  //         // prompt: prompt.posts.get(String)
  //         prompt: prompt.listCollections()
  //       }
  //       const fuck = firestorePrompt.prompt;
  //       // console.log(firestorePrompt.posts);
  //       // console.log(firestorePrompt);
  //       console.log(fuck);
  //     })
  //   }
  //   getAll();
  // }, [])


  // const getPostList = async () => {
  //   // const postsRef = firestore.collection('posts');
  //   const promptReference = await firestore.listCollections();

  //   console.log(promptReference);
  // }




  // const getPostList = () => {
  //   const reference = firestore.collection('prompts').doc(currPromptId).collection('posts');
  //   const postListRef = firestore.ref(reference).orderByKey();
  //   postListRef.once('value')
  //     .then(function(snapshot){
  //       snapshot.forEach(function(childSnapshot){
  //         var value = (childSnapshot.value).toString();
  //         console.log(value);
  //       })
  //     })






  // const getPostList = async () => {
  //   const postListRef = await firestore.collection('prompts').doc(currPromptId).collection('posts').get();
  //   postListRef.once('value')
  //     .then(function(snapshot){
  //       snapshot.forEach(function(childSnapshot){
  //         var value = (childSnapshot.value).toString();
  //         console.log(value);
  //       })
  //     })
    
    
    // const listData = postListRef.data;
    // console.log(listData);
  // }

  // useEffect(() => {
  //   console.log(typeof selectedPrompt)
  // },[prompt]);



  // useEffect(() => {
  //   async function getPromptPostList(){
  //     const postList = await firestore.collection('prompts').doc(`${selectedPrompt}`).collection(posts)
      
  //     firestore.get({collection: 'prompts', doc: 'tvhLIjP39gwLaZYkGALa'}).then((prompt) => {
  //       const firestorePrompt = {
  //         prompt: prompt.get({collection: "posts"})
  //       }
  //       const fuck = firestorePrompt.prompt.toString()
  //       // console.log(firestorePrompt.posts);
  //       // console.log(firestorePrompt);
  //       console.log(fuck);
  //     })
  //   }
  //   getAll();
  // }, [])

  // const getPosts()


  // useEffect(() => {
  //   async function getAll(){
  //     const promptPostSubCollectionRef = firestore.collection('prompts').doc(`${selectedPrompt}`).collection(posts)
      
  //     firestore.get({collection: 'prompts', doc: 'tvhLIjP39gwLaZYkGALa'}).then((prompt) => {
  //       const firestorePrompt = {
  //         prompt: prompt.get({collection: "posts"})
  //       }
  //       const fuck = firestorePrompt.prompt.toString()
  //       // console.log(firestorePrompt.posts);
  //       // console.log(firestorePrompt);
  //       console.log(fuck);
  //     })
  //   }
  //   getAll();
  // }, [])



      // console.log(typeof currPromptId);

    // const promptRef = firestore.collection('prompts');
    // const snapshot = promptRef.where('posts', '==', true).get();
    // console.log(snapshot);

    //   firestore.get({collection: 'prompts', doc: currPromptId}).then((prompt) => {
    //     const thisPromptsPosts = {
    //       name: prompt.get("name"),
    //       timestamp: (prompt.get("timestamp").toDate().toString()),
    //       posts: JSON.parse(prompt.get("posts").toString()),
    //       id: prompt.id
    //     }
    //     // console.log(firestorePrompt.posts);
    //     console.log(thisPromptsPosts.posts);
    //   })





  // useEffect(() => {
  //   // if (prompt !== null){
  //   setSelectedPrompt([prompt]);
  //   console.log(currPromptId);
  //   return new Promise(resolve => {
  //     firestore.collection('prompts').get().then((querySnapshot) => {
  //     // firestore.get({collection: 'prompts', doc: currPromptId}).onSnapshot(documentSnapshot => {
  //       const objectsArray = [];
  //       querySnapshot.forEach((prompt) => {
  //         objectsArray.push(prompt.data());
  //       });
  //       console.log(objectsArray);
  //     })
      
      
  //     // then((prompt) => {
  //     // const promptList = prompt.get("posts")[1];
  //     // setPromptPosts(promptList);
  //     // console.log(promptPosts);
  //   });
  //   // console.log('this mcfrickery');
  //   // console.log(promptPosts);
  // },[prompt]);











  // const toggleShowNewPostForm = () => {
  //   setNewPostForm(!newPostForm);
  // }

      //   const listOfPrompts = promptRef.get().then((prompt) => {
    //     const postList = {
    //       posts: prompt.get('posts')
    //     }
    //     console.log(postList);
    //   })
    // })
    //   console.log(listOfPrompts);


    return (
      <React.Fragment>
      <h2>Prompt Detail</h2>
      <h3>{prompt.name}</h3>
      <h5>{prompt.timestamp}</h5>
      <hr/>

      <div className="row portfolio-container">
        {promptPosts.map((post) =>
          <Post
            whenPostClicked = { props.onPostSelection }
            imageRef = {post.imageRef}
            promptId = {post.promptId}
            score = {post.score}
            timestamp = {post.timestamp}
            userId = {post.userId}
            id={post.id}
            key={post.id}/>
        )}
      </div>

      <hr/>
      {/* {selectedPrompt?showSelectedPrompt:null} */}

      <button onClick={() => onClickingNewPost()}>Upload new post</button>

      <button onClick={ props.onClickingEdit }>Update Prompt</button>
      <button onClick={()=> onClickingDelete(prompt.id) }>Delete Prompt</button> 
      <hr/>
      <button onClick={() => props.returnHome()}>Return to prompt list</button>
    </React.Fragment>
    )
  // }
}

PromptDetail.propTypes = {
  prompt: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default PromptDetail;