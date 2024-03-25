import React, { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Import appropriate icon
import Applications from './Applications';
import Interview from './Interview';
import Admitted from './Admitted'; // Import AdmittedApplications component

const Admissions = () => {
    const [showApplications, setShowApplications] = useState(false);
    const [showInterviews, setShowInterviews] = useState(false);
    const [showAdmitted, setShowAdmitted] = useState(false); // Add state for admitted section

    const handleViewApplications = () => {
        setShowApplications(!showApplications); // Toggle showApplications state
        setShowInterviews(false); // Close interviews section
        setShowAdmitted(false); // Close admitted section
    };

    const handleViewInterviews = () => {
        setShowInterviews(!showInterviews); // Toggle showInterviews state
        setShowApplications(false); // Close applications section
        setShowAdmitted(false); // Close admitted section
    };

    const handleViewAdmitted = () => {
        setShowAdmitted(!showAdmitted); // Toggle showAdmitted state
        setShowApplications(false); // Close applications section
        setShowInterviews(false); // Close interviews section
    };

    return (
        <Container>
            <Box mt={5} textAlign="left" width="80vw" marginTop="1rem" padding="2rem">
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
                
                <Button
                    variant="outlined"
                    startIcon={<ArrowForwardIcon />} // Use appropriate icon
                    onClick={handleViewAdmitted}
                    sx={{
                        mr:2,
                        height: '60px', // Adjust the height as needed
                        backgroundColor: showAdmitted ? '#FCA5A5' : '#FEE2E2', // Light red background color if admitted section is open
                        color: '#B91C1C', // Dark red text color
                        '&:hover': {
                            backgroundColor: showAdmitted ? '#FCA5A5' : '#FEE2E2', // Light red background color on hover if admitted section is open
                        }
                    }}
                >
                    View Admitted
                </Button>
                {showApplications && <Applications />}
                {showInterviews && <Interview />}
                {showAdmitted && <Admitted />} {/* Render AdmittedApplications if showAdmitted is true */}
            </Box>
        </Container>
    );
};

export default Admissions;
