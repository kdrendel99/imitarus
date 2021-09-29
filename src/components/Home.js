import React, { useEffect, useFocus, useCallback, isElemVisible , useState, useRef, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import Prompt from './Prompt';

function Home(props){
  return (
    <React.Fragment>
    <hr/>
      {props.promptList.map((prompt) => 
        <Prompt
          whenPromptClicked = {props.onPromptSelection}
          name={prompt.name}
          timestamp={prompt.timestamp}
          id={prompt.id}
          key={prompt.id}/>
      )}
  </React.Fragment> 
);
}

Home.propTypes = {
projList: PropTypes.array,
onProjSelection: PropTypes.func
};

export default Home;