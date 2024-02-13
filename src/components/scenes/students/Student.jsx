import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataStudent } from "../../data/mockData"; 
import Topbar from "../global/Topbar";
import InputBase from "@mui/material/InputBase";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';




function Student() {

    // const columns = [
    //     {
    //         field: "id", headerName: "ID"
    //     },
    //     {
    //         field: "name", headerName: "Name", flex: 1, cellClassName: "name-column-cell"
    //     },
    //     {
    //         field: "age",
    //         headerName: "Age",
    //         type: "number",
    //         headerAlign: "left",
    //         align: "left",
    //     },
    //     {
    //         field: "phone",
    //         headerName: "Phone Number",
    //         flex: 1
            
    //     },
    //     {
    //         field: "email",
    //         headerName: "Email",
    //         flex: 1
            
    //     },
    //     {
    //         field: "access",
    //         headerName: "Access Level",
    //         flex: 1
            
    //     },
    // ]
  return (
      <>
          <Box display='grid'
              
              gridTemplateColumns='1.5fr 1fr 1fr 1fr'
              boxSizing='border-box'
              gap='1rem'
        padding='1.5rem'
        gridAutoRows = 'minmax(100px, auto)'
              backgroundColor='#FFF7F7'
        
          
          
          >
              <Box
                  display='flex'
                  flexDirection='column'
                  backgroundColor='#fff'
                       borderRadius='5px'
                    border='1px solid #fff'
                    boxShadow='.7px .7px .7px .7px black'
                //   padding='5rem'
                  gridRow='1/5'
                  //   gridColumn='1/5'
                  overflow='auto'
              >
                  <Box
                      display="flex"
                      alignItems="center"
                      justifyContent='space-between'
                      marginTop='1rem'>
                      <Typography
                          mr={2}
                          pl={2}
                          fontSize='20px'
                          color='#4A0808'
                      >
                          Students</Typography>

                      <Box
                          display='flex'
                      borderRadius='15px'
                    backgroundColor='#FFE3E3'
                      
                      >
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchOutlinedIcon />
        </IconButton>

        <InputBase
          sx={{
            // ml: 2,
            // flex: 1,
            backgroundColor: '#FFE3E3',
            borderRadius: '15px',
            // pr: '5rem',
            // position: 'absolute',
            // width: '100%',
          }}
          placeholder="student ID or name"
        />
      </Box>
                  </Box>
                  <hr style={{marginTop: '1rem', marginLeft: '1rem', width: '90%'}} />

                  <Box>
                      
                  </Box>
                  
              </Box>


              <Box backgroundColor='#fff'
                  borderRadius='5px'
          border='1px solid #fff'
              boxShadow='.7px .7px .7px .7px black'

              //   padding='5rem'
                  display='flex'
                  flexDirection='column'
                //   justifyContent='space-between'
                  alignItems='center'
                  gridRow='1/4'
                //   gridColumn='2/4' 
              >
                  <Typography
                   style={{fontSize:'20px', color:'#4A0808'}}
                  >Personal Information</Typography>


                  <Box display='flex' flexDirection='column' alignItems='center' marginTop='1rem'>
                      <Box backgroundColor='grey' width='50px' height='50px' position='relative' borderRadius='50px'>
                          <img src="" alt="" style={{position:'absolute'}} />
                      </Box>
                      <Box><p style={{fontSize:'16px', color: '#4A0808'}}>Jenny Walman</p></Box>
                      <Box><p style={{fontSize: '14px', color: '#4A08084D'}}>Stu ID: #21991</p></Box>
                  </Box>
                  
                  <Box marginTop='1rem' marginRight='2rem'>
                      <Typography
                      style={{fontSize: '20px', color: '#4A0808'}}
                      >Basic Details</Typography>
           <Box display='flex' justifyContent='space-between'>
            <Box display='flex' flexDirection='column'>
              
              <Box>
                <Typography sx={{ fontSize: '12px' }}>Program</Typography>
                
              </Box>
              <Box>
                
                <Typography sx={{ fontSize: '12px' }}>Class</Typography>
              
              
              
              </Box>
              <Box >
                <Typography sx={{ fontSize: '12px' }}>Gender</Typography>
              
              
              
              </Box>
              <Box>
                <Typography sx={{ fontSize: '12px' }}>Mobile</Typography>
              
              
              
              </Box>
              <Box>
                <Typography sx={{ fontSize: '12px' }}>Email</Typography>
              
              
              
              </Box>
              <Box>
                <Typography sx={{ fontSize: '12px' }}>Date of Birth</Typography>
              
              
              
              </Box>
              <Box>
                <Typography sx={{ fontSize: '12px' }}>Address</Typography>
              
              
              
              </Box>
                    </Box>
            <Box>
              
                
              <Typography sx={{ fontSize: '12px' }}> <span style={{fontSize: '12px', position: 'relative', right:'4px'}}>:</span>  Fertility Study</Typography>
              <Typography sx={{ fontSize: '12px' }} > <span style={{fontSize: '12px', position: 'relative', right:'4px'}}>:</span>Lesson A</Typography>
              <Typography sx={{ fontSize: '12px' }} > <span style={{fontSize: '12px', position: 'relative', right:'4px'}}>:</span>Female</Typography>
              <Typography sx={{ fontSize: '12px' }}> <span style={{fontSize: '12px', position: 'relative', right:'4px'}}>:</span>+235 5656</Typography>
              <Typography sx={{ fontSize: '12px' }}> <span style={{fontSize: '12px', position: 'relative', right:'4px'}}>:</span>jenny@gmail.com</Typography>
              <Typography sx={{ fontSize: '12px' }}> <span style={{fontSize: '12px'}}>:</span>09 june 1882</Typography>
              <Typography sx={{ fontSize: '12px' }}> <span style={{fontSize: '12px', position: 'relative', right:'4px'}}>:</span>Mortland Delta</Typography>







                    </Box>

                  </Box>
                  </Box>

                  <Box>
                <Typography>About Student</Typography>

                  </Box>


              </Box>
              <Box backgroundColor='#fff'
                  borderRadius='5px'
                  border='1px solid #fff'
                    boxShadow='.7px .7px .7px .7px black'

                  padding='5rem'
                  gridColumn='3/5'
              // gridRow='1/3'
              >
                  <p>Box3</p>
              </Box>
              <Box backgroundColor='#fff'
                  borderRadius='5px'
                  border='1px solid #fff'
                    boxShadow='.7px .7px .7px .7px black'

                  padding='1rem'
                  gridRow=''
              >
                  <p>Box4</p>
              </Box>
              <Box backgroundColor='#fff'
          borderRadius='5px'
          padding='1rem'
                border='1px solid #fff'
                    boxShadow='.7px .7px .7px .7px black'
>
                  <p>Box5</p>
              </Box>
              <Box backgroundColor='#fff'
                  borderRadius='5px'
                border='1px solid #fff'
                    boxShadow='.7px .7px .7px .7px black'

                  padding='1rem'
                  gridColumn='3/4'
              >
                  <p>Box6</p>
              </Box>
              
        </Box>
      </>
  )
}

export default Student