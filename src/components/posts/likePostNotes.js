  // useEffect(() => {
  //   async function getUserLikes(){
  //   if (!currentUser){
  //     return
  //   }
  //   const likedPostArr = []
  //   const snapshot = await firestore.collection('likes').where('userId', '==', currentUser.uid).get()
      
  //   if(snapshot.empty){
  //     return;
  //   } else {
  //     snapshot.forEach((likedPost) => {
  //       const data = likedPost.data()
  //       const likeRef = data.postId.toString()
  //       likedPostArr.push(likeRef)
  //     })
  //     setLikedPosts(likedPostArr) 
  //     }
  //   }
  //   getUserLikes()
  // },[])

  //get the user's liked list from firestore 'likes' collection
  // useEffect(() => {
  //   async function getUserLikes(){
  //     console.log('get user likes')
  //   if (!currentUser){
  //     return
  //   }
  //   const likedPostArr = []
  //   const snapshot = await firestore.collection('likes').where('userId', '==', currentUser.uid).get()
      
  //   if(snapshot.empty){
  //     return;
  //   } else {
  //     snapshot.forEach((likedPost) => {
  //     const data = likedPost.data()
  //     const likeRef = data.postId.toString()
  //     likedPostArr.push(likeRef)
  //   })
  //   setLikedPosts(likedPostArr) 
  //   // addUserLikeBoolToPosts(likedPostArr);
  //   }
  // }
  //   getUserLikes();
  // }, [promptPosts])

  // const addUserLikeBoolToPosts = (liked) => {
  //   const currUserLiked = false;
  //   if (liked.includes(post.postId)){
  //     currUserLiked = true;
  //   }
  //   setPromptPosts(updatedPostList);
  // }


  // const addUserLikeBoolToPosts = (liked) => {
  //   const postList = _.cloneDeep(promptPosts);
  //   // const likedList = [...likedPosts];
  //   const updatedPostList = postList.map(post => {
  //     if (liked.includes(post.postId)){
  //       post.currUserLiked = true;
  //     } else {
  //       post.currUserLiked = false;
  //     }
  //   })
  //   setPromptPosts(updatedPostList);
  // }