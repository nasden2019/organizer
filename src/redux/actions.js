import { actionTypes } from "./actionTypes";

export const addAction = ({ task }) => ({
    type: actionTypes.add,
    payload: { task }
})

export const removeAction = ({ id }) => ({
    type: actionTypes.remove,
    payload: { id }
})

export const editAction = ({ id, taskName }) => ({
    type: actionTypes.edit,
    payload: { id, taskName }
})