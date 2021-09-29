import React from 'react';
import PropTypes from 'prop-types';

function Prompt(props) {
  return(
    <React.Fragment>
      <div onClick = {() => props.whenPromptClicked(props.id)}>
        <h3>{props.name}</h3>
        <h5>{props.timestamp}</h5>
        <hr/>
      </div>
    </React.Fragment>
  );
}

Prompt.propTypes = {
  name: PropTypes.string.isRequired,
  timestamp: PropTypes.string,
  id: PropTypes.string,
  whenPromptClicked: PropTypes.func
};

export default Prompt;