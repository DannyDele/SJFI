import React, { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Interview from './Interview';
import Applications from './Applications';

const Admissions = () => {
    const [showApplications, setShowApplications] = useState(false);
    const [showInterviews, setShowInterviews] = useState(false);

    const handleViewApplications = () => {
        setShowApplications(!showApplications); // Toggle showApplications state
        setShowInterviews(false); // Close interviews section
    };

    const handleViewInterviews = () => {
        setShowInterviews(!showInterviews); // Toggle showInterviews state
        setShowApplications(false); // Close applications section
    };

    return (
        <Container maxWidth="md">
            <Box mt={5} textAlign="left">
                <Typography variant="h4" gutterBottom>
                    Admissions
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<PersonIcon />}
                    sx={{
                        mr: 2,
                        height: '60px',
                        backgroundColor: showApplications ? '#FCA5A5' : '#FEE2E2', // Change background color if applications section is open
                        color: '#B91C1C',
                        '&:hover': {
                            backgroundColor: showApplications ? '#FCA5A5' : '#FEE2E2', // Change hover background color if applications section is open
                        }
                    }}
                    onClick={handleViewApplications}
                >
                    View Applications
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<PeopleAltIcon />}
                    sx={{
                        mr: 2,
                        height: '60px',
                        backgroundColor: showInterviews ? '#FCA5A5' : '#FEE2E2', // Change background color if interviews section is open
                        color: '#B91C1C',
                        '&:hover': {
                            backgroundColor: showInterviews ? '#FCA5A5' : '#FEE2E2', // Change hover background color if interviews section is open
                        }
                    }}
                    onClick={handleViewInterviews}
                >
                    View Interviews
                </Button>
                 
                  {/* <Button
                    variant="contained"
                    component={Link}
                    to="/view-admitted"
                    startIcon={<YourAdmittedIcon />} // Replace with appropriate icon
                    sx={{
                        height: '48px', // Adjust the height as needed
                        backgroundColor: '#FEE2E2', // Light red background color
                        color: '#B91C1C', // Dark red text color
                        '&:hover': {
                            backgroundColor: '#FCA5A5', // Light red background color on hover
                        }
                    }}
                >
                    View Admitted
                </Button> */}
                {showApplications && <Applications />}
                {showInterviews && <Interview />}
            </Box>
        </Container>
    );
};

export default Admissions;
