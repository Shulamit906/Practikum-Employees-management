import axios from "axios"
import Swal from "sweetalert2"

export const getRoles = () => {
  return dispatch => {
    axios.get("https://localhost:7130/api/Role").then(x => {
      dispatch({ type: 'GET_ROLES', payload: x.data })
    })
      .catch(err => console.log(err))
  }
}

export function addNewRole(data) {

  return dispatch => {
    axios.post("https://localhost:7130/api/Role", data)
      .then(x => {
        dispatch({ type: 'ADD_ROLE', payload: x.data })
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "The role was successfully added",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "The role already exists",
          showConfirmButton: false,
          timer: 1500
        });
      })
  }
}