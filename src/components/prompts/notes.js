// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import '../../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';

// import Glightbox from '../../../node_modules/glightbox/dist/js/glightbox.min.js';
// import '../../../node_modules/aos/dist/aos';
// import '../../../node_modules/aos/dist/aos.css';
// import Glightbox from 'glightbox';
// import runAnimations from './../../helper';
// import Isotope from 'isotope-layout';
// import imagesLoaded from 'imagesloaded';
// import '../../../node_modules/swiper/swiper-bundle.min.js';

  // useEffect(() => {
  //   async function getAll(){
  //     // const promptPostSubCollectionRef = firestore.collection('prompts').doc(`${selectedPrompt}`).collection(posts)
      
  //     firestore.get({collection: 'prompts', doc: 'tvhLIjP39gwLaZYkGALa'}).then((prompt) => {
  //       const firestorePrompt = {
  //         // prompt: prompt.posts.get(String)
  //         prompt: prompt.listCollections()
  //       }
  //       const test = firestorePrompt.prompt;
  //       // console.log(firestorePrompt.posts);
  //       // console.log(firestorePrompt);
  //       console.log(test);
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
  //       const test = firestorePrompt.prompt.toString()
  //       // console.log(firestorePrompt.posts);
  //       // console.log(firestorePrompt);
  //       console.log(test);
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
  //       const test = firestorePrompt.prompt.toString()
  //       // console.log(firestorePrompt.posts);
  //       // console.log(firestorePrompt);
  //       console.log(test);
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


    //USE FOCUS GOES HERE

        // initialize an Isotope object with configs
    // useEffect(() => {
    //     runAnimations();
    //     let currentlyLoadedContainer = `${containerLoaded.current.className}`;
    //     currentlyLoadedContainer = '.' + currentlyLoadedContainer.substring(4);
    
    //     imagesLoaded(currentlyLoadedContainer, function(){
    //       isotope.current = new Isotope(currentlyLoadedContainer, {
    //         itemSelector: '.portfolio-item',
    //         layoutMode: 'fitRows',
    //       });
    //       })
  
    //     // cleanup
    //     return () => isotope.current.destroy()
    //   }, [])



    // return
        {/* <div className="site-wrap">
      <div className="container-fluid" data-aos="fade" data-aos-delay="500" ref={containerLoaded} onLoad={setContainerLoaded}>
        <div className="row">
          {promptPosts.map((post) =>
          <Post
            whenPostClicked = { props.onPostSelection }
            imageRef = {post.imageRef}
            promptId = {post.promptId}
            score = {post.score}
            timestamp = {post.timestamp}
            userId = {post.userId}
            id={post.id}
            key={post.id}
          />
        )}
        </div>
      </div>
    </div> */}


    {/* <section id="portfolio" className="portfolio"> */}
{/* <div className="container" data-aos="fade-up"> */}

{/* <div className="section-title">
<h2>Portfolio</h2>
<p>Check out our beautifull portfolio</p>
</div> */}
{/* {promptPosts.map((post) => */}
{/* <Post
whenPostClicked = { props.onPostSelection }
imageRef = {post.imageRef}
promptId = {post.promptId}
score = {post.score}
timestamp = {post.timestamp}
userId = {post.userId}
id={post.id}
key={post.id}/> */}
{/* )} */}
{/* </div> */}
{/* </section> */}


{/* <h2>Prompt Detail</h2>
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

<hr/> */}
{/* {selectedPrompt?showSelectedPrompt:null} */}