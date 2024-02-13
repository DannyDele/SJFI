import '../assets/styles/Login.css';
import MySVGIcon from '../assets/google.svg';
import myImage from '../assets/Rectangle 28.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faEye} from '@fortawesome/free-regular-svg-icons';
// import { faLock } from '@fortawesome/free-regular-svg-icons';


function Login() {
  return (
    <>
      <div className="Login-container">
        <div className='Login-flex'>
          <div>
            <h1 className='Login-greeting'>Welcome Back</h1>
          </div>
          <div className='Login-btn'>
            <button><span className='Google-icon'><img src={MySVGIcon} style={{width: '30px', height: '30px'}} alt="" /></span> Sign in with Google</button>
          </div>

                  <div className='Alternative-login'><p>OR LOGIN WITH EMAIL</p></div>
          <div className='Login-form-container'>
            <form action="">
              <div className='Login-form'>
                <div className='Login-Username'>
                  <div className="input-wrapper input-wrapper-text">
            <FontAwesomeIcon className="faUser" icon={faUser} />
            <input className='input' type="text" placeholder="Username or email" />
          </div>

                </div>
                <div>

                  <div className="input-wrapper">
                    {/* <FontAwesomeIcon className="faLock" icon={faLock} /> */}
                    <input className='input' type="password" placeholder='Password' />
                      <FontAwesomeIcon className="faEye" icon={faEye} />

                  </div>
                  
                </div>

                <div className='Forgot-password-container'>
                  <div className='Login-checkbox'>
                <input type="checkbox" id="keepLoggedIn" className="checkbox-input" />
               <label htmlFor="keepLoggedIn" className="checkbox-label">Keep me logged in</label>
              </div>

                  <div className='Forgot-password'><p>Forgot Password?</p></div>
                </div>

                <div className='Login'>
                  <button>Log In</button>
                </div>

                <div className='No-account'>
                  <p>Don&#39;t have an account yet? <span className='sign-up'><a href="">Sign up</a></span></p>
                </div>
                
              </div>
            </form>
          </div>
        </div>
        <div className='Login-img'>
        <img className='hospital-image' src={myImage} alt="" />
        </div>
      </div>
    </>
  );
}

export default Login;
