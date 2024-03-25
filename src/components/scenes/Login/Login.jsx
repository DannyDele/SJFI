import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link

import Carousel from "react-elastic-carousel";
import womanPic from '../../../assets/sjfi 1.png';
import manPic from '../../../assets/sjfi 2.png';
import nursePic from '../../../assets/sjfi 3.png';
import '../../../assets/styles/Login.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Import js-cookie library








// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));




function Login({ setIsLoggedIn }) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState("");
const [isLoading, setIsLoading] = useState(false);
    const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
  const navigate = useNavigate();


    
 
 useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);
    
    
    
    
    // Function to login
    const handleLogin = async () => {
      console.log(email, password)
      try {
        setIsLoading(true)
      const response = await fetch("https://api.stj-fertilityinstitute.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
          const loginData = await response.json()

          const { token, user } = loginData
          console.log('Login Token:', token)
        
        // Extract username and profileimage from user object
        const { username, profileimage, role } = user;
        
        // Save token, username, and profile image in cookies
        Cookies.set('authToken', token);
        Cookies.set('username', username);
        Cookies.set('profileImage', profileimage);
        Cookies.set('role', role);
          console.log('Login Data:', loginData)

        // Save login state in local storage
          localStorage.setItem('isLoggedIn', 'true')
          
                        setIsLoggedIn(true);


      navigate('/students');

      } else {
        setMessage("Invalid email or password.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      setMessage("An error occurred during login.");
      setMessageType("error");
      } finally {
                  setIsLoading(false)

    }
  };


  const imageSize = { width: "500px", height: "500px" };

  const currentYear = new Date().getFullYear();


  
    const handleClick = (event) => {
      // event.preventDefault(); // Prevent default behavior of the link
      // Any additional logic you want to execute on click
    };
  

  return (
    <div className="Flex">
      <div className="Image-container">
        <Carousel
          itemsToShow={1}
          showArrows={false}
          pagination
          autoPlay // Enable auto play
          autoPlaySpeed={1000} // Set auto play speed to 3 seconds (3000 milliseconds)
          style={{ width: "500px", height: "500px" }} // Adjusted padding
        >
          <img
            src={womanPic}
            alt="Slide 1"
            style={{ ...imageSize, objectFit: 'cover', opacity: 0.85 }} // Add opacity
            className="w-full lg:w-1/2 lg:h-screen lg:block hidden"
          />
          <img
            src={manPic}
            alt="Slide 2"
            style={{ ...imageSize, objectFit: 'cover', opacity: 0.85 }} // Add objectFit: 'cover'
            className="w-full lg:w-1/2 lg:h-screen lg:block hidden"
          />
          <img
            src={nursePic}
            alt="Slide 3"
            style={{ ...imageSize, objectFit: 'cover', opacity: 0.85 }} // Add objectFit: 'cover'
            className="w-full lg:w-1/2 lg:h-screen lg:block hidden"
          />
          <style >{`
    .rec-dot {
      width: 5px;
      height: 5px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      margin: 0 7px;
    }

    .rec-dot_active {
      background-color: #4A0808;
    }

    .rec-dot:nth-child(4) {
      display: none;
    }
  `}</style>
        </Carousel>
      </div>
      <div className="Form-container">
        <div className="formContainer min-w-screen lg:w-full min-h-screen">
          {message && (
       <div className={`text-${messageType === "success" ? "green" : "red"}-500 mb-4`}>{message}</div>
          )}
          <form className="max-w-screen ">
            <div className="mb-6 ">
              <h2 className="text-4xl text-gray-700 font-extrabold mb-4 text-left lg:text-left">Log in</h2>
              <label htmlFor="email" className=" text-gray-500 bg-white block text-sm font-medium">
                Email address:
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full bg-white border border-gray-400 rounded-md"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className=" text-gray-600 block text-sm font-medium">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 w-full border-gray-600 border rounded-md bg-white"
                onChange={(e) => setPassword(e.target.value)}
              />
             <p className="text-left text-[#4A0808] text-sm mt-1"><br/>
  <Link to="/forgot-password" className="text-[#4A0808]" onClick={handleClick} > {/* Use Link instead of anchor tag */}
    Forgot Password?
  </Link>
</p>
            </div>
            <button
              type="button"
              className="bg-[#4A0808] button text-white p-2 rounded-md w-full hover:#4A0808 font-bold"
              onClick={handleLogin}
              style={{width:"80%"}}
                      >
                          <Box display='flex' justifyContent='center' alignItems='center'>
                           {isLoading && (
                <CircularProgress size={24} color="inherit" style={{ marginRight: '8px' }} />
              )}
                              Log In
                              </Box>
            </button>
          </form><br/><br/><br/><br/>
          <footer className="text-center py-4 bg-white font-bold text-gray-500 text-sm">
        <p>&copy; {currentYear} SJFI, All Rights Reserved.</p>
      </footer>
        </div>
      </div>
      
    </div>
  );
};

export default Login;