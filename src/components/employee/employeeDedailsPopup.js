import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const EmployeeDetailsPopup = ({ employee, open, onClose }) => {
    if (!employee) {
        return null;
    }

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: '450px' } }}>

            <DialogTitle>{employee.firstName} {employee.lastName} - details</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Typography variant="body1">Name: {employee.firstName} {employee.lastName}</Typography>
                <Typography variant="body1">Tz: {employee.tz} </Typography>
                <Typography variant="body1"> BirthDate: {employee.birthDate}</Typography>
                <Typography variant="body1"> StartDate: {employee.startDate}</Typography>
                <Typography variant="body1">
                    Gender: {(() => {
                        switch (employee.gender) {
                            case 1:
                                return "Male";
                            case 2:
                                return "Female";
                            case 3:
                                return "Other";
                            default:
                                return "Unknown";
                        }
                    })()}
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button autoFocus onClick={onClose}>
                    close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EmployeeDetailsPopup;
