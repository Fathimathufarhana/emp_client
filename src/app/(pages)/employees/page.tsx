
"use client"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteEmployee, fetchEmployees } from '@/redux/slices/employeeSlice';
import { Box, Button, Chip, Grid, TextField } from '@mui/material';
import AddEmployee from '@/components/employee/AddEmployee';
import { useRouter } from 'next/navigation';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import "@/components/style.css"


export default function BasicTable() {

    const [searchValue, setSearchValue] =useState<string>("");
    const [open, setOpen] = useState(false);

    const router = useRouter()
    const dispatch = useDispatch<any>()
    const fetchEmployee = useSelector((state:any) => state.allEmployees.employeeData)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    useEffect(() => {
        dispatch(fetchEmployees({ q:searchValue }))
    },[searchValue])

    const handleDelete = (emp_id : string) => {
      dispatch(fetchDeleteEmployee({ emp_id }))
      dispatch(fetchEmployees({ q:searchValue }))
      router.push("/employees")
    }

    const columns: GridColDef[] = [
          { field:"_id", headerName:"Id", width:50, headerAlign:"center", align:"center",
          renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1
          },
          { field:"image", headerName:"Image", width:100, headerAlign:"center", align:"center",
            renderCell: (fetchEmployee) => {
              return(
                <div style={{ alignContent:"center", display:'flex', flexWrap:"wrap"}}>
                  <img 
                    src={fetchEmployee.row.image} 
                    alt="employee" 
                    style={{width:"50px", height:"50px", borderRadius:"50%"}} 
                  />
                </div>
              )
            }
          },
          { field:"name", headerName:"Name", width:100, headerAlign:"center", align:"center"},
          { field:"email", headerName:"Email", width:200, headerAlign:"center", align:"center"},
          { field:"phone_number", headerName:"Phone Number", width:150, headerAlign:"center", align:"center"},
          { field:"designation", headerName:"Designation", width:100, headerAlign:"center", align:"center"},
          { field:"gender", headerName:"Gender", width:100, headerAlign:"center", align:"center"},
          { field:"course", headerName:"Course", width:100, headerAlign:"center", align:"center"},
          { field:"createdAt", headerName:"Created Date", width:130, headerAlign:"center", align:"center",
            renderCell: (fetchEmployee) => {
              return(
                <>
                  {new Date(fetchEmployee.row.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                </>
              )
            }
          },
          { field:"isStatus", headerName:"Status", width:100, headerAlign:"center", align:"center",
            renderCell: (fetchEmployee) => {
              return(
                <>
                  {
                    fetchEmployee.row.isStatus ? 
                    <Chip label="Active" color="success" variant="outlined" /> :
                    <Chip label="Inactive" color="error" variant="outlined" />
                  }
                </>
              )
            }
          },
          { field:"actions", headerName:"Action", width:200, headerAlign:"center", align:"center",
          renderCell: (fetchEmployee) => {
            return(
              <>
                <Button onClick={() => router.push(`/employees/edit/${fetchEmployee.row._id}`)} variant="contained">
                      Edit
                    </Button>
                    &nbsp;
                    <Button variant="contained" color="error" onClick={() => handleDelete(fetchEmployee.row._id)}>
                      Delete
                    </Button>
              </>
            )
          }
          }
    ]

  return (

    <Box>

      <Box display="flex" justifyContent="space-between" margin="15px" alignItems="center">
        <TextField
          id="search"
          name="search"
          label="Search"
          sx={{ width: "30%" }}
          onChange={(e)=> setSearchValue(e.target.value)}
        />
        <Grid>Total Count: {fetchEmployee.length}</Grid>
        <Button 
          onClick={handleClickOpen}
          variant="contained"
        > 
          Add New 
        </Button>
      </Box>

      <AddEmployee
        open={ open } 
        handleClose={ handleClose } 
      />

      <DataGrid
        rowHeight={100}
        columns={columns}
        rows={fetchEmployee}
        getRowId={(fetchEmployee) => fetchEmployee._id}
        initialState={{
          pagination: { paginationModel: { pageSize: 3 } },
        }}
        pageSizeOptions={[3, 5, 10]}
      />
    </Box>
  );
}

