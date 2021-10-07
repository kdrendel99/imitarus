import { useAuth } from '../contexts/AuthContext'
import React, {useState, useRef} from "react";
// import firebase from "firebase/app";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import accountart from '../../images/account_art.png';


const SignUp = (props) => {  
  // const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e){
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch {
      setError('Failed to create an account')
    }

    setLoading(false)
  }




  // const [userPasswordsMatch, setUserPasswordsMatch] = useState(null);

    // function handleUserSignUp(event) {
    //   event.preventDefault();
    //   const name = event.target.name.value;
    //   const email = event.target.email.value;
    //   const password = event.target.password.value;
    //   const passwordConfirmation = event.target.passwordConfirmation.value;
    //   if (password != passwordConfirmation){
    //       setUserPasswordsMatch(false);
    //   }
      // else {
      //   firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
      //     console.log("successfully signed up!");
      //   }).catch(function(error) {
      //     console.log(error.message);
      //   });
      // }
    // }

    // const showError = () => {
    //   return <div className="alert-danger">error</div>
    // }

  return (
    <React.Fragment>

    <div className="sign_up_bg">
    <div className="padding"/>
    <div className="padding"/>
    <div className="padding"/>
      <div className="container-fluid">
        <div className="row justify-content-center g-0">
          <div className="col-sm-6 col-xs-12">
            <h1 className="font-weight-bold py-3">Create an account</h1>
            <h4>Join the community.</h4>
            {error && alert(error)}
            <form onSubmit={handleSubmit}>
              {/* <div className="form-row">
                <div className="col-lg-7">
                  <input type="name" placeholder="name" className="form-control my-3 p-2" ref={nameRef} required/>
                </div>
              </div> */}
							<div className="form-row">
                <div className="col-lg-7">
                  <input type="email" placeholder="Email" name="email" className="form-control my-3 p-2" ref={emailRef} required/>
                </div>
              </div>
							<div className="form-row">
                <div className="col-lg-7">
                  <input type="password" placeholder="******" name="password" className="form-control my-3 p-2" ref={passwordRef} required/>
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  <input type="password" placeholder="******" name="passwordConfirmation" className="form-control my-3 p-2" ref={passwordConfirmRef} required/>
                </div>
                <div className="form-row">
                  <div className="col-lg-7">
									<button disabled={loading} className="login-btn my-2 p-1" type="submit">Sign Up</button>
                  </div>
                </div>
                {/* <a href="#">Forgot password</a> */}
              </div>
            </form>
          </div>
					<div className="robot_art my-auto d-none d-sm-block col-sm-6">
						<img src={accountart} className="img-fluid"/>
					</div>
        </div>
      </div>
			</div>
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