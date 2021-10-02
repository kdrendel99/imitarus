import React, { useState, useEffect } from "react";
// import NewPostForm from '../posts/NewPostForm';
import PropTypes from "prop-types";

function PromptDetail(props){
  const { prompt, onClickingDelete, onClickingNewPost } = props;
  // const [newPostForm, setNewPostForm] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState({...prompt});

  useEffect(() => {
    if (prompt !== null){
      setSelectedPrompt([prompt]);
      console.log("set prompt in prompt detail")
      console.log(selectedPrompt.name);
    }
  },[prompt]);

  // const toggleShowNewPostForm = () => {
  //   setNewPostForm(!newPostForm);
  // }


  // if (newPostForm) {
  //   return (
  //     <React.Fragment>
  //       <NewPostForm returnHome={toggleShowNewPostForm}/>
  //     </React.Fragment>
  //   )
  // } else {
    return (
      <React.Fragment>
      <h1>Prompt Detail</h1>
      <h3>{prompt.name}</h3>
      <h5>{prompt.timestamp}</h5>
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