import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataStudent } from "../../data/mockData"; 
import Topbar from "../global/Topbar";
import InputBase from "@mui/material/InputBase";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel } from "@tanstack/react-table";
import { mockDataStudent as Data } from "../../data/mockData";
import { useState } from "react";
import '../../../assets/styles/Student.css'


function Student() {
 

  const columns = [
  
  {
      accessorKey: 'profileImage', // Update accessorKey
      header: (
<div style={{ fontSize: '16px', width: '100%', paddingRight: '30px' }}>
      Profile
    </div>
      ),
      cell: (props) => (
    
        <Box sx={{ position:'relative', borderRadius: '100px',
                  width: '40px',
              height: '40px',
          backgroundColor: '#E3A1A1',
        }} >
      <img
        src={`path/to/your/images/${props.getValue()}`}
        alt="Profile"
 style={{
                      borderRadius: '100%',
                      position: 'relative',
                      top: '0',
                      width: '70%',
                      height: '70%',
           
          objectFit: 'cover',   
            }} />
          </Box>
    ),  },
  
    {
      accessorKey: 'name',
      header: (
        <div style={{ fontSize: '16px', width: '100%', whiteSpace: 'nowrap', paddingRight: '30px' }}>
      Name
    </div>
      ),
      cell: (props) => <p
      style= {{fontSize: '12px', width:'100%'}}
      
      >{props.getValue()}</p>
      
  },
    {
      accessorKey: 'id',
      header: (
        <div style={{ fontSize: '16px', width: '100%', paddingRight: '30px' }}>
      Student ID
    </div>
      ),
      cell: (props) => <p
            style= {{fontSize: '12px', width:'100%'}}

      
      >{props.getValue()}</p>
  },
    {
      accessorKey: 'year',
      header: (
        <div style={{ fontSize: '16px', width: '100%', paddingRight: '30px' }}>
      Year
    </div>
      ),
      cell: (props) => <p
            style= {{fontSize: '12px', width:'100%'}}

      >{props.getValue()}</p>
  },
  
]  


 
  
  
  
  
  
    // State to store the currently clicked student's information
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [data, setData] = useState(Data)
  const [columnFilters, setColumnFilters] = useState([])




 // Function to handle row click
  const handleRowClick = (row) => {
    // Set the selected student when a row is clicked
    setSelectedStudent(row.original);
  };



  const tableName = columnFilters.find((f) => f.id === 'name')?.value || "";

  const onFilterChange = (id, value) => {
    setColumnFilters(
      prev => prev.filter(f => f.id !== id).concat({
        id, value
      })
    )
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });
  console.log(table.getHeaderGroups())
  return (
      <>
          <Box display='grid'
              
              gridTemplateColumns='2fr 1fr 1fr 1fr'
              boxSizing='border-box'
              gap='1rem'
        padding='.5rem 2rem'
        gridAutoRows = 'minmax(100px, auto)'
              backgroundColor='#FFF7F7'
        
          
          
          >
              <Box
                  display='flex'
                  flexDirection='column'
                  backgroundColor='#fff'
                       borderRadius='5px'
                    border='1px solid #fff'
                    boxShadow='.7px .7px .7px .7px black'
                //   padding='5rem'
                  gridRow='1/5'
                  //   gridColumn='1/5'
                  overflow='auto'
              >
                  <Box
                      display="flex"
                      alignItems="center"
                      justifyContent='space-between'
                      marginTop='1rem'>
                      <Typography
                          mr={2}
                          pl={2}
                          fontSize='20px'
                          color='#4A0808'
                      >
                          Students</Typography>

                      <Box
                          display='flex'
                      borderRadius='15px'
                    backgroundColor='#FFE3E3'
                      
                      >
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchOutlinedIcon />
        </IconButton>

        <InputBase
          sx={{
            // ml: 2,
            // flex: 1,
            backgroundColor: '#FFE3E3',
            borderRadius: '15px',
            // pr: '5rem',
            // position: 'absolute',
            // width: '100%',
          }}
                placeholder="student ID or name"
                value={tableName}
                onChange={(e) => onFilterChange("name", e.target.value)}

        />
      </Box>
                  </Box>
                  <hr style={{marginTop: '1rem', marginLeft: '1rem', width: '90%'}} />

                  <Box>
            <Box className = "table">
              {table.getHeaderGroups().map((headerGroup) => (<Box className='tr' key={headerGroup.id}>
              
                {headerGroup.headers.map(header => (<Box className='th' key={header.id}>
                
                  {header.column.columnDef.header}
                  
                </Box>
              ))}
              
              </Box>))}

              {
                table.getRowModel().rows.map(row => <Box className='tr' key={row.id} onClick={() => handleRowClick(row)}>
                  {row.getVisibleCells().map(cell => <Box className='td' key={cell.id} >
                  
                    {
                      flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )
                    }
                </Box> )}
                
                </Box>)
              }
            </Box>
            

                  </Box> 
                  
              </Box>


              <Box backgroundColor='#fff'
                  borderRadius='5px'
          border='1px solid #fff'
              boxShadow='.7px .7px .7px .7px black'

              //   padding='5rem'
                  display='flex'
                  flexDirection='column'
                //   justifyContent='space-between'
                  alignItems='center'
                  gridRow='1/4'
                //   gridColumn='2/4' 
              >
                  <Typography
                   style={{fontSize:'20px', color:'#4A0808'}}
                  >Personal Information</Typography>


                  <Box display='flex' flexDirection='column' alignItems='center' marginTop='1rem'>
                      <Box backgroundColor='grey' width='50px' height='50px' position='relative' borderRadius='50px'>
                          <img src="" alt="" style={{position:'absolute'}} />
                      </Box>
                      <Box><p style={{fontSize:'16px', color: '#4A0808'}}>Jenny Walman</p></Box>
                      <Box><p style={{fontSize: '14px', color: '#4A08084D'}}>Stu ID: #21991</p></Box>
                  </Box>
                  
                  <Box marginTop='1rem' marginRight='2rem'>
                      <Typography
                      style={{fontSize: '20px', color: '#4A0808'}}
                      >Basic Details</Typography>
           <Box display='flex' justifyContent='space-between'>
            <Box display='flex' flexDirection='column' color='#4A080899' fontSize= '12px'>
              
              <Box>
                <Typography sx={{ fontSize: '12px' }}>Program</Typography>
                
              </Box>
              <Box>
                
                <Typography sx={{ fontSize: '12px' }}>Class</Typography>
              
              
              
              </Box>
              <Box >
                <Typography sx={{ fontSize: '12px' }}>Gender</Typography>
              
              
              
              </Box>
              <Box>
                <Typography sx={{ fontSize: '12px' }}>Mobile</Typography>
              
              
              
              </Box>
              <Box>
                <Typography sx={{ fontSize: '12px' }}>Email</Typography>
              
              
              
              </Box>
              <Box>
                <Typography sx={{ fontSize: '12px' }}>Date of Birth</Typography>
              
              
              
              </Box>
              <Box>
                <Typography sx={{ fontSize: '12px' }}>Address</Typography>
              
              
              
              </Box>
                    </Box>
            <Box color='#4A080899' fontSize= '12px'> 
              
                
              <Typography sx={{ fontSize: '12px' }}> <span style={{fontSize: '12px', position: 'relative', right:'4px'}}>:</span>  Fertility Study</Typography>
              <Typography sx={{ fontSize: '12px' }} > <span style={{fontSize: '12px', position: 'relative', right:'4px'}}>:</span>Lesson A</Typography>
              <Typography sx={{ fontSize: '12px' }} > <span style={{fontSize: '12px', position: 'relative', right:'4px'}}>:</span>Female</Typography>
              <Typography sx={{ fontSize: '12px' }}> <span style={{fontSize: '12px', position: 'relative', right:'4px'}}>:</span>+235 5656</Typography>
              <Typography sx={{ fontSize: '12px' }}> <span style={{fontSize: '12px', position: 'relative', right:'4px'}}>:</span>jenny@gmail.com</Typography>
              <Typography sx={{ fontSize: '12px' }}> <span style={{fontSize: '12px'}}>:</span>09 june 1882</Typography>
              <Typography sx={{ fontSize: '12px' }}> <span style={{fontSize: '12px', position: 'relative', right:'4px'}}>:</span>Mortland Delta</Typography>







                    </Box>

                  </Box>
                  </Box>

          <Box marginTop='1rem' marginRight='2rem'>
            <Typography sx={{fontSize: '15px', color: '#4A0808#'}}>About Student</Typography>
              <Typography sx={{color:'#4A080899', fontSize: '10px', width: '190px'}}>
              I love good health, treating patient
              and learning new things. In my free time,
              I enjoy writing, reading, and playing guitar.</Typography>

                  </Box>


              </Box>
              <Box backgroundColor='#fff'
                  borderRadius='5px'
                  border='1px solid #fff'
                    boxShadow='.7px .7px .7px .7px black'

                  padding='5rem'
                  gridColumn='3/5'
              // gridRow='1/3'
              >
                  <p>Box3</p>
              </Box>
              <Box backgroundColor='#fff'
                  borderRadius='5px'
                  border='1px solid #fff'
                    boxShadow='.7px .7px .7px .7px black'

                  padding='1rem'
                  gridRow=''
              >
                  <p>Box4</p>
              </Box>
              <Box backgroundColor='#fff'
          borderRadius='5px'
          padding='1rem'
                border='1px solid #fff'
                    boxShadow='.7px .7px .7px .7px black'
>
                  <p>Box5</p>
              </Box>
              <Box backgroundColor='#fff'
                  borderRadius='5px'
                border='1px solid #fff'
                    boxShadow='.7px .7px .7px .7px black'

                  padding='1rem'
                  gridColumn='3/4'
              >
                  <p>Box6</p>
              </Box>
              
        </Box>
      </>
  )
}

export default Student