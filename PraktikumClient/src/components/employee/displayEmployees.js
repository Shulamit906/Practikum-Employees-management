

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton, TextField } from '@material-ui/core';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { deleteEmployee } from '../../service/EmployeeService';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as XLSX from 'xlsx';
import EmployeeDetailsPopup from './employeeDedailsPopup';
import DownloadIcon from '@mui/icons-material/Download';

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
        marginBottom: '15px'
    },
    table: {
        minWidth: 700,
        padding: '80px',
       
    },
    employee: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    searchField: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit,
        width: '200px',
        border: '2px solid #00aa9d',
        borderRadius: '8.5%'
       
    },
});

const DisplayEmployees = (props) => {
    const { classes } = props;
    const employees = useSelector(state => state.employees);
    const dispatch = useDispatch();
    const navig = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [popupEmployee, setPopupEmployee] = useState(null);
    const [open, setOpen] = useState(false);

    const filteredEmployees = employees.filter(employee =>
        employee.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.tz.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.startDate.toLowerCase().includes(searchText.toLowerCase())
    );

    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(filteredEmployees);
        XLSX.utils.book_append_sheet(wb, ws, 'Employees');
        XLSX.writeFile(wb, 'employees.xlsx');
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleRowClick = (employee) => {
        if (!open) {
            setPopupEmployee(employee);
            setOpen(true);
        }
    };
    
  

    useEffect(() => {
        if (open) {
            setPopupEmployee(popupEmployee); 
        }
    }, [open, popupEmployee]) 
    

    return (<>
        <TextField
            className={classes.searchField}
            label="search box"
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
                        <TableRow 
                            className={classes.employee} 
                            key={employee.id} 
                            onClick={() => handleRowClick(employee)}
                        >
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
        <EmployeeDetailsPopup open={open} employee={popupEmployee} onClose={() => setOpen(false)} />
        <Button className='Download-btn' variant="outlined" startIcon={<DownloadIcon />} onClick={exportToExcel} style={{ color: '#00aa9d' }}>
        Export to Excel
      </Button>
    </>);
}

DisplayEmployees.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisplayEmployees);
