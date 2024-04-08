import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from './service/EmployeeService';
import DisplayEmployees from './components/employee/displayEmployees';
import HomePage from './components/homePage';
import AddEmployee from './components/employee/addEmployee';
import Header from './components/header';
import { getRoles } from './service/RoleService';
import AddRole from './components/role/addRole';

function App() {

  const dispatch = useDispatch()
  const navig = useNavigate()
  useEffect(() => {
    dispatch(getEmployees())
    dispatch(getRoles())
  }, [])
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/displayEmployees" element={<DisplayEmployees />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/editEmployee" element={<AddEmployee />} />
        <Route path="/addRole" element={<AddRole />} />

      </Routes>


    </div>

  );
}

export default App;
