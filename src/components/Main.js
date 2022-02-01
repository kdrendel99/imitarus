import React from 'react';
import Home from './home/Home';
import PromptDetail from './prompts/PromptDetail';
import NewPostForm from './posts/NewPostForm';
import EditPromptForm from './prompts/EditPromptForm';
import * as c from './../actions/ActionTypes';
import { connect } from 'react-redux';
import { withFirestore} from 'react-redux-firebase';

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      newPostFormVisible: false
    };
  }


  handleShowNewPostForm = () => {
    this.setState(prevState => ({
      newPostFormVisible: !prevState.newPostFormVisible
    }));
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

      if (this.state.editing) {      
        currentlyVisibleState = <EditPromptForm prompt = {this.props.selectedPrompt} onEditPrompt = {this.handleEditingPromptInList} />
        buttonText = "return to prompts list";
      } 
      else if (this.state.newPostFormVisible){
        currentlyVisibleState = <NewPostForm
        prompt = {this.props.selectedPrompt}
        returnHome = {this.handleShowNewPostForm}
        auth = {this.props.firebase.auth()}
        />
      }
      
      else if (this.props.selectedPrompt != null) {
        currentlyVisibleState = <PromptDetail 
        prompt={this.props.selectedPrompt} 
        onClickingDelete={this.handleDeletingPrompt} 
        onClickingEdit={this.handleEditClick} 
        onClickingNewPost = {this.handleShowNewPostForm}
        returnHome = {this.handleClick}
        auth = {this.props.firebase.auth()}
        />
      }
      else {
        currentlyVisibleState = <Home onPromptSelection={this.handleChangingSelectedPrompt}
        auth = {this.props.firebase.auth()}
        />
        buttonText = null;
      }

    return (
      <React.Fragment>
        {currentlyVisibleState}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedPrompt: state.selectedPrompt.selectedPrompt,
    userLikes: state.userLikes.userLikes,
    showLoginForm: state.showLoginForm,
  }
}

Main = connect(mapStateToProps)(Main);

export default withFirestore(Main);