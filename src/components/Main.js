import React from 'react';
import Home from './Home';
import PromptDetail from './prompts/PromptDetail';
import NewPostForm from './posts/NewPostForm';
import EditPromptForm from './prompts/EditPromptForm';
// import PropTypes from "prop-types";
// import * as a from '../actions';
import * as c from './../actions/ActionTypes';
import { connect } from 'react-redux';
import { withFirestore, isLoaded } from 'react-redux-firebase';
import SignUp from './users/SignUp';
import SignIn from './users/SignIn';
// import { firestore } from 'firebase';



class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      newPostFormVisible: false
    };
  }

  componentDidUpdate(){
    console.log(this.props.showSignupForm)
  }

  toggleSignupForm = () => {
    const { dispatch } = this.props;
    const action = {
      type: c.TOGGLE_SIGNUP_FORM
    }
    dispatch(action);
  }

  toggleLoginForm = () => {
    const { dispatch } = this.props;
    const action = {
      type: c.TOGGLE_LOGIN_FORM
    }
    dispatch(action);
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
        // posts: prompt.get("posts"),
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

      if (this.props.showSignupForm){
        currentlyVisibleState = <SignUp hideSignupForm = {this.toggleSignupForm}
        />
      }

      else if (this.props.showLoginForm){
        currentlyVisibleState = <SignIn hideLoginForm = {this.toggleLoginForm}
        />
      }

      else if (this.state.editing) {      
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

// Home.propTypes = {
//   selectedPrompt: PropTypes.object
// };


const mapStateToProps = state => {
  return {
    selectedPrompt: state.selectedPrompt.selectedPrompt,
    showSignupForm: state.showSignupForm,
    showLoginForm: state.showLoginForm,
  }
}

Main = connect(mapStateToProps)(Main);

export default withFirestore(Main);