import React from 'react';
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';
import './prompt.css'

function EditPromptForm(props){
  const { prompt } = props;
  const firestore = useFirestore();

  function handleEditPromptFormSubmission(event) {
    event.preventDefault();
    props.onEditPrompt();
    const propertiesToUpdate = {
      name: event.target.name.value,
    }
    return firestore.update({collection: 'prompts', doc: prompt.id }, propertiesToUpdate)
  }

  return (
    <React.Fragment>
      <form onSubmit={handleEditPromptFormSubmission}>
        <input
          type='text'
          name='name'
          placeholder='Name (optional)' />
        <button type='submit'>Update Prompt</button>
      </form>  
    </React.Fragment>
  );
}

EditPromptForm.propTypes = {
  prompt: PropTypes.object,
  onEditPrompt: PropTypes.func
};

export default EditPromptForm;