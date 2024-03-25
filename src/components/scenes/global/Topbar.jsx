import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';




function Topbar() {
 const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [role, setRole] = useState('');    
 

  useEffect(() => {
        const usernameFromCookie = Cookies.get('username');
        const profileImageFromCookie = Cookies.get('profileImage');
        const roleFromCookie = Cookies.get('role');

        if (usernameFromCookie) setUsername(usernameFromCookie);
        if (profileImageFromCookie) setProfileImage(profileImageFromCookie);
        if (roleFromCookie) setRole(roleFromCookie);
    }, []);




     const handleProfileImageChange = () => {
        // Open file manager here
        // You can use libraries like react-dropzone or implement your own file upload functionality
        console.log('Opening file manager for profile image change...');
    }

    return (
        <>
      <Box display='flex' justifyContent='space-between' p={4} mt={4}>
            {/* SEARCH BAR */}
                  <p style={{fontSize:'24px', color: '#4A0808', marginTop: '0.3rem'}}>Dashboard</p>

         
              
              

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
                            <img src={profileImage} alt="" style={{ position: 'absolute' }} /
                            >
                            <IconButton>
                                <PhotoCameraIcon style={{position:'absolute', top:'2rem', left: '3rem'}}  onClick={handleProfileImageChange} />
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