import React from 'react';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Box, Menu, MenuItem, Checkbox } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Dummy data for interviews
const dummyInterviews = [
  { id: 1, name: 'John Doe', program: 'Computer Science', applicationId: 'APP123' },
  { id: 2, name: 'Jane Smith', program: 'Engineering', applicationId: 'APP456' },
  // Add more dummy data as needed
];

const Interviews = () => {
  return (
    <Container maxWidth="md">
      <Box mt={5} textAlign="left">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" gutterBottom>
           INTERVIEWS
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell align="center" style={{ width: '10%' }}>S/N</TableCell>
              <TableCell align="center" style={{ width: '20%' }}>Name</TableCell>
              <TableCell align="center" style={{ width: '20%' }}>Program</TableCell>
              <TableCell align="center" style={{ width: '20%' }}>Application ID</TableCell>
              <TableCell align="center" style={{ width: '30%' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyInterviews.map((interview, index) => (
              <TableRow key={interview.id}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{interview.name}</TableCell>
                <TableCell align="center">{interview.program}</TableCell>
                <TableCell align="center">{interview.applicationId}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
                    Accept
                  </Button>
                  <Button variant="contained" color="error">
                    Deny
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default Interviews;
