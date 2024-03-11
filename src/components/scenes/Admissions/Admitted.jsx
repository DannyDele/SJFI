import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, Box, Grid, Menu, MenuItem, Typography, ButtonGroup } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Avatar } from '@mui/material';

const dummyData = [
    { id: 1, name: 'John Doe', program: 'Computer Science', applicationId: 'ABC123', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', program: 'Engineering', applicationId: 'XYZ456', email: 'jane@example.com' },
    // Add more dummy data as needed
];

const Admitted = () => {
    const [open, setOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
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
    const [referee, setReferee] = useState('');
    const [data, setData] = useState(dummyData); // State to hold dummy data

    // Function to handle preview button click
    const handlePreview = (application) => {
        setSelectedApplication(application);
        setOpen(true);
        setFormData(application);
    };

    // Function to handle delete button click
    const handleDelete = (data) => {
        setSelectedApplication(data);
        setDeleteConfirmationOpen(true);
    };

    // Function to confirm and delete the selected application
    const confirmDelete = () => {
        const updatedData = data.filter(item => item.id !== selectedApplication.id); // Filter out the selected application
        setData(updatedData); // Update the data state
        setDeleteConfirmationOpen(false);
    };

    // Function to handle form submission
    const handleSubmit = () => {
        console.log("Submitted!");
        setOpen(false);
    };

    // Function to handle printing
    const handlePrint = () => {
        window.print();
    };

    // Function to set form data based on selected application
    const setFormData = (application) => {
        setSurname(application.surname || 'DOE');
        setOtherName(application.otherName || 'JOHN');
        setSex(application.sex || 'MALE');
        setMaritalStatus(application.maritalStatus || 'SINGLE');
        setDateOfBirth(application.dateOfBirth || '6TH FEB');
        setPlaceOfBirth(application.placeOfBirth || 'NIGERIA');
        setNationality(application.nationality || 'NIGERIAN');
        setStateOfOrigin(application.stateOfOrigin || 'BENUE');
        setMailingAddress(application.mailingAddress || 'NO 5 SUNCITY');
        setTelephone(application.telephone || '0905635276');
        setEmail(application.email || 'JOHNDOE@GMAIL.COM');
        setEducation(application.education || '');
        setMotivation(application.motivation || 'IM HAPPY WHEN DOING WHAT I LOVE');
        setReferee(application.referee || 'NAME:DR JOHN.');
    };

    return (
        <Box sx={{ marginTop: 4, paddingLeft: 0, paddingRight: 0 }}>
            <TableContainer component={Paper} sx={{ width: '100%', padding: 0 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" colSpan={3}>
                                <Typography variant="h5" gutterBottom>ADMITTED </Typography>
                            </TableCell>
                            <TableCell align="right" colSpan={4}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Menu
                                        id="bulk-action-menu"
                                        anchorEl={null}
                                        open={false}
                                        onClose={() => { }}
                                        MenuListProps={{
                                            'aria-labelledby': 'bulk-action-button',
                                        }}
                                    >
                                        <MenuItem onClick={() => { }}>Action 1</MenuItem>
                                        <MenuItem onClick={() => { }}>Action 2</MenuItem>
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
                        {data.map((data, index) => (
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
                                        <Button onClick={() => handleDelete(data)}>Delete</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogContent>
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
                    </DialogContent>
                </Dialog>

                <Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
                    <DialogTitle>Delete Application</DialogTitle>
                    <DialogContent>
                        <Typography>Are you sure you want to delete this application?</Typography>
                        <Box sx={{ mt: 2 }}>
                            <Button variant="outlined" onClick={confirmDelete} color="error">Delete</Button>
                            <Button variant="outlined" onClick={() => setDeleteConfirmationOpen(false)}>Cancel</Button>
                        </Box>
                    </DialogContent>
                </Dialog>
            </TableContainer>
        </Box>
    );
};

export default Admitted;
