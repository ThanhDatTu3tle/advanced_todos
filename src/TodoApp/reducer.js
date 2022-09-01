import { ADD_TASK, DELETE_TASK, SET_TASK } from "./constants"

// initState
export const initState = {
    task: '',
    tasks: JSON.parse(localStorage.getItem('tasks')) ?? []
}

// function reducer
const reducer = (state, action) => {
    let newState

    switch(action.type) {
        case SET_TASK:
            newState = {
                ...state,
                task: action.payload,
            }
            break
        case ADD_TASK:
            newState = {
                ...state,
                tasks: [...state.tasks, action.payload],
            }
            localStorage.setItem('tasks', JSON.stringify(newState.tasks))
            break
        case DELETE_TASK:
            const newTasks = [...state.tasks]
            newTasks.splice(action.payload, 1)

            newState = {
                ...state,
                tasks: newTasks
            }
            localStorage.setItem('tasks', JSON.stringify(newState.tasks))
            break
        default:
            throw new Error(`Invalid action!`)
    }

    return newState
}

export default reducer
