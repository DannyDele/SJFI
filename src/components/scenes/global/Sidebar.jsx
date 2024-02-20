import React, { useState } from 'react';
import { Sidebar as ProSidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from 'react-router-dom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../../assets/styles/Sidebar.css';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    return (
        <Link to={to} style={{ textDecoration: 'none' }}>
            <MenuItem
                className="sidebar-item"
                active={selected === title}
                style={{ color: '#FFF7F7' }}
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
                                    />
                                    <Item
                                        title='Course'
                                        to='/course'
                                        selected={selected}
                                        setSelected={setSelected}
                                    />
                                    <Item
                                        title='Class'
                                        to='/class'
                                        selected={selected}
                                        setSelected={setSelected}
                                    />
                                    <Item
                                        title='Ebook'
                                        to='/ebook'
                                        selected={selected}
                                        setSelected={setSelected}
                                    />
                                </div>
                                <Item
                                    title='Calender & Events'
                                    to='/calender'
                                    icon={<EditCalendarOutlinedIcon />}
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

    )
}

export default Sidebar;
