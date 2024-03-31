import * as Actions from './action'

const initalseState = {

    employees: []

}

const reducer = (state = initalseState, action) => {

    switch (action.type) {
        
        
        case Actions.GET_EMPLOYEES:
            return { ...state, employees: action.payload }
        case Actions.ADD_EMPLOYEE:
            const employees = [...state.employees];
            employees.push(action.payload);
            return { ...state, employees }
        case Actions.EDIT_EMPLOYEE: {
            const employees = [...state.employees];
            const findIndex = employees.findIndex(x => x.Id == action.payload.Id);
            employees[findIndex] = action.payload;
            return { ...state, employees }
        }
        case Actions.DELETE_EMPLOYEE: {
            const employees = state.employees.filter(x => x.Id !== action.payload.Id)
            return { ...state, employees }
        }
        default: return { ...state }
    }
}

export default reducer;