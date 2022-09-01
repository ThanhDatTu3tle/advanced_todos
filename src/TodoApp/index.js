import { Button, Input } from '@mui/material';
import { useReducer, useRef, useEffect } from "react";
import reducer, { initState } from './reducer';
import { setTask, addTask, deleteTask } from './actions';
import logger from './logger';

function TodoApp() {
    const [state, dispatch] = useReducer(logger(reducer), initState)
    const { task, tasks } = state

    const inputRef = useRef()
    const btnRef = useRef()

    const handleSubmit = () => {
        if(task)
            dispatch(addTask(task))
            dispatch(setTask(''))
            
            inputRef.current.focus()
    }

    useEffect(() => {
        const handleBtnAdd = (e) => {
            e.code === 'Enter' && btnRef.current.click()
        }
        window.addEventListener('keydown', handleBtnAdd)

        return () => {
            window.removeEventListener('keydown', handleBtnAdd)
        }
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1>todos</h1>
            <div 
                style={{ 
                    marginLeft: 10, 
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <Input 
                    ref={inputRef}
                    value={task}
                    placeholder='Enter your task...'
                    onChange={e => {
                        dispatch(setTask(e.target.value))
                    }}
                />
                <Button
                    ref={btnRef}
                    onClick={handleSubmit}
                    variant="outlined"
                    size="medium"
                    style={{ 
                        marginLeft: 10, 
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    Add
                </Button>
            </div>
            
            <div style={{ 
                    width: 1000,
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'center'
                }}
            >
                <ul>
                    {tasks.map((task, index) => (
                        <li 
                            key={index}
                        >
                            {task}
                            <Button
                                variant="contained"
                                size="small"
                                style={{ marginTop: 10, marginBottom: 10 }}
                                onClick={() => dispatch(deleteTask(index))}
                            >
                                Cút
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            
        </div>
    )
}

export default TodoApp;