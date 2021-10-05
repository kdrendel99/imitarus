import React from "react";
import firebase from "firebase/app";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import david from '../../images/david2.jpeg';

const SignIn = (props) => {  
    // function doSignUp(event) {
    //   event.preventDefault();
    //   const email = event.target.email.value;
    //   const password = event.target.password.value;
    //   firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
    //     console.log("successfully signed up!");
    //   }).catch(function(error) {
    //     console.log(error.message);
    //   });
    // }

    // function doSignIn(event) {
    //   event.preventDefault();
    //   const email = event.target.signinEmail.value;
    //   const password = event.target.signinPassword.value;
    //   firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
    //     console.log("Successfully signed in!");
    //   }).catch(function(error) {
    //     console.log(error.message);
    //   });
    // }

    // function doSignOut() {
    //   firebase.auth().signOut().then(function() {
    //     console.log("Successfully signed out!");
    //   }).catch(function(error) {
    //     console.log(error.message);
    //   });
    // }


  return (
    <React.Fragment>
      {/* <div className="flex-background-signin"> */}
      <div className="padding"/>
      <div className="padding"/>
      <div className="padding"/>
        <div className="real_login_form">
          <div className="row-login text-center">
            <section className="col my-4 mx-5">
              <div className="row img g-0">
                <div className="col test"/>
                <div className="col px-5 pt-5">
                <div class="login-word">Login</div>
                  <div class="login-form-1">
                    <form id="login-form">
                    <div class="login-form-main-message"></div>
                      <div class="main-login-form">
                        <div class="login-group">
                          <div class="form-group">
                            <label for="lg_username" class="sr-only">Username</label>
                            <input type="text" class="form-control" id="lg_username" name="lg_username" placeholder="username"/>
                          </div>
                          <div class="form-group">
                          <label for="lg_password" class="sr-only">Password</label>
                          <input type="password" class="form-control" id="lg_password" name="lg_password" placeholder="password"/>
                          </div>
                        </div>
                      <button type="submit" class="login-button"><i class="fa fa-chevron-right"></i></button>
                      </div>
                      <div class="etc-login-form">
                      {/* <p>forgot your password? <a href="#">click here</a></p> */}
                      <p>new user? <a href="#">create new account</a></p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* </div> */}
    </React.Fragment>
  );
}

export default SignIn