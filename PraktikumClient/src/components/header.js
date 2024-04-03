import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import * as XLSX from 'xlsx'

const Header = () => {

    const employees=useSelector(state=>state.employees)
    // const EmployeeList = (employees) => {
        const exportToExcel = () => {
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(employees);
            XLSX.utils.book_append_sheet(wb, ws, 'Employees');
            XLSX.writeFile(wb, 'employees.xlsx');
        };
    // }

    return <div>
        <div>
            <Link to="/homePage">דף הבית </Link>
            <div>|</div>
            <Link to="/displayEmployees">טבלת עובדים</Link>
            <div>|</div>
            <Link to="/addEmployee">הוספת עובדים</Link>
        </div>
        <button onClick={exportToExcel}>Export to Excel</button>
    </div>
}
export default Header

