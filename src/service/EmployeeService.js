
import axios from "axios"
import { ADD_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE, GET_EMPLOYEES } from "../store/action"
import Swal from "sweetalert2"

export const getEmployees = () => {
  return dispatch => {
    axios.get("https://localhost:7130/api/Employees").then(x => {
      dispatch({ type: GET_EMPLOYEES, payload: x.data })
    })
      .catch(err => console.log(err))
  }
}

export function addNewEmployee(data, navig) {

  return dispatch => {
    axios.post("https://localhost:7130/api/Employees", data)
      .then(x => {
        dispatch({ type: ADD_EMPLOYEE, payload: x.data })
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Employee added successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navig("/displayEmployees")
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "There was an error adding the employee, try again",
          showConfirmButton: false,
          timer: 1500
        });
      })
  }

}


export function editEmployee(id, data, navig) {
  return dispatch => {
    axios.put(`https://localhost:7130/api/Employees/${id}`, data)
      .then(x => {
        console.log(x.data, "x.data")
        dispatch({ type: EDIT_EMPLOYEE, payload: x.data });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Employee details have been successfully changed",
          showConfirmButton: false,
          timer: 1500
        });
        navig("/displayEmployees");
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "There was an error updating the employee details, try again",
          showConfirmButton: false,
          timer: 1500
        });
      })
  }
}


export function deleteEmployee(id, navig) {
  return dispatch => {
    axios.delete(`https://localhost:7130/api/Employees/${id}`)
      .then(x => {
        dispatch({ type: DELETE_EMPLOYEE, payload: id })
        dispatch(getEmployees())
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "The employee has been successfully deleted",
          showConfirmButton: false,
          timer: 1500
        });
        navig("/homePage")
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          position: "top-end",
          icon: "eroor",
          title: "There was an error deleting the employee, try again",
          showConfirmButton: false,
          timer: 1500
        });
      })
  }

}


