"use client"
import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchEditEmployee } from "@/redux/slices/employeeSlice";


interface EmployeesData {
    id: string,
    name: string,
    email: string,
    phone_number: number
    designation: string
    gender: string
    course: string
    image: string
    isStatus: boolean
}


const EditEmployee = ({params}: {params: {id:string}}) => {
    const [preview, setPreview] = useState('');
    const [image, setImage] = useState('');
    const [mca,setMca] = useState(false)
    const [bca,setBca] = useState(false)
    const [bsc,setBsc] = useState(false)

  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    email: "",
    phone_number: 0,
    designation: "",
    gender: "",
    course: "",
    image: "",
    isStatus: true
  });

  const {
    register,
    handleSubmit,
    reset
  } = useForm<EmployeesData>()

  const dispatch = useDispatch<any>()


    useEffect(() => {
      const fetchBooks = async () => {
    
        await axios.post('http://localhost:3255/employee/view',{emp_id:params.id})
        .then((res) => {
            const fetchData = res.data
            setFormData(fetchData.data);
        })
      };
      fetchBooks()
    },[])

    useEffect(() => {
        if(formData.course.toLowerCase().includes("mca")) {
            setMca(true)
        }
        if(formData.course.toLowerCase().includes("bca")) {
            setBca(true)
        } 
        if(formData.course.toLowerCase().includes("bsc")) {
            setBsc(true)
        }
    }, [formData])
    

  const onFormSubmit = async (data:EmployeesData) => {
    const formDataToSend = new FormData();
    formDataToSend.append("emp_id", params.id);
    formDataToSend.append("name", data.name);
    formDataToSend.append("email", data.email);
    formDataToSend.append("designation", data.designation);
    formDataToSend.append("phone_number", data.phone_number.toString());
    formDataToSend.append("course", data.course);
    formDataToSend.append("gender", data.gender);
    formDataToSend.append("isStatus", data.isStatus.toString());
    formDataToSend.append("image", image );
    dispatch(fetchEditEmployee(formDataToSend))
    router.push("/employees")
  };
  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e:any) => {
    const selectedFile = URL.createObjectURL(e.target.files[0]);
    setPreview(selectedFile);
    const selectedFiles = e.target.files[0];
    setImage(selectedFiles);
  };


  const handleChange1 = () => {
    mca ? setMca(false) : setMca(true)
  }
  const handleChange2 = () => {
    bca ? setBca(false) : setBca(true)
  }
  const handleChange3 = () => {
    bsc ? setBsc(false) : setBsc(true)
  }

  const initialValue = (data: EmployeesData) => {
    reset({
        name : data.name,
        email : data.email,
        phone_number : data.phone_number,
        designation : data.designation,
        gender : data.gender,
        course : data.course,
        image : data.image,
        isStatus: data.isStatus
      })
  }

useEffect(() => {
 initialValue(formData)
},[formData])
  return (

    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            margin: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            width: "400px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <form onSubmit={handleSubmit(onFormSubmit)}>

            <Typography variant="h4" style={{ textAlign: "center", marginBottom: "20px" }}>
              Edit Book
            </Typography>

            {preview ? 
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
                <img src={preview} alt="Preview" style={{width:"30%"}}/>
              </Grid> 
              :
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
                <img src={formData.image} alt="preview image" style={{width:"30%"}}/>
              </Grid>
            }
            <Box style={{ marginBottom: "20px" }}>  {/* image */}
              <input
                {...register("image")}
                name="image"
                accept="image/png,image/jpg"
                style={{ display: "none" }}
                id="image"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="image">
                <Button
                  variant="contained"
                  component="span"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Upload Cover Image
                </Button>
              </label>
            </Box>

            <Box style={{ marginBottom: "20px" }}>  {/* name */}
              <TextField
                {...register("name")}
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
              />
            </Box>

            <Box style={{ marginBottom: "20px" }}>   {/* email */}
              <TextField
                {...register("email")}
                fullWidth
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
              />
            </Box>

            <Box style={{ marginBottom: "20px" }}>  {/* phone number */}
              <TextField
                {...register("phone_number")}
                fullWidth
                label="Phone number"
                type="number"
                name="phone_number"
                variant="outlined"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </Box>

            <Box style={{ marginBottom: "10px" }}> {/* gender */}
              <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel 
                  value="Female" 
                  control={<Radio />} 
                  label="Female"
                  {...register('gender')}
                />
                <FormControlLabel 
                  value="Male" 
                  control={<Radio />} 
                  label="Male" 
                  {...register('gender')}
                />
              </RadioGroup>
            </Box>

            <Grid item xs={6} style={{ marginBottom: "20px" }}>  {/* course */}
                <FormLabel id='course'>Courses</FormLabel>
                <FormGroup sx={{ display: "flex", flexDirection: "row"}}>
                  <FormControlLabel  
                    id='course' 
                    control={<Checkbox {...register("course")}  onChange={handleChange1} checked={mca} />} 
                    value="MCA" 
                    label="MCA"
                  />
                  <FormControlLabel 
                    id='course' 
                    control={<Checkbox {...register("course")} onChange={handleChange2} checked={bca} />} 
                    value="BCA" 
                    label="BCA" 
                  />
                  <FormControlLabel 
                    id='course' 
                    control={<Checkbox {...register("course")} onChange={handleChange3} checked={bsc} />} 
                    value="BSC" 
                    label="BSC" 
                  />
                </FormGroup>
            </Grid>

            <FormControl fullWidth style={{ marginBottom: "20px" }}>  {/* designation */}
              <InputLabel id="demo-simple-select-label">Designation</InputLabel>
              <Select
                {...register('designation')}
                value={formData.designation}
                onChange={handleChange}
                labelId="demo-simple-select-label"
                id="designation"
                label="Designation"
              >
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth style={{ marginBottom: "20px" }}>  {/* status */}
              <InputLabel id="status">Status</InputLabel>
              <Select
                {...register('isStatus')}
                value={formData.isStatus}
                onChange={handleChange}
                labelId="demo-simple-select-label"
                id="status"
                label="Status"
              >
                <MenuItem value={true as any}>Active</MenuItem>
                <MenuItem value={false as any}>Inactive</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" color="primary" fullWidth type="submit">
              Submit
            </Button>
            
          </form>
        </Box>
      </Box>
  
    </>
  );
};

export default EditEmployee;
