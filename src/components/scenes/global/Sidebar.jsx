import { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem, sidebarClasses, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from 'react-router-dom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CampaignIcon from '@mui/icons-material/Campaign';
import QuizIcon from '@mui/icons-material/Quiz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import '../../../assets/styles/Sidebar.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined'; // Icon for Program
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'; // Icon for Ebook
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined'; // Icon for Class
import BookOutlinedIcon from '@mui/icons-material/BookOutlined'; // Icon for Course
import { useNavigate } from "react-router-dom";

import '../../../assets/styles/Sidebar.css';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();

    return (
        <Link to={to} style={{ textDecoration: 'none' }}>
            <MenuItem
                className="sidebar-item"
                active={selected === title}
                style={{ color: '#FFF7F7', backgroundColor : '#4A0808', }}
                onClick={() => setSelected(title)}
                icon={icon}
            >
                <Typography style={{ fontSize: '15px' }}>{title}</Typography>
            </MenuItem>
        </Link>
    );
};



function Sidebar() {
    const [selected,  setSelected] = useState("Dashboard");
    const [openCourses, setOpenCourses] = useState(false);
    const [openCommunity, setOpenCommunity] = useState(false);
    const navigate = useNavigate();


        // Function to logout

    const handleClick = () => {
        if (title === 'Log Out') {
            handleLogout();
        } else {
            setSelected(title);
            navigate('/login')
        }
    };
    

 const handleLogout = () => {
        // Remove token logic here
        // For example, clear the token from local storage
        localStorage.removeItem('authToken');
        // Update the login state
        setIsLoggedIn(false);
    };
  

    return (
        <Box>
            {/* MENU ITEMS */}
            <ProSidebar
                className="sidebar-container"
                rootStyles={{
                    [`.${sidebarClasses.container}`]: {
                        backgroundColor: '#4A0808',
                        height: '110vh',
                        display: 'flex',
                        position: 'fixed',
                        padding: '1rem'
                    }
                }}
            >
                <Box display='flex' flexDirection='column' justifyContent='space-around'>

                    <Box marginTop='.5rem'
                        fontSize='14px'
                        color='#FFF7F7'
                        display='flex'
                        justifyContent='center'> <h4>ST JUDE FERTILITY INSTITUTE</h4></Box>


                  <Box>
              <Menu>
                  <Box >
                      <Item 
                          title='Dashboard'
                          to='/'
                          icon={<DashboardOutlinedIcon />}
                          selected={selected}
                      setSelected={setSelected}    
                              />
                              
                              <SubMenu
                                  label='User Management'
            title="User Management"
            icon={<PermIdentityOutlinedIcon />}
                                  className="submenu"
          >
            <Item
              title="Student Information"
              to="/students"
              icon={<SchoolOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              className="student-item"
              
            />
          </SubMenu>
                              <SubMenu
                                  label='Learning'
            title="Learning"
            icon={<MenuBookOutlinedIcon />}
                                  className="submenu"
          >

                 <Item
                          title='Program'
                          to='/programs'
                          icon={<MenuBookOutlinedIcon />}
                          selected={selected}
                          setSelected={setSelected} 
                          className="student-item"
                  
                      />
                 <Item
                          title='Courses'
                          to='/courses'
                          icon={<MenuBookOutlinedIcon />}
                          selected={selected}
                          setSelected={setSelected} 
                  
                      />
                 <Item
                          title='Classes'
                          to='/classes'
                          icon={<MenuBookOutlinedIcon />}
                          selected={selected}
                          setSelected={setSelected} 
                  
                      />
                 <Item
                          title='Library'
                          to='/ebooks'
                          icon={<MenuBookOutlinedIcon />}
                          selected={selected}
                          setSelected={setSelected} 
                  
                      />

          </SubMenu>

                      <Item
                          title='Financial Overview'
                          to='/financial'
                          icon={<PaymentOutlinedIcon />}
                          selected={selected}
                      setSelected={setSelected}    
                      />
                      <Item
                          title='Calender & Events'
                          to='/calender'
                          icon={<EditCalendarOutlinedIcon />}
                          selected={selected}
                      setSelected={setSelected}    
                              />
                    <Item
                          title='Admission Updates'
                          to='/whatsNew'
                          icon={<NotificationsActiveIcon />}
                          selected={selected}
                      setSelected={setSelected}    
                      />
                    <Item
                          title='Announcement'
                          to='/announcements'
                          icon={<CampaignIcon />}
                          selected={selected}
                      setSelected={setSelected}    
                      />
                    <Item
                          title='Exams'
                          to='/exams'
                          icon={<QuizIcon />}
                          selected={selected}
                      setSelected={setSelected}    
                      />
                              

                                {/* Admissions Component Moved After Teacher Information */}
                                <Item
                                    title='Admissions'
                                    to='/admissions'
                                    icon={<PermIdentityOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                              

         <SubMenu
                                  label='Community'
            title="Community"
            icon={<GroupsOutlinedIcon />}
                                  className="submenu"
          >
            <Item
                                        title='Add Post'
                                        to='/addpost'
                                        selected={selected}
                                        setSelected={setSelected}
                                        icon={<PostAddIcon />}
                                    />
                                    <Item
                                        title='Notifications'
                                        to='/notifications'
                                        selected={selected}
                                        setSelected={setSelected}
                                        icon={<NotificationsIcon />}
                                    />
                                    <Item
                                        title='View Post'
                                        to='/viewpost'
                                        icon={<PostAddIcon />} // You can change the icon as needed
                                        selected={selected}
                                        setSelected={setSelected}
                                    />
          </SubMenu>

                                
                  </Box>
                      </Menu>
                  </Box>
                  
                  <Box>
                        <Menu>
                            
                      <Item
                            title='Log Out'
                            to='/logout'
                            icon={<LogoutOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            handleLogout={handleClick}
                        />


                         <Item
                          title='Settings'
                          to='/settings'
                          icon={<SettingsOutlinedIcon />}
                          selected={selected}
                      setSelected={setSelected}    
                  />
                  
                    
                          </Menu>

                  </Box>
                  </Box>
        </ProSidebar>
          
    </Box>


    )
}

export default Sidebar


