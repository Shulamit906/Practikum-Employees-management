
import React, { useEffect } from 'react';
import { FormControl, Input, InputLabel, MenuItem, Select, Checkbox, IconButton, InputAdornment, Button } from "@material-ui/core";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { addNewEmployee, editEmployee, getEmployees } from '../../service/EmployeeService';
import moment from 'moment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SendIcon from '@mui/icons-material/Send';


const schema = yup.object({
    firstName: yup.string().required("שדה חובה").min(3, "at list 3 characters"),
    lastName: yup.string().required("שדה חובה").min(3, "at list 3 characters"),
    tz: yup.string().required("שדה חובה").max(9, "Maximum 9 characters"),
    startDate: yup.date().typeError('תאריך חוקי חובה').required('תאריך חוקי חובה'),
    birthDate: yup.date().typeError('תאריך חוקי חובה').required('תאריך חוקי חובה'),
    gender: yup.number().required("שדה חובה"),
    isActive: yup.bool().default(true),
    roles: yup.array().of(
        yup.object().shape({
            roleId: yup.number().required("שדה חובה"),
            isManagement: yup.bool().required("שדה חובה"),
            startDateRole: yup.date().typeError('תאריך חוקי חובה').required('תאריך חוקי חובה'),
        })
    ),
}).required();

const AddEmployee = () => {
    const { state } = useLocation();
    const employee = state?.employee;
    const dispatch = useDispatch();
    const roles = useSelector(state => state.roles);
    const navig = useNavigate();

    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: employee,
    });

    useEffect(() => {
        dispatch(getEmployees()); 
      }, [dispatch]);

    useEffect(() => {
        if (employee) {
            Object.keys(employee).forEach(key => {
                if (key === "startDate" || key === "birthDate") {
                    setValue(key, moment(employee[key]).format('YYYY-MM-DD'));
                } else if (key === "roles") {
                    employee.roles.forEach((role, index) => {
                        setValue(`roles[${index}].startDateRole`, moment(role.startDateRole).format('YYYY-MM-DD'));
                    });
                } else {
                    setValue(key, employee[key]);
                }
            });
        }
    }, [employee, setValue]);

    const isRoleIdExists = (index) => {
        const roleIdsArray = fieldsRoles.map(field => field.roleId);
        var isExist = false
        roleIdsArray?.forEach((role) => {
            if (role == index)
                isExist = true;
        })
        return isExist;
    }

    const onSubmit = (data) => {
        if (state) {
            data["id"] = employee.id;
            dispatch(editEmployee(data.id, data, navig));
        } else {

            dispatch(addNewEmployee(data, navig));
        }
    };

    const { fields: fieldsRoles, append: appendRole, remove: removeRole } = useFieldArray({
        control,
        name: "roles",
    });

    return (
        <div  className='add background-img backgroundPage'>
            <div>
                {state ? <h2>Edit Employee</h2> : <h2>Add Employee</h2>}
            </div>
            <form className='my-form' onSubmit={handleSubmit(onSubmit)}>



                {/* <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
                <FormControl variant="standard" style={{ width: '250px' }}>

                    <InputLabel id="demo-simple-input-standard-label"> FirstName </InputLabel>
                    <Input {...register("firstName")} />
                    <p>{errors.firstName?.message}</p>
                </FormControl>
                <br />

                <FormControl variant="standard" style={{ width: '250px' }}>
                    <InputLabel id="demo-simple-input-standard-label"> LastName </InputLabel>
                    <Input {...register("lastName")} />
                    <p>{errors.lastName?.message}</p>
                </FormControl>
                <br />

                <FormControl variant="standard" style={{ width: '250px' }}>
                    <InputLabel id="demo-simple-input-standard-label"> Tz </InputLabel>
                    <Input {...register("tz")} />
                    <p>{errors.tz?.message}</p>
                </FormControl>
                <br />

                <FormControl variant="standard" style={{ width: '250px' }}>
                    <InputLabel id="demo-simple-input-standard-label"> StartDate </InputLabel>
                    <Input {...register("startDate")} type="date" />
                    <p>{errors.startDate?.message}</p>
                </FormControl>
                <br />

                <FormControl variant="standard" style={{ width: '250px' }}>
                    <InputLabel id="demo-simple-input-standard-label"> BirthDate </InputLabel>
                    <Input {...register("birthDate")} type="date" />
                    <p>{errors.birthDate?.message}</p>
                </FormControl>
                <br />

                <FormControl variant="standard" style={{ width: '250px' }}>
                    <InputLabel id="demo-simple-select-standard-label-gender">Gender</InputLabel>
                    <Select
                        {...register("gender")}
                        labelId="demo-simple-select-standard-label-gender"
                        id="demo-simple-select-standard-gender"
                        label="Gender"
                        defaultValue={employee?.gender || ""}
                    >
                        <MenuItem value={1}>Male</MenuItem>
                        <MenuItem value={2}>Female</MenuItem>
                        <MenuItem value={3}>Other</MenuItem>
                    </Select>
                </FormControl>
                <br />

                {fieldsRoles.map((field, index) => (
                    <div className='roles' key={field.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    {...register(`roles.${index}.isManagement`)}
                                    defaultChecked={field.isManagement}
                                    color="black"
                                />
                            }
                            label="is Manager?"
                            labelPlacement="end"
                        />

                        <FormControl className='my-space' variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }} style={{ marginLeft: '20px' }}>
                            <InputLabel id={`demo-simple-input-standard-label-roleId-${index}`}>Choose a role  </InputLabel>
                            <Select
                                {...register(`roles.${index}.roleId`)}
                                labelId={`demo-simple-select-standard-label-roleId-${index}`}
                                id={`demo-simple-select-standard-roleId-${index}`}
                                label="Choose a role"
                                defaultValue={field.roleId || ""}
                            >

                                {roles?.filter(role => !isRoleIdExists(role.id) || role.id === field.roleId)
                                    .map((role) => (
                                        <MenuItem key={role.id} value={role.id} >
                                            {role.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>

                        <FormControl className='my-space' variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }} style={{ marginLeft: '20px' }}>
                            <InputLabel id={`demo-simple-input-standard-label-startDateRole-${index}`}> Role's Start Date</InputLabel>
                            <Input {...register(`roles.${index}.startDateRole`)} type="date" />
                            <p>{errors?.roles?.[index]?.startDateRole?.message}</p>
                        </FormControl>


                        <IconButton aria-label="delete" onClick={() => removeRole(index)} style={{ marginLeft: '20px' }}>
                            <DeleteForeverIcon />
                        </IconButton>

                    </div>
                ))
                }
                <Button className='Download-btn' variant="outlined" startIcon={<AddCircleIcon />} onClick={() => appendRole({})} style={{ color: '#00aa9d', marginTop: '10px' }}>
                    Add Role
                </Button>
                <br />
                <Button type="submit" variant="outlined" endIcon={<SendIcon />} style={{ color: '#00aa9d', marginTop: '10px' }}>
                    Submit
                </Button>
            </form >
        </div >
    );
};

export default AddEmployee;

