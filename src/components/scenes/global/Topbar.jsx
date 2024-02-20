import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


function Topbar() {
    return (
        <>
      <Box display='flex' justifyContent='space-between' p={4} mt={4}>
            {/* SEARCH BAR */}
                  <p style={{fontSize:'24px', color: '#4A0808', marginTop: '0.3rem'}}>Dashboard</p>

                <Box display='flex'
                    borderRadius='15px'
                    backgroundColor='#FFE3E3'
                    marginRight='15rem'
                    // position='relative'
                    // width='100%'
                >
              
          <IconButton type="button" sx={{p : 1,}}>
              <SearchOutlinedIcon />
          </IconButton>
              
                    <InputBase sx={{
                        ml: 2,
                        flex: 1,
                        backgroundColor:'#FFE3E3',
                        borderRadius: '15px',
                        pr: '5rem',
                        // position: 'absolute',
                        width: '300%'
                    }} placeholder='Search' />
              
          </Box>

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
                        <Box backgroundColor='#4A0808' width='50px' height='50px' borderRadius='50px' position='relative'>
                            <img src="" alt="" style={{position:'absolute'}} />
                        </Box>
                        
                        <Box>
                            <Typography sx={{fontSize:'16px', fontWeight: 'bold', color: '#4A0808'}}>Steven John</Typography>
                            <Typography sx={{fontSize:'14px', fontWeight: 'bold', color: '#4A08084D' }}>Admin</Typography>
                        </Box>
                        </Box>
            </Box>
 
        </Box>
            <hr />
            </>
        
  )
}

export default Topbar