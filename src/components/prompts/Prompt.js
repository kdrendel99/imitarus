import React from "react";
import './prompt.css'

function Prompt(props){ 
  
  return (
    <React.Fragment>
      <ul className="prompt-list" data-aos="fade-up" data-aos-delay="100">
        <li>
          <div data-bs-toggle="collapse" className="collapsed newprompt" onClick = {() => props.whenPromptClicked(props.id)}>
            {props.name}
          </div>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default Prompt;
