import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "../store"
import axios from "axios"

interface Data {
    _id: string
    name: string
    email: string
    gender: string
    phone_number: number
    designation: string
    course: string
    image: string
    date: string
}

interface Employee {
    employeeData : Data[]
}

const initialState : Employee = {
    employeeData: []
}

interface Emp_id {
    emp_id : string
}

interface Params {
    q: string
}

export const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers:{
        listEmployee: (state, action: PayloadAction<Data[]>) => {
            state.employeeData = (action.payload)
        },
        addEmployee: (state, action: PayloadAction<Data>) => {
            state.employeeData.push(action.payload)
         },
         editEmployee: (state, action: PayloadAction<Data>) => {
            state.employeeData.push(action.payload)
        },
         deleteEmployee: () =>{}
    }
})

export const fetchEmployees = ( params: Params ) :
    AppThunk<Promise<void>> => async( dispatch ) => {
        const response = await axios.post("http://localhost:3255/employee/list", params
        );
        dispatch(listEmployee(response.data.data))
    }

export const fetchAddEmployees = ( formDataToSend: FormData ):
AppThunk => async(dispatch) => {
    const response = await axios.post("http://localhost:3255/employee/create",formDataToSend);
    dispatch(addEmployee(response.data.data))
}

export const fetchDeleteEmployee = ( emp_id : Emp_id ):
AppThunk => async( dispatch ) => {
        const response = await axios.patch("http://localhost:3255/employee/delete",
        emp_id
        )
        dispatch(deleteEmployee(response.data.message)) 
}

export const fetchEditEmployee = ( formDataToSend: FormData ):
AppThunk<Promise<void>> => async( dispatch ) => {
    const response = await axios.patch('http://localhost:3255/employee/edit' , 
    formDataToSend
    );
    dispatch(editEmployee(response.data.data))
}


export const { listEmployee, addEmployee, deleteEmployee, editEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;