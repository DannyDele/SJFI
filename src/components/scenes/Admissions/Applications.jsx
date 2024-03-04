import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const dummyData = [
    { id: 1, name: 'John Doe', program: 'Computer Science', applicationId: 'ABC123', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', program: 'Engineering', applicationId: 'XYZ456', email: 'jane@example.com' },
    // Add more dummy data as needed
];

const Applications = () => {
    const [open, setOpen] = useState(false); 
    const [selectedApplication, setSelectedApplication] = useState(null); 
    const [surname, setSurname] = useState(''); 
    const [otherName, setOtherName] = useState(''); 
    const [sex, setSex] = useState('');
    const [maritalStatus, setMaritalStatus] = useState(''); 
    const [dateOfBirth, setDateOfBirth] = useState(''); 
    const [placeOfBirth, setPlaceOfBirth] = useState(''); 
    const [nationality, setNationality] = useState(''); 
    const [stateOfOrigin, setStateOfOrigin] = useState(''); 
    const [mailingAddress, setMailingAddress] = useState(''); 
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState(''); 
    const [education, setEducation] = useState(''); 
    const [motivation, setMotivation] = useState(''); 
    const [referee, setReferee] = useState({ name: '', institute: '', rank: '', phoneNumber: '' }); 

    // Function to handle preview button click
    const handlePreview = (application) => {
        setSelectedApplication(application);
        setOpen(true); // Open the dialog
    };

    // Function to handle form submission
    const handleSubmit = () => {
        // Implement form submission logic here
        console.log("Submitted!");
        setOpen(false); // Close the dialog after submission
    };

    // Function to handle printing
    const handlePrint = () => {
        window.print();
    };

    return (
        <Box sx={{ marginTop: 4, paddingLeft: 4, paddingRight: 4 }}> {/* Adjust margin and padding as needed */}
            <TableContainer component={Paper}>
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
                                        onClose={() => {}}
                                        MenuListProps={{
                                            'aria-labelledby': 'bulk-action-button',
                                        }}
                                    >
                                        <MenuItem onClick={() => {}}>Action 1</MenuItem>
                                        <MenuItem onClick={() => {}}>Action 2</MenuItem>
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
                                    <Button variant="outlined" onClick={() => handlePreview(data)}>Preview</Button>
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
                            <Grid container spacing={2}>
                            <Grid item xs={6}>
                                    <TextField
                                        label="Surname"
                                        variant="outlined"
                                        fullWidth
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Other Name"
                                        variant="outlined"
                                        fullWidth
                                        value={otherName}
                                        onChange={(e) => setOtherName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Sex"
                                        variant="outlined"
                                        fullWidth
                                        value={sex}
                                        onChange={(e) => setSex(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Marital Status"
                                        variant="outlined"
                                        fullWidth
                                        value={maritalStatus}
                                        onChange={(e) => setMaritalStatus(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Date of Birth"
                                        variant="outlined"
                                        fullWidth
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Place of Birth"
                                        variant="outlined"
                                        fullWidth
                                        value={placeOfBirth}
                                        onChange={(e) => setPlaceOfBirth(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Nationality"
                                        variant="outlined"
                                        fullWidth
                                        value={nationality}
                                        onChange={(e) => setNationality(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="State of Origin"
                                        variant="outlined"
                                        fullWidth
                                        value={stateOfOrigin}
                                        onChange={(e) => setStateOfOrigin(e.target.value)}
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
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Telephone"
                                        variant="outlined"
                                        fullWidth
                                        value={telephone}
                                        onChange={(e) => setTelephone(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Email Address"
                                        variant="outlined"
                                        fullWidth
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Referee"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={`${referee.name}, ${referee.institute}, ${referee.rank}, ${referee.phoneNumber}`}
                                        onChange={(e) => {
                                            const values = e.target.value.split(',');
                                            setReferee({
                                                name: values[0].trim(),
                                                institute: values[1].trim(),
                                                rank: values[2].trim(),
                                                phoneNumber: values[3].trim()
                                            });
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
            </TableContainer>
        </Box>
    );
};

export default Applications;
