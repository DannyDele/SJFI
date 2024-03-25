import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';


import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'CustomAlert';




function Topbar() {
 const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [role, setRole] = useState('');   
    const [loadingUpdate, setLoadingUpdate] = useState(false); // State to track delete loading
    const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
        const [token, setToken] = useState('');

    
    
    useEffect(() => {
        const authToken = Cookies.get('authToken');

        if (authToken) {
            setToken(authToken);
            console.log('Token:', authToken)
        }
    })
 

  useEffect(() => {
        const usernameFromCookie = Cookies.get('username');
        const profileImageFromCookie = Cookies.get('profileImage');
        const roleFromCookie = Cookies.get('role');

        if (usernameFromCookie) setUsername(usernameFromCookie);
        if (profileImageFromCookie) setProfileImage(profileImageFromCookie);
        if (roleFromCookie) setRole(roleFromCookie);
    }, []);

// Funtion to upload Profile Picture

 const handleProfileImageChange = () => {
        // Trigger file input click
        document.getElementById('fileInput').click();
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                // Set loading state to true while uploading
                setLoadingUpdate(true);
                // Create FormData object
                const formData = new FormData();
                formData.append('file', file);

                // Send POST request to the endpoint
                const response = await fetch('https://api.stj-fertilityinstitute.com/upload', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    // If request is successful, do something with the response
                    console.log('File uploaded successfully');
                   const responseData = await response.text();
console.log('Raw response data:', responseData);
const profileData = JSON.parse(responseData);

                    // const profileData = await response.json()
                    console.log('Profile Data:', profileData)
                    const filePath = profileData.path
                    console.log('File Path:', filePath)
                    const updatePath = `https://api.stj-fertilityinstitute.com/file/${filePath}`
                //       const formDataProfile = new FormData();
                // formDataProfile.append('profileimage', updatePath);
                    

  //  // Send PUT request to update the profile picture URL
                const updateResponse = await fetch(`https://api.stj-fertilityinstitute.com/api/profile`, {
                    method: 'PUT',
                    headers: {
                        "Authorization": `bearer ${token}`
                    },
                    body: JSON.stringify({ profileimage: updatePath }) // Assuming your API accepts JSON
                });

                if (updateResponse.ok) {
                    const updateRes = await updateResponse.json();
                    console.log('Profile picture updated successfully:', updateRes);

                    // Update profileImage state
                    setProfileImage(updatePath);

                    // Show success message
                    setSuccessMessageVisible(true);

                    // Update the cookie if necessary
                    Cookies.set('profileImage', updatePath);
                } else {
                    console.error('Failed to update profile picture');
                }


                } else {
                    // If request fails, handle the error
                    console.error('Failed to upload file');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }finally {
                // Set loading state back to false after upload completes
                setLoadingUpdate(false);
            }
        }
    }


    return (
        <>
      <Box display='flex' justifyContent='space-between' p={4} mt={4}>
            {/* SEARCH BAR */}
                  <p style={{fontSize:'24px', color: '#4A0808', marginTop: '0.3rem'}}>Dashboard</p>

         
              
                  {/* Snackbar for Success Message */}
        <Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Profile Image Updated successful! 
          </Alert>
      </Snackbar>
              

          {/* ICONS */}
          <Box display='flex'>
              <IconButton>
                  <EmailOutlinedIcon/>
              </IconButton>
              <IconButton>
                  <NotificationsOutlinedIcon/>
              </IconButton>
              
          </Box>

                <Box>
                    
                    <Box display='flex' justifyContent='center' alignItems='center' >
                        <Box  width='80px' height='80px' borderRadius='50px' position='relative'>
                            <img src={profileImage} alt="" style={{
                                position: 'absolute',
                                width:'60px',
                                  height:'60px',
                                borderRadius: '50%'
                            }} /
                            >
                     <CircularProgress size={50} thickness={2} style={{ position: 'absolute', top: '.5rem', left: '.5rem', visibility: loadingUpdate ? 'visible' : 'hidden' }} />

                          <input type="file" id="fileInput" style={{display: 'none'}} onChange={handleFileChange} />
                            <IconButton>
                                <PhotoCameraIcon style={{position:'absolute', top:'2rem', left: '3rem',zIndex:'999'}}  onClick={handleProfileImageChange} />
                            </IconButton>

                        </Box>
                        
                        <Box>
                            <Typography sx={{fontSize:'16px', fontWeight: 'bold', color: '#4A0808'}}>{username}</Typography>
                            <Typography sx={{fontSize:'14px', fontWeight: 'bold', color: '#4A08084D' }}>{role}</Typography>
                        </Box>
                        </Box>
            </Box>
 
        </Box>
            <hr />
            </>
        
  )
}

export default Topbar