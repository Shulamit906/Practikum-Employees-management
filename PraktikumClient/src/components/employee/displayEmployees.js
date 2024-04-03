// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import { useDispatch, useSelector } from 'react-redux';
// import { IconButton } from '@material-ui/core';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import EditIcon from '@mui/icons-material/Edit';
// import { deleteEmployee } from '../../service/EmployeeService';
// import { useNavigate } from 'react-router-dom';
// import AddCircleIcon from '@mui/icons-material/AddCircle';

// const CustomTableCell = withStyles(theme => ({
//     head: {
//         backgroundColor: theme.palette.common.black,
//         color: theme.palette.common.white,
//     },
//     body: {
//         fontSize: 14,
//     },
// }))(TableCell);

// const styles = theme => ({
//     root: {
//         width: '80%',
//         marginTop: theme.spacing.unit * 3,
//         overflowX: 'auto',
//         marginLeft: 'auto',
//         marginRight: 'auto',
//     },
//     table: {
//         minWidth: 700,
//         padding:'80px'
//     },
//     employee: {
//         '&:nth-of-type(odd)': {
//             backgroundColor: theme.palette.background.default,
//         },
//     },
// });


// const DisplayEmployees = (props) => {
//     const { classes } = props;
//     const employees = useSelector(state => state.employees)
//     const dispatch = useDispatch()
//     const navig = useNavigate()
//     return (
//         <Paper className={classes.root}>
//             <Table className={classes.table}>
//                 <TableHead>
//                     <TableRow>
//                         <CustomTableCell align="center">First Name</CustomTableCell>
//                         <CustomTableCell align="center">Last Name</CustomTableCell>
//                         <CustomTableCell align="center">Tz</CustomTableCell>
//                         <CustomTableCell align="center">Start Date</CustomTableCell>
//                         <CustomTableCell align="center">Delete</CustomTableCell>
//                         <CustomTableCell align="center">Edit</CustomTableCell>

//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {employees.map(employee => (
//                         <TableRow className={classes.employee} key={employee.id}>
//                             <CustomTableCell align="center">{employee.firstName}</CustomTableCell>
//                             <CustomTableCell align="center">{employee.lastName}</CustomTableCell>
//                             <CustomTableCell align="center">{employee.tz}</CustomTableCell>
//                             <CustomTableCell align="center">{employee.startDate}</CustomTableCell>
//                             <CustomTableCell align="center">
//                                 <IconButton onClick={() => dispatch(deleteEmployee(employee.id,navig))}>
//                                     <DeleteForeverIcon />
//                                 </IconButton>
//                             </CustomTableCell>
//                             <CustomTableCell align="center">
//                                 <IconButton onClick={x => navig("/editEmployee", { state: { employee } })}>
//                                     <EditIcon />
//                                 </IconButton>
//                             </CustomTableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             <IconButton onClick={x => navig("/addEmployee")}>
//                 <AddCircleIcon />
//             </IconButton>
//             </Table>
//         </Paper>
//     );
// }

// DisplayEmployees.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(DisplayEmployees);

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, TextField } from '@material-ui/core';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { deleteEmployee } from '../../service/EmployeeService';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '80%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    table: {
        minWidth: 700,
        padding:'80px'
    },
    employee: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    searchField: {
        marginTop:theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit,
        width: '200px', // ניתן לשנות את הרוחב כרצונך
    },
});

const DisplayEmployees = (props) => {
    const { classes } = props;
    const employees = useSelector(state => state.employees);
    const dispatch = useDispatch();
    const navig = useNavigate();
    const [searchText, setSearchText] = useState('');

    const filteredEmployees = employees.filter(employee =>
        employee.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.tz.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.startDate.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    return (<>
            <TextField
                className={classes.searchField}
                label="חיפוש"
                variant="outlined"
                value={searchText}
                onChange={handleSearchChange}
            />
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <CustomTableCell align="center">First Name</CustomTableCell>
                        <CustomTableCell align="center">Last Name</CustomTableCell>
                        <CustomTableCell align="center">Tz</CustomTableCell>
                        <CustomTableCell align="center">Start Date</CustomTableCell>
                        <CustomTableCell align="center">Delete</CustomTableCell>
                        <CustomTableCell align="center">Edit</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredEmployees.map(employee => (
                        <TableRow className={classes.employee} key={employee.id}>
                            <CustomTableCell align="center">{employee.firstName}</CustomTableCell>
                            <CustomTableCell align="center">{employee.lastName}</CustomTableCell>
                            <CustomTableCell align="center">{employee.tz}</CustomTableCell>
                            <CustomTableCell align="center">{employee.startDate}</CustomTableCell>
                            <CustomTableCell align="center">
                                <IconButton onClick={() => dispatch(deleteEmployee(employee.id, navig))}>
                                    <DeleteForeverIcon />
                                </IconButton>
                            </CustomTableCell>
                            <CustomTableCell align="center">
                                <IconButton onClick={() => navig("/editEmployee", { state: { employee } })}>
                                    <EditIcon />
                                </IconButton>
                            </CustomTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            <IconButton onClick={() => navig("/addEmployee")}>
                <AddCircleIcon />
            </IconButton>
            </Table>
        </Paper>
        </>);
}

DisplayEmployees.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisplayEmployees);
