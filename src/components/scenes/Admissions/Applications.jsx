import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, Box, Grid, Menu, MenuItem, Typography, ButtonGroup } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Avatar } from '@mui/material';

const dummyData = [
    { id: 1, name: 'John Doe', program: 'Computer Science', applicationId: 'ABC123', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', program: 'Engineering', applicationId: 'XYZ456', email: 'jane@example.com' },
    // Add more dummy data as needed
];

const Applications = () => {
    const [open, setOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [acceptFormOpen, setAcceptFormOpen] = useState(false);
    const [interviewDate, setInterviewDate] = useState(new Date());
    const [interviewTime, setInterviewTime] = useState(new Date());
    const [interviewLink, setInterviewLink] = useState('');
    const [acceptedApplication, setAcceptedApplication] = useState(null);
    const [surname, setSurname] = useState('Doe'); // Dummy data
    const [otherName, setOtherName] = useState('John'); // Dummy data
    const [sex, setSex] = useState('Male'); // Dummy data
    const [maritalStatus, setMaritalStatus] = useState('Single'); // Dummy data
    const [dateOfBirth, setDateOfBirth] = useState('6th Feb'); // Dummy data
    const [placeOfBirth, setPlaceOfBirth] = useState('Nigeria'); // Dummy data
    const [nationality, setNationality] = useState('Nigerian'); // Dummy data
    const [stateOfOrigin, setStateOfOrigin] = useState('Benue'); // Dummy data
    const [mailingAddress, setMailingAddress] = useState('No 5 Suncity'); // Dummy data
    const [telephone, setTelephone] = useState('0905635276'); // Dummy data
    const [email, setEmail] = useState('johndoe@gmail.com'); // Dummy data
    const [education, setEducation] = useState(''); // Dummy data
    const [motivation, setMotivation] = useState('I\'m happy when doing what I love'); // Dummy data
    const [referee, setReferee] = useState('Name: Dr. John.'); // Dummy data



    // Function to handle preview button click
    const handlePreview = (application) => {
        setSelectedApplication(application);
        setOpen(true); // Open the dialog
    };

    // Function to handle accept button click
    const handleAccept = (data) => {
        setSelectedApplication(data);
        setAcceptFormOpen(true);
    };

    // Function to handle form submission
    const handleSubmit = () => {
        // Implement form submission logic here
        console.log("Submitted!");
        setOpen(false); // Close the dialog after submission
        setAcceptFormOpen(false); // Close the accept form
        // Store the accepted application data
        setAcceptedApplication({
            ...selectedApplication,
            interviewDate,
            interviewTime,
            interviewLink
        });
    };

    // Function to handle printing
    const handlePrint = () => {
        window.print();
    };

    const handleDeny = (data) => {
        // Implement deny logic here
        console.log("Application denied:", data);
    };

    return (
        <Box sx={{ marginTop: 4, paddingLeft: 0, paddingRight: 0 }}> {/* Remove padding */}
            {/* Adjust margin and padding as needed */}
            <TableContainer component={Paper} sx={{ width: '100%', padding: 0 }}> {/* Expand width and remove padding */}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" colSpan={3}>
                                <Typography variant="h5" gutterBottom>APPLICATIONS</Typography>
                            </TableCell>
                            <TableCell align="right" colSpan={4}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Menu
                                        id="bulk-action-menu"
                                        anchorEl={null}
                                        open={false} // Set to true to open the menu
                                        onClose={() => { }}
                                        MenuListProps={{
                                            'aria-labelledby': 'bulk-action-button',
                                        }}
                                    >
                                        <MenuItem onClick={() => { }}>Action 1</MenuItem>
                                        <MenuItem onClick={() => { }}>Action 2</MenuItem>
                                        {/* Add more menu items as needed */}
                                    </Menu>
                                    <Button
                                        id="bulk-action-button"
                                        variant="outlined"
                                        endIcon={<ArrowDropDownIcon />}
                                        sx={{ mr: 2 }}
                                    >
                                        Bulk Action
                                    </Button>
                                    <Button variant="contained" onClick={() => console.log("Apply clicked")}>Apply</Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><input type="checkbox" /></TableCell>
                            <TableCell>S/N</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Program</TableCell>
                            <TableCell>Application ID</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyData.map((data, index) => (
                            <TableRow key={data.id}>
                                <TableCell><input type="checkbox" /></TableCell>
                                <TableCell>{data.id}</TableCell>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.program}</TableCell>
                                <TableCell>{data.applicationId}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell>
                                    <ButtonGroup variant="outlined" color="primary" aria-label="outlined primary button group">
                                        <Button onClick={() => handlePreview(data)}>Preview</Button>
                                        <Button onClick={() => handleAccept(data)}>Accept</Button>
                                        <Button onClick={() => handleDeny(data)}>Deny</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Dialog for preview form */}
                <Dialog open={open} onClose={() => setOpen(false)} >
                    <DialogContent>
                        <Box>
                        <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </Box>
                            <Grid container spacing={2}>
                            <Grid item xs={6}>
                                    <TextField
                                        label="Surname"
                                        variant="outlined"
                                        fullWidth
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Other Name"
                                        variant="outlined"
                                        fullWidth
                                        value={otherName}
                                        onChange={(e) => setOtherName(e.target.value)}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Sex"
                                        variant="outlined"
                                        fullWidth
                                        value={sex}
                                        onChange={(e) => setSex(e.target.value)}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Marital Status"
                                        variant="outlined"
                                        fullWidth
                                        value={maritalStatus}
                                        onChange={(e) => setMaritalStatus(e.target.value)}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Date of Birth"
                                        variant="outlined"
                                        fullWidth
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Place of Birth"
                                        variant="outlined"
                                        fullWidth
                                        value={placeOfBirth}
                                        onChange={(e) => setPlaceOfBirth(e.target.value)}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Nationality"
                                        variant="outlined"
                                        fullWidth
                                        value={nationality}
                                        onChange={(e) => setNationality(e.target.value)}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="State of Origin"
                                        variant="outlined"
                                        fullWidth
                                        value={stateOfOrigin}
                                        onChange={(e) => setStateOfOrigin(e.target.value)}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Mailing Address"
                                        variant="outlined"
                                        fullWidth
                                        multiline // Allow multiline input
                                        rows={4} // Set the number of rows
                                        value={mailingAddress}
                                        onChange={(e) => setMailingAddress(e.target.value)}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Telephone"
                                        variant="outlined"
                                        fullWidth
                                        value={telephone}
                                        onChange={(e) => setTelephone(e.target.value)}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Email Address"
                                        variant="outlined"
                                        fullWidth
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Education"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={education}
                                        onChange={(e) => setEducation(e.target.value)}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Motivation"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={2}
                                        value={motivation}
                                        onChange={(e) => setMotivation(e.target.value)}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Referee"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={referee}
                                        onChange={(e) => setReferee(e.target.value)}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                        
                                    />
                                </Grid>
                            </Grid>
                                <Box sx={{ mt: 2 }}>
                                    <Button variant="contained" onClick={handlePrint} sx={{ backgroundColor: '##4A0808', color: '#fff' }}>Print</Button>
                                </Box>
                            </form>
                        </Box>
                    </DialogContent>
                </Dialog>

                {/* Dialog for accept form */}
                <Dialog open={acceptFormOpen} onClose={() => setAcceptFormOpen(false)} >
                <DialogTitle>Accept Application</DialogTitle>
<DialogContent>
    <form onSubmit={handleSubmit} style={{ height: '400px' }}>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div style={{ height: '200px' }}> {/* Adjust the height here */}
                    <DatePicker
                        selected={interviewDate}
                        onChange={date => setInterviewDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                        placeholderText="Select Interview Date"
                    />
                </div>
            </Grid>
            <Grid item xs={6}>
                <div style={{ height: '200px' }}> {/* Adjust the height here */}
                    <DatePicker
                        selected={interviewTime}
                        onChange={time => setInterviewTime(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className="form-control"
                        placeholderText="Select Interview Time"
                    />
                </div>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Interview Link"
                    variant="outlined"
                    fullWidth
                    value={interviewLink}
                    onChange={(e) => setInterviewLink(e.target.value)}
                />
            </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
            <Button variant="contained" type="submit">Submit</Button>
        </Box>
    </form>
</DialogContent>

                </Dialog>
            </TableContainer>
        </Box>
    );
};

export default Applications;