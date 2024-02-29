<<<<<<< HEAD
import { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem, sidebarClasses, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
=======
import React, { useState } from 'react';
import { Sidebar as ProSidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
>>>>>>> sjfiorigin/mary-dev
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
<<<<<<< HEAD
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CampaignIcon from '@mui/icons-material/Campaign';
import QuizIcon from '@mui/icons-material/Quiz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import '../../../assets/styles/Sidebar.css'


=======
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined'; // Icon for Program
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'; // Icon for Ebook
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined'; // Icon for Class
import BookOutlinedIcon from '@mui/icons-material/BookOutlined'; // Icon for Course
import '../../../assets/styles/Sidebar.css';
>>>>>>> sjfiorigin/mary-dev

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
<<<<<<< HEAD
=======
    const [openCommunity, setOpenCommunity] = useState(false);
>>>>>>> sjfiorigin/mary-dev

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
<<<<<<< HEAD

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
            <Item
              title="Teacher Information"
              to="/teachers"
              icon={<HowToRegOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Public User"
              to="/publicusers"
              icon={<GroupsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </SubMenu>
                              <SubMenu
                                  label='Course Curriculum'
            title="Course Curriculum"
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
                          title='Ebook'
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
                          title='WhatsNew'
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
                    <Item
                          title='Zoom'
                          to='/zoom'
                          icon={<MeetingRoomIcon />}
                          selected={selected}
                      setSelected={setSelected}    
                      />
                  </Box>
                      </Menu>
                  </Box>
                  
                  <Box>
                    <Menu>
                         <Item
                          title='Settings'
                          to='/settings'
                          icon={<SettingsOutlinedIcon />}
                          selected={selected}
                      setSelected={setSelected}    
                  />
                  
                      <Item
                          title='Log Out'
                          to='/logout'
                          icon={<LogoutOutlinedIcon />}
                          selected={selected}
                      setSelected={setSelected}    
                          />
                          </Menu>

                  </Box>
                  </Box>
        </ProSidebar>
          
    </Box>
=======

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
                                <Item
                                    title='Student Information'
                                    to='/students'
                                    icon={<SchoolOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title='Teacher Information'
                                    to='/teachers'
                                    icon={<GroupsOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title='Financial Overview'
                                    to='/financial'
                                    icon={<PaymentOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <MenuItem
                                    className="sidebar-item"
                                    active={selected === "Course Curriculum"}
                                    style={{ color: '#FFF7F7' }}
                                    onClick={() => setOpenCourses(!openCourses)}
                                    icon={<MenuBookOutlinedIcon />}
                                    suffixIcon={<ExpandMoreIcon />}
                                >
                                    <Typography style={{ fontSize: '15px' }}>Course Curriculum</Typography>
                                </MenuItem>
                                <div style={{ paddingLeft: '30px', display: openCourses ? 'block' : 'none' }}>
                                    <Item
                                        title='Program'
                                        to='/program'
                                        selected={selected}
                                        setSelected={setSelected}
                                        icon={<ComputerOutlinedIcon />} // Icon for Program
                                    />
                                    <Item
                                        title='Course'
                                        to='/course'
                                        selected={selected}
                                        setSelected={setSelected}
                                        icon={<BookOutlinedIcon />} // Icon for Course
                                    />
                                    <Item
                                        title='Class'
                                        to='/class'
                                        selected={selected}
                                        setSelected={setSelected}
                                        icon={<ClassOutlinedIcon />} // Icon for Class
                                    />
                                    <Item
                                        title='Ebook'
                                        to='/ebook'
                                        selected={selected}
                                        setSelected={setSelected}
                                        icon={<DescriptionOutlinedIcon />} // Icon for Ebook
                                    />
                                </div>
                                <Item
                                    title='Calender & Events'
                                    to='/calender'
                                    icon={<EditCalendarOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <MenuItem
                                    className="sidebar-item"
                                    active={selected === "Community"}
                                    style={{ color: '#FFF7F7' }}
                                    onClick={() => setOpenCommunity(!openCommunity)}
                                    icon={<GroupsOutlinedIcon />}
                                    suffixIcon={<ExpandMoreIcon />}
                                >
                                    <Typography style={{ fontSize: '15px' }}>Community</Typography>
                                </MenuItem>
                                <div style={{ paddingLeft: '30px', display: openCommunity ? 'block' : 'none' }}>
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

                                </div>
                            </Box>
                        </Menu>
                    </Box>

                    <Box>
                        <Menu>
                            <Item
                                title='Settings'
                                to='/settings'
                                icon={<SettingsOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title='Log Out'
                                to='/logout'
                                icon={<LogoutOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </Menu>
                    </Box>
                </Box>
            </ProSidebar>
        </Box>
>>>>>>> sjfiorigin/mary-dev

    )
}

<<<<<<< HEAD
export default Sidebar


=======
export default Sidebar;
>>>>>>> sjfiorigin/mary-dev
