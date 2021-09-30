import React from "react";
import PropTypes from "prop-types";

function PromptDetail(props){
  const { prompt, onClickingDelete } = props;

  return (
    <React.Fragment>
      <h1>Prompt Detail</h1>
      <h3>{prompt.name}</h3>
      <h5>{prompt.timestamp}</h5>
      <button onClick={ props.onClickingEdit }>Update Prompt</button>
      <button onClick={()=> onClickingDelete(prompt.id) }>Delete Prompt</button> { /* new code */ }
      <hr/>
    </React.Fragment>
  );
}

PromptDetail.propTypes = {
  prompt: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default PromptDetail;