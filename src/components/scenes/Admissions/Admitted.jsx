import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, Box, Grid, Menu, MenuItem, Typography, ButtonGroup } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Avatar } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import 'react-datepicker/dist/react-datepicker.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from 'js-cookie';





// Store the endpoint in a variable
const API_ENDPOINT = "https://api.stj-fertilityinstitute.com";

// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));




const Admitted = () => {
    const [token, setToken] = useState('');

    const [open, setOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
      const [isLoading, setIsLoading] = useState(false);

  
    const [data, setData] = useState([]);






  useEffect(() => {
     
    const authToken = Cookies.get('authToken');

 if (authToken) {
      setToken(authToken);
      console.log('Token:', token)
    }
        const fetchData = async (authToken) => {
            try {
                                  setIsLoading(true)

                const response = await fetch(`${API_ENDPOINT}/api/enroll`, {
                    headers: {
                        "Authorization": `bearer ${authToken}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();

                console.log('Admitted Student:', jsonData)

                const admittedStudents = jsonData.filter(student => student.admitted === true);
                setData(admittedStudents);
            } catch (error) {
                console.error('Error fetching data:', error);
            }finally {
            setIsLoading(false)
        }
        };

        fetchData(authToken);
    }, []);




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



  let counter = 1;

const columns = [
  {
    headerName: 'S/N',
    flex: 0.5,
    renderCell: (params) => {
      const rowIndex = data.findIndex(row => row === params.row) + 1;
      return <span>{rowIndex}</span>;
    },
  },
    {
    field: 'student_application.name',
    headerName: 'Name',
    flex: 0.5,
    renderCell: (params) => (
      <span>{`${params.row.student_application?.first_name} ${params.row.student_application.sur_name}`}</span>
    ),
           },
  { field: 'programTitle', headerName: 'Program', flex: 0.5, renderCell: (params) => <span>{params.row.program?.title}</span> },
        { field: '_id', headerName: 'Application ID', flex: 0.5 },
  {
    field: 'student_application.email',
    headerName: 'Email',
    flex: 0.5,
    renderCell: (params) => (
      <span>{params.row.student_applicatio?.email}</span>
    ),
    },        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <Button variant='contained' color='primary' onClick={() => handlePreview(params.row)}>Preview</Button>
            ),
        },
    ];

  


      // Recursive function to render form fields
const renderFormFields = (data, parentKey = '') => {
  // Mapping object for custom labels
  const customLabels = {
    sur_name: 'Last Name',
    email: 'Email Address',
    other_name: 'Other name',
    frist_name: 'First name',
    marital_status: 'Marital Status',
    dob: 'Date of birth',
    pob: 'Place of birth',
    state: 'State',
    nationality: 'Nationality',
    address: 'Address',
    phone_number: 'Phone Number',
    office_number: 'Office Number',
    mailing_address: 'Mailing Address',
    institution: 'Institution',
    level: 'Level',
    subject: 'Subject',
    grade: 'Grade',
    date: 'Date',
    name: 'Name',
    nature: 'Nature',
    position: 'Position',
    rank: 'Rank',
    phone: 'Phone Number',
    explaination: 'What are you looking to achieve taking this Program',
    // Add more custom labels as needed
  };




const elements = [];

  // Render passport image at the top
  if (data.passport) {
    elements.push(
      <div key={parentKey + 'passport'}>
        <img src={data.passport} alt="Passport" style={{ maxWidth: '100px', display:'flex', position:'relative', marginLeft:'60rem' }} /> {/* Display passport as an image */}
      </div>
    );
  }

  // Render other form fields
  Object.keys(data).forEach((property) => {
  if (property !== 'passport' && !property.includes('_id')) { // Exclude properties with '_id'
    elements.push(
      <div key={parentKey + property} style={{ display: 'inline-block', marginRight: '1px', }}> {/* Adjust margin as needed */}
        {Array.isArray(data[property]) ? (
          <>
            <Typography style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'grey' }} variant="subtitle1">{property.charAt(0).toUpperCase() + property.slice(1)} Info</Typography>
            {data[property].map((item) => (
              <div key={item._id}>
                {renderFormFields(item, parentKey + property)}
              </div>
            ))}
          </>
        ) : typeof data[property] === 'object' ? (
          renderFormFields(data[property], parentKey + property)
        ) : (
          <TextField
            label={customLabels[property] || property.charAt(0).toUpperCase() + property.slice(1)}
            value={data[property]}
            fullWidth
            margin="normal"
            key={parentKey + property}
          />
        )}
      </div>
    );
  }
});

return elements;

};
    
    

    // Specify a custom getRowId function
    const getRowId = (row) => row._id;

    return (
        <Box sx={{ marginTop: 4, paddingLeft: 0, paddingRight: 0 }}>
          <div style={{ height: 400, width: '100%' }}>
                
                
                {isLoading ? (
                    <Box display="flex" justifyContent="center" marginTop="2rem">
    <CircularProgress />
  </Box>
                ) : (
                                    data.length > 0 ? (

                        <DataGrid
                            rows={data}
                            columns={columns}
                            pageSize={5}
                            components={{
                                Toolbar: GridToolbar,
                            }}
                            getRowId={getRowId}

                />
                        ): (
    <Typography variant="body1">No admitted students</Typography>
  )
)
                }
                
            {/* Preview Dialog */}
             

            <Dialog open={open} onClose={() => setOpen(false)}  maxWidth="lg">
  <Box p={2} style={{ minWidth: '800px' }}>
    <Typography style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'grey', position:'relative', marginBottom:'-3rem' }} variant="h6">Student Details</Typography>
    {selectedApplication && (
      <form style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {renderFormFields(selectedApplication.student_application)}

                  
                   <TextField
              label="Program"
              value={selectedApplication.program?.title}
              margin="normal"
                  />
                             
      </form>
              )}
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <Button className='no-print' variant="contained" color="primary" onClick={handlePrint}>Print</Button>
        </div>
              
            </Box>
            
                <style>
    {
    `@media print {
        .no-print {
          display: none;
        }
      }
    `}
  </style>
</Dialog>


        </div>
        </Box>
    );
};

export default Admitted;
