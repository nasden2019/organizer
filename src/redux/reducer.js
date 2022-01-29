import { actionTypes } from "./actionTypes";

export const reducer = (state = [], action) => {
    debugger
    switch (action.types) {
        case actionTypes.add:
            return [...state, action.payload.task];
        case actionTypes.remove:
            return state.filter(item => item !== action.payload.id)
        case actionTypes.edit:
            const editTask = state.filter(item => item === action.payload.id)
            return [...state]
        default:
            return state
    }
}