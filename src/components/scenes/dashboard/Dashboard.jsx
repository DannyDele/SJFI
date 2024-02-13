import { Box, IconButton, Typography, useTheme, Button } from "@mui/material";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined'
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { mockDataStudent } from "../../data/mockData";
import BarChart from "../../charts/BarChart";
import PieChart from "../../charts/PieChart";
import FlowChart from "../../charts/FlowChart";
import TeachersList from "../../Tables/TeachersList";


const Dashboard = () => {
  return (
    <div  className="dashboard"  >

      <Box marginTop='1rem'
        marginLeft='1rem'
        backgroundColor='#FFF7F7'
        display='flex'
        flexDirection='column'
        justifyContent='center'

      >
<Box 
        display='flex'
        justifyContent='space-around'
        >
          <Box 
            padding='1rem'
            display='flex'
            justifyContent='center'
            alignItems='center'
            backgroundColor='#FFE3E3'
          >
            
            <GroupOutlinedIcon sx={{backgroundColor: '#E3A1A1', borderRadius: '10px', fontSize: '2rem'}} />
            <Typography sx={{fontSize: '12px', borderLeft: '1px solid black', marginLeft: '1rem', padding: '.5rem'}}>
              Number of Students
              <p>34344</p>
            </Typography>

            </Box>
          <Box
            padding='1rem'
            display='flex'
            justifyContent='center'
            alignItems='center'
            backgroundColor='#FFE3E3'
          >
            
            
            <HowToRegOutlinedIcon sx={{backgroundColor: '#E3A1A1', borderRadius: '10px', fontSize: '2rem'}} />
            <Typography sx={{fontSize: '12px', borderLeft: '1px solid black', marginLeft: '1rem', padding: '.5rem'}}>
              Number of Teachers
              <p>114</p>
            </Typography>
          </Box>
          

          <Box
            padding='1rem'
            display='flex'
            justifyContent='center'
            alignItems='center'
            backgroundColor='#FFE3E3'>
            

            <GroupsOutlinedIcon sx={{backgroundColor: '#E3A1A1', borderRadius: '10px', fontSize: '2rem'}} />
            <Typography sx={{fontSize: '12px', borderLeft: '1px solid black', marginLeft: '1rem', padding: '.5rem'}}>
              Number of Employees
              <p>286</p>
            </Typography>

          </Box>
          

          <Box
            padding='1rem'
            display='flex'
            justifyContent='center'
            alignItems='center'
            backgroundColor='#FFE3E3'
          >


            <AccountBalanceOutlinedIcon sx={{backgroundColor: '#E3A1A1', borderRadius: '10px', fontSize: '2rem'}} />
            <Typography sx={{fontSize: '12px', borderLeft: '1px solid black', marginLeft: '1rem', padding: '.5rem'}}>
              Total Revenue
              <p>NGN 3,045,488.98</p>
            </Typography>

          </Box>
          
        </Box>




      <Box display='grid'
        gridTemplateColumns='2fr 2fr 2fr 2fr'
        gap='1rem'
        padding='1rem'
        
      >
          <Box
            border='1px solid black'
            width='400px'
            height='300px'
            display='flex'
            flexDirection='column'
            padding='1rem'
          >

            <Box
             display='flex'
              justifyContent='space-between'
            >
              <Box>
                <Typography
                 sx={{color: '#4A0808', fontSize:'23.66px'}}

                >Students</Typography>
              </Box>
              <Box>
  
       <select style={{backgroundColor: '#FFE3E3', borderRadius: '5px', padding: '.2rem', marginTop: '.3rem'}} name="lesson" id="lesson">
                  <option value="Lesson A">Lesson A</option>
                  <option value="Lesson B">Lesson B</option>
                  <option value="Lesson C">Lesson C</option>
              </select>
              </Box>
            </Box>
          <PieChart/>
     
          </Box>

          <Box
            border='1px solid black'
            gridColumn='2/5'
            height='300px'
            padding='1.5rem'
            overflow='auto' 
          >
            <Box
            display='flex'
                justifyContent='space-between'
            >
              <Box>
                <Typography
                 sx={{color: '#4A0808', fontSize:'23.66px'}}

                >Teachers List</Typography>
                </Box>
              <Box>
              <HowToRegOutlinedIcon/>
              </Box>
            </Box>
   
         <TeachersList/>
          </Box>

          <Box
            border='1px solid black'
            height='300px'
            width='400px'
            display='flex'
            flexDirection='column'
            padding='1.5rem'
          >

            <Box
              display='flex'
              justifyContent='space-between'  
            >
              <Box>

                <Typography
                 sx={{color: '#4A0808', fontSize:'23.66px'}}
                >Attendance</Typography>
              </Box>
              <Box>
                <select style={{backgroundColor: '#FFE3E3', borderRadius: '5px', padding: '.2rem', marginTop: '.3rem'}} name="attendance" id="attendance">
                  <option value="This week">This week</option>
                  <option value="Last month">Last month</option>
              </select>
             
              </Box>
          </Box>

       <BarChart/>
            
        </Box>

          <Box
            border='1px solid black'
            gridColumn='2/5'
            display='flex'
            flexDirection='column'
            height='300px'
            padding='1.5rem'

          >

            <Box>
              <Typography
              sx={{color: '#4A0808', fontSize:'23.66px'}}

              >
                Earnings
              </Typography>
            </Box>
          <FlowChart/>

          </Box>
        </Box>
        
        </Box>
    </div>
  );
}

export default Dashboard;
