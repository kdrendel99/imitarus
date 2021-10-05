import React from "react";
import firebase from "firebase/app";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import accountart from '../../images/account_art.png';

const SignUp = (props) => {  
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
	{/* <div className="container">
		<div className="row align-items-center">
			<div className="col">
			<div class="text-center" style={{padding: "50px 0"}}>
				<div class="logo">register</div>
				<div class="login-form-1">
					<form id="register-form" class="text-left">
						<div class="login-form-main-message"></div>
						<div class="main-login-form">
							<div class="login-group">
								<div class="form-group">
									<label for="reg_username" class="sr-only">Email address</label>
									<input type="text" class="form-control" id="reg_username" name="reg_username" placeholder="username"/>
								</div>
								<div class="form-group">
									<label for="reg_password" class="sr-only">Password</label>
									<input type="password" class="form-control" id="reg_password" name="reg_password" placeholder="password"/>
								</div>
								<div class="form-group">
									<label for="reg_password_confirm" class="sr-only">Password Confirm</label>
									<input type="password" class="form-control" id="reg_password_confirm" name="reg_password_confirm" placeholder="confirm password"/>
								</div>
								
								<div class="form-group">
									<label for="reg_email" class="sr-only">Email</label>
									<input type="text" class="form-control" id="reg_email" name="reg_email" placeholder="email"/>
								</div>
								<div class="form-group">
									<label for="reg_fullname" class="sr-only">Full Name</label>
									<input type="text" class="form-control" id="reg_fullname" name="reg_fullname" placeholder="full name"/>
								</div>
								
								<div class="form-group login-group-checkbox">
									<input type="radio" class="" name="reg_gender" id="male" placeholder="username"/>
									<label for="male">male</label>
									
									<input type="radio" class="" name="reg_gender" id="female" placeholder="username"/>
									<label for="female">female</label>
								</div>
								
								<div class="form-group login-group-checkbox">
									<input type="checkbox" class="" id="reg_agree" name="reg_agree"/>
									<label for="reg_agree">i agree with <a href="#">terms</a></label>
								</div>
							</div>
							<button type="submit" class="login-button"><i class="fa fa-chevron-right"></i></button>
						</div>
						<div class="etc-login-form">
							<p>already have an account? <a href="#">login here</a></p>
						</div>
					</form>
				</div>
			</div>
		</div>
		</div>
	</div> */}

<div class="sign_up_bg">
<div class="padding"/>
<div class="padding"/>
<div class="padding"/>
      <div className="container-fluid">
        <div className="row justify-content-center g-0">
          <div className="col-sm-6 col-xs-12">
            <h1 className="font-weight-bold py-3">Create an account</h1>
            <h4>Join the community.</h4>
            <form>
              <div className="form-row">
                <div className="col-lg-7">
                  <input type="email" placeholder="Email" className="form-control my-3 p-2"/>
                </div>
              </div>
							<div className="form-row">
                <div className="col-lg-7">
                  <input type="email" placeholder="Email" className="form-control my-3 p-2"/>
                </div>
              </div>
							<div className="form-row">
                <div className="col-lg-7">
                  <input type="email" placeholder="Email" className="form-control my-3 p-2"/>
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  <input type="password" placeholder="******" className="form-control my-3 p-2"/>
                </div>
                <div className="form-row">
                  <div className="col-lg-7">
									<button className="login-btn my-3 p-2">sign in</button>
                  </div>
                </div>
                {/* <a href="#">Forgot password</a> */}
                <p>Don't have an account? <a href="#">Register here</a></p>
              </div>
            </form>
          </div>
					<div className="robot_art my-auto d-none d-sm-block col-sm-6">
						<img src={accountart} className="img-fluid"/>
					</div>
        </div>
      </div>
			</div>
    {/* </section> */}
  {/* </div> */}
    </React.Fragment>
  );
}

export default SignUp

























// {/* <!-- FORGOT PASSWORD FORM --> */}
// <div class="text-center" style={{padding: "50px 0"}}>
// 	<div class="logo">forgot password</div>
// 	{/* <!-- Main Form --> */}
// 	<div class="login-form-1">
// 		<form id="forgot-password-form" class="text-left">
// 			<div class="etc-login-form">
// 				<p>When you fill in your registered email address, you will be sent instructions on how to reset your password.</p>
// 			</div>
// 			<div class="login-form-main-message"></div>
// 			<div class="main-login-form">
// 				<div class="login-group">
// 					<div class="form-group">
// 						<label for="fp_email" class="sr-only">Email address</label>
// 						<input type="text" class="form-control" id="fp_email" name="fp_email" placeholder="email address"/>
// 					</div>
// 				</div>
// 				<button type="submit" class="login-button"><i class="fa fa-chevron-right"></i></button>
// 			</div>
// 			<div class="etc-login-form">
// 				<p>already have an account? <a href="#">login here</a></p>
// 				<p>new user? <a href="#">create new account</a></p>
// 			</div>
// 		</form>
// 	</div>
// 	{/* <!-- end:Main Form --> */}
// </div>