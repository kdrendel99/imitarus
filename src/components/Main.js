// import { connect } from 'react-redux';
import React from 'react';
import Home from './Home';
import TestPrompts from './TestPrompts'
// import * as c from './../actions/ActionTypes';
import PropTypes from "prop-types";
// import index from './../index.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testPrompts: TestPrompts,
    };
  }

  // clearPrompt = () => {
  //   const { dispatch } = this.props;
  //   const action = {
  //     type: c.REMOVE_SELECTED_PROMPT
  //   }
  //   dispatch(action);
  // }


  handleClick = () => {
    this.clearPrompt();
  }


  // handleChangingSelectedPrompt = (id) => {
  //   const { dispatch } = this.props;
  //   const selectedPrompt = this.state.testPrompts.filter(prompt => prompt.id === id)[0];
  //   const action = {
  //     type: c.ADD_SELECTED_PROMPT,
  //     id: selectedPrompt
  //   }
  //   dispatch(action);
  // }


  render(){

    // let currentlyVisibleState = null;

    // if (this.props.selectedPrompt != null) {
    //   currentlyVisibleState = <Prompt prompt= {this.props.selectedPrompt} resetSelected = {this.handleClick}/>;
    // }

    // else {
      let currentlyVisibleState = <Home 
      promptList={this.state.testPrompts} 
      onPromptSelection={this.handleChangingSelectedPrompt} 
      resetSelections={this.handleClick}
      />;
    // }
    return (
      <React.Fragment>
        {currentlyVisibleState}
      </React.Fragment>
    );
  }

}

// Main.propTypes = {
//   selectedJourn: PropTypes.object,
//   selectedProj: PropTypes.object
// };



// const mapStateToProps = state => {
//   return {
//     selectedPrompt: state.selectedPrompt,
//   }
// }


// Main = connect(mapStateToProps)(Main);

export default Main;