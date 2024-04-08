import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux";
import { FormControl, Input, InputLabel } from "@mui/material";
import { addNewRole } from "../../service/RoleService";

const schema = yup
    .object({
        name: yup.string().required("שדה חובה"),
    })
    .required()

const AddRole = () => {
    const roles = useSelector(state => state.roles)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = (data) => {
        dispatch(addNewRole(data))
    }

    return (<div className="categories background-img backgroundPage">
        <div>
            {roles?.map((role) => (
                <h4 key={role.id}>
                    {role?.name}
                </h4>
            ))}
        </div>
        <div className="ll">
            <form onSubmit={handleSubmit(onSubmit)} >

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                    <InputLabel id="demo-simple-input-standard-label"> הוסף תפקיד </InputLabel>
                    <Input {...register("name")} />
                    <p>{errors.name?.message}</p>
                </FormControl>
                <br />
                <input type="submit" className="my-button" />
            </form>
        </div>
    </div>)
}
export default AddRole;