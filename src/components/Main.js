import React, {componentDidUpdate} from 'react';
import Home from './Home';
import PromptDetail from './prompts/PromptDetail';
import NewPostForm from './posts/NewPostForm';
import EditPromptForm from './prompts/EditPromptForm';
import PropTypes from "prop-types";
import * as a from '../actions';
import * as c from './../actions/ActionTypes';
import { connect } from 'react-redux';
import { withFirestore, isLoaded } from 'react-redux-firebase';



class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      showNewPost: false
    };
  }

  clearPrompt = () => {
    const { dispatch } = this.props;
    const action = {
      type: c.REMOVE_SELECTED_PROMPT
    }
    dispatch(action);
  }

  handleClick = () => {
    this.clearPrompt();
  }

  handleShowNewPost = () => {
    this.setState(prevState => ({
      showNewPost: !prevState.showNewPost
    }))
  }

  dispatchSelectedPrompt = (firestorePrompt) => {
    const { dispatch } = this.props;
    const action = {
      type: c.ADD_SELECTED_PROMPT,
      prompt: firestorePrompt
    }
    dispatch(action);
  }

  handleChangingSelectedPrompt = (id) => {
    this.props.firestore.get({collection: 'prompts', doc: id}).then((prompt) => {
      const firestorePrompt = {
        name: prompt.get("name"),
        timestamp: (prompt.get("timestamp").toDate().toString()),
        id: prompt.id
      }
      // console.log(firestorePrompt);
      this.dispatchSelectedPrompt(firestorePrompt);
    })
  }

  handleDeletingPrompt = (id) => {
    this.props.firestore.delete({collection: 'prompts', doc: id});
    this.clearPrompt();
  }

  handleEditClick = () => {
    this.setState({editing:true});
  }

  handleEditingPromptInList = (promptToEdit) => {
    this.setState({
      editing: false,
    });
    this.clearPrompt();
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    // const auth = this.props.firebase.auth();
    // if (!isLoaded(auth)) {
    //   return (
    //     <React.Fragment>
    //       <h1>Loading...</h1>
    //     </React.Fragment>
    //   )
    // }
    // if ((isLoaded(auth)) && (auth.currentUser == null)) {
    //   return (
    //     <React.Fragment>
    //       <h1>You must be signed in to access the discussion board.</h1>
    //     </React.Fragment>
    //   )
    // } 
    // if ((isLoaded(auth)) && (auth.currentUser != null)){
  
      if (this.state.editing) {      
        currentlyVisibleState = <EditPromptForm prompt = {this.props.selectedPrompt} onEditPrompt = {this.handleEditingPromptInList} />
        buttonText = "return to prompts list";
      } else if (this.state.showNewPost === true) {
        currentlyVisibleState = <NewPostForm 
        returnHome={this.handleShowNewPost} 
        />
        buttonText = "return to prompts list";
      }
      
      
      else if (this.props.selectedPrompt != null) {
        currentlyVisibleState = <PromptDetail 
        prompt={this.props.selectedPrompt} 
        onClickingDelete={this.handleDeletingPrompt} 
        onClickingEdit={this.handleEditClick} 
        />
        buttonText = "return to prompts list";
      }
      else {
        currentlyVisibleState = <Home onPromptSelection={this.handleChangingSelectedPrompt}
        showNewPostForm={this.handleShowNewPost}
        />
        buttonText = null;
      }
    // }

    return (
      <React.Fragment>
        {currentlyVisibleState}
        <hr/>
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

// Home.propTypes = {
//   selectedPrompt: PropTypes.object
// };

const mapStateToProps = state => {
  return {
    selectedPrompt: state.selectedPrompt.selectedPrompt,
  }
}

// Note: we are now passing mapStateToProps into the connect() function.

Main = connect(mapStateToProps)(Main);

export default withFirestore(Main);