import React from 'react';
import PropTypes from 'prop-types';

function PromptDetail(props){
  const { prompt, resetSelectedPromptList } = props;
  return (
    <React.Fragment>
      <h3>{prompt.name}</h3>
      <h3>{prompt.timestamp}</h3>
      <button onClick={() => resetSelectedPromptList()}>Go back to prompt list</button>
    </React.Fragment>
  )
}

PromptDetail.propTypes = {
  prompt: PropTypes.object, 
}

export default PromptDetail;