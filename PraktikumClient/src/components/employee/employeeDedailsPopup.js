

// import React from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';

// const EmployeeDetailsPopup = ({ employee, open, onClose }) => {
//     if (!employee) {
//         return null; // אם העובד אינו מוגדר, תחזיר ריק
//     }

//     return (
//         <Dialog open={open} onClose={onClose}>
//             <DialogTitle>פרטי העובד</DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={onClose}
//                 sx={{
//                     position: 'absolute',
//                     right: 8,
//                     top: 8,
//                     color: (theme) => theme.palette.grey[500],
//                 }}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Typography variant="body1">Name: {employee.firstName}  {employee.lastName}</Typography>
//                 <Typography variant="body1"> BirthDate: {employee.birthDate}</Typography>
//                 <Typography variant="body1"> StartDate: {employee.startDate}</Typography>
//                 <Typography variant="body1">Gender: {employee.gender}</Typography>
//                 {/* הוספת פרטים נוספים כרצונך */}
//             </DialogContent>
//             <DialogActions>
//                 <Button autoFocus onClick={onClose}>
//                     סגור
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// }

// export default EmployeeDetailsPopup;


import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const EmployeeDetailsPopup = ({ employee, open, onClose }) => {
    if (!employee) {
        return null; // אם העובד אינו מוגדר, תחזיר ריק
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>פרטי העובד</DialogTitle>
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
                <Typography variant="body1">שם: {employee.firstName}</Typography>
                <Typography variant="body1">תאריך לידה: {employee.birthDate}</Typography>
                <Typography variant="body1">תאריך התחלה: {employee.startDate}</Typography>
                <Typography variant="body1">מין: {employee.gender}</Typography>
                <Typography variant="body1">רשימת תפקידים:</Typography>
                <ul>
                    {employee.roles.map((role, index) => (
                        <li key={index}>{role.roleId}</li>
                    ))}
                </ul>
                {/* הוספת פרטים נוספים כרצונך */}
            </DialogContent>

            <DialogActions>
                <Button autoFocus onClick={onClose}>
                    סגור
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EmployeeDetailsPopup;
