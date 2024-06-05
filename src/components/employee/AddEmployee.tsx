import React, { useState } from 'react'
import { 
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  Checkbox,
  Grid
 } from "@mui/material"
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchAddEmployees } from '@/redux/slices/employeeSlice';
// import { fetchAddReview } from '@/redux/slices/reviewSlice';


interface Props  {
  open : boolean
  handleClose : () => void,
//   data : {
//     _id : string
//     author : string
//     name : string
//     star_rating : number
//     genre : string
//     published : string
//     price : string
//     language : string
//     // image : string 
//   }
  }

interface EmployeesData {
  _id: string,
  name: string,
  email: string,
  phone_number: number
  designation: string
  gender: string
  course: string
  image: string
  createdAt: string;
//   updatedAt: string;
}
  const AddEmployee = ({ open,handleClose }:Props) => {
  const [preview, setPreview] = useState('');
  const [image, setImage] = useState('');



    const dispatch = useDispatch<any>()
    const {
      register,
      handleSubmit,
    } = useForm<EmployeesData>()

    const onSubmit = async (data : EmployeesData) =>{
        const formDataToSend = new FormData();
        formDataToSend.append("name", data.name);
        formDataToSend.append("email", data.email);
        formDataToSend.append("phone_number", data.phone_number.toString());
        formDataToSend.append("designation", data.designation);
        formDataToSend.append("gender", data.gender);
        formDataToSend.append("course", data.course);
        formDataToSend.append("image", image);
        dispatch(fetchAddEmployees(formDataToSend))
      handleClose()
    }

    const handleImageChange = (e:any) => {
        const selectedFile = URL.createObjectURL(e.target.files[0]);
        const selectedFiles = e.target.files[0];
        setPreview(selectedFile);
        setImage(selectedFiles);
      };

    return (
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
        {preview && (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
                <img src={preview} alt="Preview" style={{width:"30%"}}/>
              </Grid>
            )}
            <Box style={{ marginBottom: "20px" }}>
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
              {/* {coverImageName && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {coverImageName}
                </Typography>
              )} */}
            </Box>
          <TextField  {...register('name')}
            required
            margin='dense'
            name='name'
            label="Name"
            type='text'
            fullWidth
            variant='standard'
          /> 
          <TextField  {...register('email')}
            required
            margin='dense'
            name='email'
            label="Email"
            type='email'
            fullWidth
            variant='standard'
          />
          <Box>
            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                <FormControlLabel {...register("gender")} value="female" control={<Radio />} label="Female" />
                <FormControlLabel {...register("gender")} value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </Box>
          {/* <TextField  {...register('designation')}
            required
            margin='dense'
            name='designation'
            label="Designation"
            type='dropdown'
            fullWidth
            variant='standard'
          /> */}
          <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Designation</InputLabel>
  <Select
    {...register('designation')}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Designation"
  >
    <MenuItem value="HR">HR</MenuItem>
    <MenuItem value="Manager">Manager</MenuItem>
    <MenuItem value="Sales">Sales</MenuItem>
  </Select>
</FormControl>
          {/* <TextField  {...register('course')}
            required
            margin='dense'
            name='course'
            label="Course"
            type='text'
            fullWidth
            variant='standard'
          /> */}
            <FormGroup>
  <InputLabel id="Course">Course</InputLabel>

      <FormControlLabel control={<Checkbox {...register('course')} />} label="BCA" value="BCA"/>
      <FormControlLabel control={<Checkbox {...register('course')} />} label="MCA" value="MCA"/>
      <FormControlLabel control={<Checkbox {...register('course')} />} label="BSC" value="BSC"/>
    </FormGroup>
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone_number"
            label="Phone number"
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
            fullWidth
            variant="standard"
            {...register("phone_number")}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit( onSubmit )} >Submit</Button>
        </DialogActions>
      </Dialog>
    )
  }

export default AddEmployee

