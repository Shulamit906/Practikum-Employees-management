
import React, { useEffect } from 'react';
import { FormControl, Input, InputLabel, MenuItem, Select, Checkbox, IconButton } from "@material-ui/core";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { addNewEmployee, editEmployee } from '../../service/EmployeeService';
import moment from 'moment';

const schema = yup.object({
    firstName: yup.string().required("שדה חובה"),
    lastName: yup.string().required("שדה חובה"),
    tz: yup.string().required("שדה חובה"),
    startDate: yup.date().required("שדה חובה"),
    birthDate: yup.date().required("שדה חובה"),
    gender: yup.number().required("שדה חובה"),
    isActive: yup.bool().default(true),
    roles: yup.array().of(
        yup.object().shape({
            roleId: yup.number().required("שדה חובה"),
            isManagement: yup.bool().required("שדה חובה"),
            startDateRole: yup.date().required("שדה חובה"),
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
            const duplicateRole = data.roles.some((role, index) => isRoleIdExists(index, control));
            if (duplicateRole) {
                alert("לא ניתן לבחור תפקיד פעמיים לאותו עובד!");
                return;
            }
            dispatch(addNewEmployee(data, navig));
        }
    };

    const { fields: fieldsRoles, append: appendRole, remove: removeRole } = useFieldArray({
        control,
        name: "roles",
    });

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                    <InputLabel id="demo-simple-input-standard-label"> FirstName </InputLabel>
                    <Input {...register("firstName")} />
                    <p>{errors.firstName?.message}</p>
                </FormControl>
                <br />

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                    <InputLabel id="demo-simple-input-standard-label"> LastName </InputLabel>
                    <Input {...register("lastName")} />
                    <p>{errors.lastName?.message}</p>
                </FormControl>
                <br />

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                    <InputLabel id="demo-simple-input-standard-label"> Tz </InputLabel>
                    <Input {...register("tz")} />
                    <p>{errors.tz?.message}</p>
                </FormControl>
                <br />

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                    <InputLabel id="demo-simple-input-standard-label"> StartDate </InputLabel>
                    <Input {...register("startDate")} type="date" />
                    <p>{errors.startDate?.message}</p>
                </FormControl>
                <br />

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                    <InputLabel id="demo-simple-input-standard-label"> BirthDate </InputLabel>
                    <Input {...register("birthDate")} type="date" />
                    <p>{errors.birthDate?.message}</p>
                </FormControl>
                <br />

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                    <InputLabel id="demo-simple-select-standard-label-gender">Gender</InputLabel>
                    <Select
                        {...register("gender")}
                        labelId="demo-simple-select-standard-label-gender"
                        id="demo-simple-select-standard-gender"
                        label="Gender"
                        defaultValue={employee?.gender || ""}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>Male</MenuItem>
                        <MenuItem value={2}>Female</MenuItem>
                        <MenuItem value={3}>Other</MenuItem>
                    </Select>
                </FormControl>
                <br />

                {fieldsRoles.map((field, index) => (
                    <div key={field.id}>
                        <FormControl variant="standard">
                            <InputLabel> A managerial position</InputLabel>
                            <Checkbox
                                {...register(`roles.${index}.isManagement`)}
                                defaultChecked={field.isManagement}
                            />
                        </FormControl>
                        <br />

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                            <InputLabel id={`demo-simple-input-standard-label-roleId-${index}`}> סוג תפקיד  </InputLabel>
                            <Select
                                {...register(`roles.${index}.roleId`)}
                                labelId={`demo-simple-select-standard-label-roleId-${index}`}
                                id={`demo-simple-select-standard-roleId-${index}`}
                                label="קוד תפקיד"
                                defaultValue={field.roleId || ""}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {roles?.filter(role=>!isRoleIdExists(role.id)|| role.id === field.roleId)
                                .map((role) => (
                                    <MenuItem key={role.id} value={role.id} >
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br />

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                            <InputLabel id={`demo-simple-input-standard-label-startDateRole-${index}`}> Start Date for Role </InputLabel>
                            <Input {...register(`roles.${index}.startDateRole`)} type="date" />
                            <p>{errors?.roles?.[index]?.startDateRole?.message}</p>
                        </FormControl>
                        <br />

                        <IconButton aria-label="delete" onClick={() => removeRole(index)}>
                            <DeleteForeverIcon />
                        </IconButton>

                    </div>
                ))
                }

                <button className="my-button" onClick={() => appendRole({})}> הוסף תפקיד</button>
                <br />
                <Input type="submit" className="my-button" />
            </form >
        </div >
    );
};

export default AddEmployee;
